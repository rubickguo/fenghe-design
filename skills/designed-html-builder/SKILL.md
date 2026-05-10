---
name: designed-html-builder
description: "Design or improve HTML pages, resume HTML, portfolio pages, landing pages, product pages, dashboards, reports, print-ready documents, and DESIGN.md systems with a lightweight kernel, task-specific references, optional runtime audits, and HTML-to-PDF QA handoff when requested."
---

# Designed HTML Builder

## Purpose

Create or improve HTML/CSS and design-system artifacts without defaulting to a heavy audit flow. Start with the kernel only, then load references or run tools only when the task demands it.

Core strengths:
- polished HTML/CSS for websites, product UI, dashboards, portfolios, and reports
- resume, print, PDF-ready layout, and Chinese-English typography
- optional `DESIGN.md` creation/update using Google-compatible frontmatter and prose
- optional runtime audit through Impeccable and Google DESIGN.md lint

## Layered Loading Model

Layer 0: Kernel
- Default mode. Read only this `SKILL.md`.
- Use for simple standalone HTML, small style changes, light polish, and normal implementation.
- Do not load all references or run runtime tools preemptively.

Layer 1: Task Pack
- Load only the reference files matched by the router.
- Use when the task clearly involves resume/print, DESIGN.md, critique/polish, or hardening.

Layer 2: Runtime / Deep QA
- Use only when the user asks for strict review, production-ready quality, full audit, PDF, design-system validation, or comprehensive QA.
- Runtime tools include `scripts/load-design-context.mjs`, `scripts/run-design-audit.mjs`, browser screenshots, and `html-to-pdf-qa`.

## Fast Examples

- "做一个 HTML 页面" -> kernel only.
- "优化这个页面观感" -> load `design-rubric.md` only if local inspection is not enough.
- "生成/优化简历或 PDF" -> load `resume-html-design.md`; use `html-to-pdf-qa` when PDF is requested.
- "创建 DESIGN.md" -> load `design-md-contract.md` + `design-md-template.md`.
- "严格审查/生产级 QA" -> Layer 2 runtime/deep QA.

## Minimal Workflow

1. Classify the task: simple build, polish, resume/print, DESIGN.md, critique/audit, harden, or PDF.
2. Apply the Loading Router. Start with kernel only unless a trigger matches.
3. Inspect the relevant project files before editing. For simple tasks, this can be direct file reading.
4. Preserve existing design conventions before adding new ones.
5. Edit only the files needed for the task.
6. Verify proportionally: quick local check for small edits; screenshots/runtime/PDF QA only when escalated.
7. Report what changed and what was checked.

## Loading Router

| Trigger | Load | Skip |
|---|---|---|
| simple standalone HTML | kernel only | all references |
| small style/content change | kernel only, plus existing `DESIGN.md` if obvious | runtime, all references |
| redesign / polish existing page | `references/design-rubric.md` | resume, design-md-template |
| resume / CV / print HTML | `references/resume-html-design.md` | DESIGN.md unless reused |
| create/update `DESIGN.md` | `references/design-md-contract.md` + `references/design-md-template.md` | resume |
| PDF requested | `references/resume-html-design.md` if relevant + `html-to-pdf-qa` | runtime unless needed |
| strict audit / production-ready / full QA | `references/design-rubric.md` + `references/impeccable-internalized.md` | template unless writing DESIGN.md |
| harden / edge cases / anti-AI look | `references/impeccable-internalized.md` | resume unless print/PDF |
| runtime scan requested | `references/impeccable-runtime.md` + run audit script | template unless writing DESIGN.md |

## Command Router

Infer intent even when the user does not name a command.

| Intent | Meaning |
|---|---|
| `teach` / `document` | establish context or create/update `DESIGN.md` |
| `shape` / `craft` | brief first, or create a new page/artifact |
| `critique` / `audit` | review or technical QA before mutation |
| `polish` / `harden` | align with system, fix drift, test edge cases |
| `typeset` / `layout` / `colorize` | typography, grid/density, palette/contrast |
| `adapt` | multi-device layout, container queries, mobile collapse |

## Escalation Rules

Load more references or run deeper tools only when:

- current file context is insufficient to complete the task
- the user asks for production-ready, audit, QA, strict review, or comprehensive checking
- the output will become a reusable design system
- the task involves PDF, print, resume, or CV output
- responsive behavior, long text, pagination, accessibility, or edge states are already a visible risk

Otherwise, do not load every reference just in case.

## Reading Budget

- Start with kernel only.
- Load at most one reference file by default.
- Load two or more references only when the Loading Router explicitly matches.
- If a project has an obvious `DESIGN.md`, read it before changing reusable styles.
- If a project has an obvious `PRODUCT.md`, use it for audience, purpose, register, and anti-references.
- If a reference is loaded, keep the reason internal and final-report it briefly.
- Never load every reference preventively.

## Runtime Tools

Use only in Layer 2:

- Context loader: `node skills/designed-html-builder/scripts/load-design-context.mjs`
- Audit bridge: `node skills/designed-html-builder/scripts/run-design-audit.mjs <target>`
- Impeccable CLI is only "ran" if `npx impeccable...` actually ran.
- Google DESIGN.md lint is only "ran" if `npx @google/design.md lint...` actually ran.
- If a tool cannot run, report `skipped:<reason>`; do not imply runtime validation happened.

## Output Standard

Keep final reports short:

- Changed: files and concrete behavior/design updates.
- Context used: `PRODUCT.md` yes/no, `DESIGN.md` yes/no, references loaded.
- Runtime checks: Impeccable CLI, DESIGN.md lint, browser/screenshot QA, PDF QA, each `ran` or `skipped:<reason>`.
- Design decisions: register, typography, color strategy, layout/density, component states when relevant.
- Remaining tradeoffs: only material risks.

Use precise language: `ran Impeccable CLI`, `used Impeccable runtime fallback reference`, or `applied local design rules`.
