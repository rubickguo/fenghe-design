#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = findRepoRoot(process.cwd()) || process.cwd();
const target = process.argv[2] || '.';
const designPath = findDesign(root);
const output = {
  impeccable: {
    ran: false,
    exitCode: null,
    findings: [],
    reason: null,
    stdout: '',
    stderr: '',
  },
  designmd: {
    ran: false,
    exitCode: null,
    findings: [],
    summary: {},
    reason: null,
    stdout: '',
    stderr: '',
  },
  fallbackRequired: false,
  notes: [],
};

const npmCheck = spawnSync('npm', ['--version'], { encoding: 'utf8' });
const npxCheck = spawnSync('npx', ['--version'], { encoding: 'utf8' });
const npmAvailable = npmCheck.status === 0 && npxCheck.status === 0;

if (!npmAvailable) {
  const reason = 'npm unavailable';
  output.impeccable.reason = reason;
  output.designmd.reason = reason;
  output.fallbackRequired = true;
  output.notes.push('tool=unavailable:npm unavailable');
} else {
  runImpeccable();
  runDesignMd();
}

process.stdout.write(JSON.stringify(output, null, 2) + '\n');

function runImpeccable() {
  if (!hasMarkupTarget(target)) {
    output.impeccable.reason = 'no markup target';
    output.fallbackRequired = true;
    output.notes.push('impeccable skipped:no markup target');
    return;
  }
  const first = run('npx', ['impeccable', '--json', target]);
  const result = first.exitCode === 1 && /Unknown|Usage|command/i.test(first.stderr)
    ? run('npx', ['impeccable', 'detect', '--json', target])
    : first;
  output.impeccable.ran = true;
  output.impeccable.exitCode = result.exitCode;
  output.impeccable.stdout = result.stdout;
  output.impeccable.stderr = result.stderr;
  output.impeccable.findings = parseFindings(result.stdout) || parseFindings(result.stderr) || [];
  if (result.error) {
    output.impeccable.reason = 'command failed';
    output.fallbackRequired = true;
    output.notes.push(`impeccable command failed:${result.error}`);
  } else if (result.exitCode !== 0 && output.impeccable.findings.length === 0) {
    output.impeccable.reason = 'command failed';
    output.fallbackRequired = true;
    output.notes.push(`impeccable command failed:exit ${result.exitCode}`);
  }
}

function runDesignMd() {
  if (!designPath) {
    output.designmd.reason = 'no DESIGN.md';
    output.notes.push('designmd skipped:no DESIGN.md');
    return;
  }
  const result = run('npx', ['@google/design.md', 'lint', designPath, '--format', 'json']);
  output.designmd.ran = true;
  output.designmd.exitCode = result.exitCode;
  output.designmd.stdout = result.stdout;
  output.designmd.stderr = result.stderr;
  const parsed = parseJson(result.stdout);
  output.designmd.findings = Array.isArray(parsed?.findings) ? parsed.findings : [];
  output.designmd.summary = parsed?.summary || {};
  if (result.error) {
    output.designmd.reason = 'command failed';
    output.fallbackRequired = true;
    output.notes.push(`designmd command failed:${result.error}`);
  } else if (result.exitCode !== 0) {
    output.designmd.reason = 'command failed';
    output.fallbackRequired = true;
    output.notes.push(`designmd command failed:exit ${result.exitCode}`);
  }
}

function run(cmd, args) {
  const res = spawnSync(cmd, args, {
    cwd: root,
    encoding: 'utf8',
    timeout: 120000,
    maxBuffer: 1024 * 1024 * 20,
  });
  return {
    exitCode: typeof res.status === 'number' ? res.status : null,
    stdout: res.stdout || '',
    stderr: res.stderr || '',
    error: res.error ? res.error.message : null,
  };
}

function findRepoRoot(start) {
  let dir = start;
  while (true) {
    if (fs.existsSync(path.join(dir, '.git'))) return dir;
    const parent = path.dirname(dir);
    if (parent === dir) return null;
    dir = parent;
  }
}

function findDesign(dir) {
  for (const candidate of ['DESIGN.md', '.agents/context/DESIGN.md', 'docs/DESIGN.md']) {
    const p = path.join(dir, candidate);
    if (fs.existsSync(p)) return p;
  }
  return null;
}

function hasMarkupTarget(value) {
  if (/^https?:\/\//.test(value)) return true;
  const p = path.resolve(root, value);
  if (!fs.existsSync(p)) return false;
  const stat = fs.statSync(p);
  if (stat.isDirectory()) {
    return containsMarkup(p);
  }
  return /\.(html?|css|jsx|tsx|vue|svelte|astro)$/i.test(p);
}

function containsMarkup(dir) {
  const skip = new Set(['.git', 'node_modules', 'dist', 'build', '.next', '.nuxt', 'coverage']);
  const stack = [dir];
  while (stack.length) {
    const current = stack.pop();
    let entries = [];
    try {
      entries = fs.readdirSync(current, { withFileTypes: true });
    } catch {
      continue;
    }
    for (const entry of entries) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory() && !skip.has(entry.name)) stack.push(full);
      if (entry.isFile() && /\.(html?|css|jsx|tsx|vue|svelte|astro)$/i.test(entry.name)) return true;
    }
  }
  return false;
}

function parseFindings(text) {
  const parsed = parseJson(text);
  if (Array.isArray(parsed)) return parsed;
  if (Array.isArray(parsed?.findings)) return parsed.findings;
  if (Array.isArray(parsed?.results)) return parsed.results;
  return null;
}

function parseJson(text) {
  if (!text.trim()) return null;
  try {
    return JSON.parse(text);
  } catch {
    const first = text.indexOf('{');
    const last = text.lastIndexOf('}');
    if (first >= 0 && last > first) {
      try {
        return JSON.parse(text.slice(first, last + 1));
      } catch {}
    }
    const arrayFirst = text.indexOf('[');
    const arrayLast = text.lastIndexOf(']');
    if (arrayFirst >= 0 && arrayLast > arrayFirst) {
      try {
        return JSON.parse(text.slice(arrayFirst, arrayLast + 1));
      } catch {}
    }
    return null;
  }
}
