---
name: designed-html-builder
description: "Design or improve websites, HTML pages, resume HTML, portfolio pages, landing pages, product pages, dashboards, reports, and print-ready web documents with executable design-system context loading, Impeccable runtime/fallback checks, Google DESIGN.md linting, typography/layout/color guidance, browser visual QA, and HTML-to-PDF QA handoff."
---

# Designed HTML Builder

## Purpose

Create or improve HTML/CSS and design-system artifacts with real project context, not generic design advice. This skill must:

- load `PRODUCT.md`, `DESIGN.md`, `DESIGN.json`, existing styles, components, and local references before UI mutation
- run runtime tools when available: `impeccable_cli` and `google_design_md_cli`
- explicitly fallback to vendored references when tools are unavailable
- preserve the original strengths: Chinese-English typography, resume HTML, print CSS, and mandatory PDF visual QA

## Runtime Tool Bridge

Use runtime tools when Bash, Node/npm, and network access allow it. Never claim a runtime ran unless the command actually ran.

Runtime names:

- `runtime: impeccable_cli`: `npx impeccable --json <markup-target>` or `npx impeccable detect --json <markup-target>`
- `runtime: google_design_md_cli`: `npx @google/design.md lint DESIGN.md --format json`
- `fallback: vendored_reference`: this skill's local `references/*.md`

Required behavior:

1. Start design work with:

   ```bash
   node skills/designed-html-builder/scripts/load-design-context.mjs
   ```

   Consume the full JSON. Do not pipe it through `head`, `tail`, `grep`, or truncating tools. If the script cannot run, manually read the same context and report `context=partial`.

2. For markup, directories, or URLs that can be scanned, run:

   ```bash
   node skills/designed-html-builder/scripts/run-design-audit.mjs <target>
   ```

   The script tries Impeccable and DESIGN.md lint, captures exit codes, stderr, stdout, and normalized findings.

3. When browser automation and a browsable target are available, prefer visual QA via screenshots. If an Impeccable live overlay is available in the environment, try `npx impeccable live`, inject/read detector console findings, then stop the live process. If this cannot be done, report `browser/screenshot QA: skipped:<reason>` or `impeccable live: skipped:<reason>`.

4. If tools are unavailable, do not silently continue. Record:

   ```text
   tool=unavailable:<reason>
   ```

   Continue using vendored references and final-report the distinction between checks that ran and fallback review.

## Hard Preflight Gate

Before any UI/HTML/CSS/design-file mutation, output one line:

```text
DHB_PREFLIGHT: context=pass|partial|missing product=pass|missing design=pass|missing|stale register=brand|product|document|resume command=teach|document|shape|craft|critique|audit|polish|harden|typeset|layout|colorize|adapt references=pass|partial tools=impeccable:pass|skip:<reason>,designmd:pass|skip:<reason> mutation=open|blocked
```

Rules:

- `mutation=open` only after context loading and required references are known.
- If context cannot be loaded, use `context=partial` and list the manual files inspected.
- If `PRODUCT.md` exists, read register, users, purpose, anti-references, and principles.
- If `DESIGN.md` exists, it is the first-priority visual system. Tokens override descriptive prose.
- If `DESIGN.json` exists, read it as a sidecar for details that do not fit Google DESIGN.md tokens.
- If required references are missing, continue with `references=partial` and final-report `missing reference: <path>`.
- Never overwrite existing `PRODUCT.md`, `DESIGN.md`, or `DESIGN.json` without explicit user intent.

## Command Router

Infer the command from user intent even when no command is named.

| Command | Use When | Required References | Runtime Audit | Browser/Visual QA | Mutation |
|---|---|---|---|---|---|
| `teach` | Establish product/design context | `design-md-contract.md`, `design-md-template.md` | optional DESIGN.md lint after creation | optional | only after user confirms strategic facts |
| `document` | Generate/update `DESIGN.md` from existing UI/tokens/components | `design-md-contract.md`, `design-md-template.md` | required after write | optional | allowed; do not overwrite silently |
| `shape` | Produce a design brief, no code | `impeccable-runtime.md`, register reference | no | no | blocked |
| `craft` | Create a new page or HTML artifact | `impeccable-runtime.md`, `design-rubric.md`, register reference | run when target exists | required when feasible | allowed |
| `critique` | Review before changing | `impeccable-runtime.md`, `design-rubric.md` | required when target scan possible | required when feasible | blocked unless user asks fixes |
| `audit` | Technical quality, a11y, responsive, performance, DESIGN.md lint | `impeccable-runtime.md`, `design-rubric.md` | required | required when feasible | blocked unless user asks fixes |
| `polish` | Fix drift and final craft | `impeccable-runtime.md`, `design-rubric.md` | required when target scan possible | required when feasible | allowed |
| `harden` | Stress real content and edge states | `impeccable-runtime.md`, `design-rubric.md` | optional | required when feasible | allowed |
| `typeset` | Typography, CJK, resume/report/print readability | `impeccable-runtime.md`, `resume-html-design.md` for print/resume | optional | required for visual artifacts | allowed |
| `layout` | Hierarchy, grid, density, spacing rhythm | `impeccable-runtime.md`, `design-rubric.md` | optional | required when feasible | allowed |
| `colorize` | Palette roles, contrast, color strategy | `impeccable-runtime.md`, `design-rubric.md`, `design-md-contract.md` if tokens change | run DESIGN.md lint after token changes | required when feasible | allowed |
| `adapt` | Multi-device adaptation, container queries, mobile collapse | `impeccable-runtime.md`, `design-rubric.md` | optional | required across target viewports | allowed |

Register loading:

- `brand`: marketing, landing, portfolio, campaign, long-form, where design is the product.
- `product`: app UI, dashboard, admin, tool, form, settings, where design serves repeated work.
- `document`/`resume`: print, report, resume, PDF-bound HTML; dense readability wins.

## Reference Loading Rules

Hard rules:

- All design tasks: load `references/impeccable-runtime.md`; if missing, load `references/impeccable-internalized.md`.
- Any task that uses or creates `DESIGN.md`: load `references/design-md-contract.md`.
- Creating or updating `DESIGN.md`: load `references/design-md-template.md`.
- `critique`, `polish`, and `audit`: load `references/design-rubric.md`.
- `resume`, `print`, or `PDF`: load `references/resume-html-design.md` and hand off to `html-to-pdf-qa` for export.
- Project `DESIGN.md` outranks vendored references for concrete tokens/components.
- Project `PRODUCT.md` outranks assumptions for register, users, purpose, anti-references, and strategic design principles.

## DESIGN.md Rules

When creating or updating `DESIGN.md`:

- Follow Google DESIGN.md structure: YAML frontmatter plus Markdown body.
- Frontmatter is machine-readable tokens; Markdown prose explains why/how.
- Token refs use `{colors.primary}` style paths.
- Component token properties are limited to: `backgroundColor`, `textColor`, `typography`, `rounded`, `padding`, `size`, `height`, `width`.
- Fold awesome-design-md-style guidance into Google-compatible sections or put extra detail in `DESIGN.json` / `docs/DESIGN-EXTENDED.md`.
- After changes, try `npx @google/design.md lint DESIGN.md --format json` through `run-design-audit.mjs`.

## PDF Integration

For resume, report, or print HTML:

1. Finish the HTML/CSS design pass.
2. Invoke the `html-to-pdf-qa` skill or equivalent workflow.
3. Export PDF, render every PDF page to images, and inspect every page.
4. Fix unreadable font size, clipped text, awkward page breaks, excessive blank space, weak density, and Chinese-English wrapping before final delivery.

Do not assume the target is one page or two pages. Page count follows content, purpose, readability, and visual balance.

## Output Standard

Final reports must stay short and include:

```text
Changed:
- ...

Context used:
- PRODUCT.md: yes/no
- DESIGN.md: yes/no
- References: ...

Runtime checks:
- impeccable CLI: ran/skipped + reason
- DESIGN.md lint: ran/skipped + reason
- browser/screenshot QA: ran/skipped + reason
- PDF QA: ran/skipped + reason

Design decisions:
- register
- typography
- color strategy
- layout/density
- component states

Remaining tradeoffs:
- ...
```

Language rules:

- Say `ran Impeccable CLI` only if `npx impeccable...` actually ran.
- Say `used Impeccable runtime fallback reference` when using `references/impeccable-runtime.md`.
- Say `applied Impeccable-style internal rules` only for local heuristic application.
- Do not say "used Impeccable" ambiguously.
