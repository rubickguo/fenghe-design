#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const cwd = path.resolve(process.argv[2] || process.cwd());
const skillRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const repoRoot = findRepoRoot(cwd);
const root = repoRoot || cwd;

const SKIP_DIRS = new Set(['.git', 'node_modules', 'dist', 'build', '.next', '.nuxt', '.svelte-kit', 'coverage', '.turbo', '.cache']);
const TEXT_EXTS = new Set(['.css', '.scss', '.sass', '.less', '.html', '.htm', '.js', '.jsx', '.ts', '.tsx', '.vue', '.svelte', '.astro', '.json', '.md', '.mjs', '.cjs']);

const files = walk(root);
const lowerMap = new Map(files.map(f => [path.relative(root, f).toLowerCase(), f]));

const productPath = findContextFile(['PRODUCT.md', '.agents/context/PRODUCT.md', 'docs/PRODUCT.md']);
const designPath = findContextFile(['DESIGN.md', '.agents/context/DESIGN.md', 'docs/DESIGN.md']);
const designJsonPath = findContextFile(['DESIGN.json', '.agents/context/DESIGN.json', 'docs/DESIGN.json']);

const product = readProduct(productPath);
const design = readDesign(designPath);
const projectSignals = collectSignals(files);
const skillReferences = collectSkillReferences();
const pdfSkill = findPdfSkill();

const output = {
  root,
  product,
  design,
  designJson: {
    exists: Boolean(designJsonPath),
    path: designJsonPath ? path.relative(root, designJsonPath) : null,
  },
  projectSignals,
  skillReferences,
  pdfSkill,
};

process.stdout.write(JSON.stringify(output, null, 2) + '\n');

function findRepoRoot(start) {
  let dir = start;
  while (true) {
    if (fs.existsSync(path.join(dir, '.git'))) return dir;
    const parent = path.dirname(dir);
    if (parent === dir) return null;
    dir = parent;
  }
}

function walk(dir, acc = []) {
  let entries = [];
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return acc;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name)) walk(full, acc);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (TEXT_EXTS.has(ext) || entry.name.match(/^(tailwind|vite|next|nuxt|astro|svelte|package|tokens|theme)/i)) acc.push(full);
    }
  }
  return acc;
}

function findContextFile(candidates) {
  for (const candidate of candidates) {
    const direct = path.join(root, candidate);
    if (fs.existsSync(direct)) return direct;
    const found = lowerMap.get(candidate.toLowerCase());
    if (found) return found;
  }
  return null;
}

function readFileSafe(file) {
  if (!file) return '';
  try {
    return fs.readFileSync(file, 'utf8');
  } catch {
    return '';
  }
}

function readProduct(file) {
  const content = readFileSafe(file);
  return {
    exists: Boolean(file),
    path: file ? path.relative(root, file) : null,
    register: inferRegister(content),
    summary: summarizeMarkdown(content),
    antiReferences: extractAntiReferences(content),
  };
}

function readDesign(file) {
  const content = readFileSafe(file);
  const fm = parseFrontmatter(content);
  return {
    exists: Boolean(file),
    path: file ? path.relative(root, file) : null,
    version: fm.data.version || 'unknown',
    hasFrontmatter: fm.hasFrontmatter,
    sections: extractSections(content),
    tokens: {
      colors: Object.keys(fm.data.colors || {}),
      typography: Object.keys(fm.data.typography || {}),
      rounded: Object.keys(fm.data.rounded || {}),
      spacing: Object.keys(fm.data.spacing || {}),
      components: Object.keys(fm.data.components || {}),
    },
  };
}

function inferRegister(content) {
  const m = content.match(/##\s*Register\s*\n+([^\n]+)/i);
  if (m) {
    const value = m[1].trim().toLowerCase();
    if (value.includes('brand')) return 'brand';
    if (value.includes('product')) return 'product';
  }
  if (!content.trim()) return 'unknown';
  const brandWords = /(landing|marketing|campaign|portfolio|brand|about|pricing|blog)/i;
  const productWords = /(dashboard|admin|settings|workflow|table|form|tool|app|authenticated)/i;
  if (brandWords.test(content) && !productWords.test(content)) return 'brand';
  if (productWords.test(content) && !brandWords.test(content)) return 'product';
  return 'unknown';
}

function summarizeMarkdown(content) {
  if (!content.trim()) return '';
  const headings = [...content.matchAll(/^#{1,3}\s+(.+)$/gm)].map(m => m[1].trim());
  const firstParagraph = content
    .split(/\n\s*\n/)
    .map(s => s.replace(/^#+\s+/gm, '').trim())
    .find(Boolean) || '';
  return [firstParagraph, headings.length ? `Headings: ${headings.join(' | ')}` : ''].filter(Boolean).join('\n');
}

function extractAntiReferences(content) {
  const m = content.match(/##\s*Anti[- ]references\s*\n+([\s\S]*?)(?=\n##\s+|\n#\s+|$)/i);
  if (!m) return [];
  return m[1]
    .split('\n')
    .map(line => line.replace(/^[-*]\s*/, '').trim())
    .filter(Boolean);
}

function parseFrontmatter(content) {
  if (!content.startsWith('---\n')) return { hasFrontmatter: false, data: {} };
  const end = content.indexOf('\n---', 4);
  if (end === -1) return { hasFrontmatter: false, data: {} };
  const yaml = content.slice(4, end).trim();
  return { hasFrontmatter: true, data: parseSimpleYaml(yaml) };
}

function parseSimpleYaml(yaml) {
  const rootObj = {};
  const stack = [{ indent: -1, obj: rootObj }];
  for (const raw of yaml.split('\n')) {
    if (!raw.trim() || raw.trim().startsWith('#')) continue;
    const indent = raw.match(/^\s*/)[0].length;
    const line = raw.trim();
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim().replace(/^['"]|['"]$/g, '');
    const valueRaw = line.slice(idx + 1).trim();
    while (stack.length && indent <= stack[stack.length - 1].indent) stack.pop();
    const parent = stack[stack.length - 1].obj;
    if (!valueRaw) {
      parent[key] = {};
      stack.push({ indent, obj: parent[key] });
    } else {
      parent[key] = valueRaw.replace(/^['"]|['"]$/g, '');
    }
  }
  return rootObj;
}

function extractSections(content) {
  return [...content.matchAll(/^##\s+(.+)$/gm)].map(m => m[1].trim());
}

function collectSignals(allFiles) {
  const rel = f => path.relative(root, f);
  const packageJson = lowerMap.get('package.json');
  const stack = [];
  if (packageJson) {
    try {
      const pkg = JSON.parse(fs.readFileSync(packageJson, 'utf8'));
      const deps = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) };
      for (const name of ['react', 'next', 'vue', 'nuxt', 'svelte', 'astro', 'vite', 'tailwindcss', '@mui/material', 'antd', 'lucide-react']) {
        if (deps[name]) stack.push(name);
      }
    } catch {}
  }

  const cssFiles = allFiles.filter(f => /\.(css|scss|sass|less)$/i.test(f));
  const styleFiles = cssFiles.map(rel);
  const themeFiles = allFiles
    .filter(f => /(^|\/)(theme|themes|tokens|design-tokens|style-dictionary|variables)[^/]*\.(js|ts|mjs|cjs|json|css|scss)$/i.test(f))
    .map(rel);
  const tokenFiles = allFiles
    .filter(f => /(^|\/)(tokens|design-tokens|design_tokens|style-dictionary|variables)[^/]*\.(json|js|ts|mjs|cjs|css|scss)$/i.test(f))
    .map(rel);
  const cssVariables = [];
  for (const file of cssFiles) {
    const content = readFileSafe(file);
    for (const m of content.matchAll(/--([a-zA-Z0-9-_]+)\s*:\s*([^;]+);/g)) {
      cssVariables.push({ name: `--${m[1]}`, value: m[2].trim(), file: rel(file) });
    }
  }

  const tailwindConfig = allFiles.find(f => /(^|\/)tailwind\.config\.(js|ts|mjs|cjs)$/.test(f));
  const componentFiles = allFiles
    .filter(f => /(^|\/)(components?|ui|widgets?)\//i.test(f) && /\.(jsx|tsx|vue|svelte|astro|html)$/i.test(f))
    .map(rel);
  const htmlFiles = allFiles.filter(f => /\.(html|htm)$/i.test(f)).map(rel);
  const entryPages = allFiles
    .filter(f => /(^|\/)(pages|app|routes|src)\/.*(index|page|layout)\.(jsx|tsx|vue|svelte|astro|html)$/i.test(f) || /(^|\/)index\.html$/i.test(f))
    .map(rel);

  return {
    stack,
    styleFiles,
    themeFiles,
    tokenFiles,
    cssVariables,
    tailwindConfig: tailwindConfig ? rel(tailwindConfig) : null,
    componentFiles,
    htmlFiles,
    entryPages,
  };
}

function collectSkillReferences() {
  const expected = [
    'references/impeccable-runtime.md',
    'references/impeccable-internalized.md',
    'references/design-md-contract.md',
    'references/design-md-template.md',
    'references/design-rubric.md',
    'references/resume-html-design.md',
  ];
  const available = [];
  const missing = [];
  for (const ref of expected) {
    const full = path.join(skillRoot, ref);
    (fs.existsSync(full) ? available : missing).push(ref);
  }
  return { available, missing };
}

function findPdfSkill() {
  const candidates = [
    path.join(root, 'skills/html-to-pdf-qa/SKILL.md'),
    path.join(process.env.HOME || '', '.codex/skills/html-to-pdf-qa/SKILL.md'),
  ].filter(Boolean);
  const found = candidates.find(p => fs.existsSync(p));
  return {
    exists: Boolean(found),
    path: found ? displayPath(found) : null,
  };
}

function displayPath(file) {
  const relative = path.relative(root, file);
  return relative.startsWith('..') ? file : relative;
}
