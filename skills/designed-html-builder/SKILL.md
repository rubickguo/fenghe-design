---
name: designed-html-builder
description: "Design or improve websites, HTML pages, resume HTML, portfolio pages, landing pages, product pages, dashboards, and print-ready web documents with stronger typography, layout, color, component styling, responsive behavior, and visual QA. Use when the user asks to make a page more designed, generate polished HTML, redesign a resume, create or apply DESIGN.md guidance, or prepare HTML that may later be exported to PDF."
---

# Designed HTML Builder

## Purpose

Create web and resume HTML that looks intentionally designed, not like a generic generated page. This skill combines:

- design-language discipline from Impeccable-style audit/craft/polish workflows
- DESIGN.md-style project guidance for repeatable visual systems
- typography-first rules for mixed Chinese-English content, resumes, and print

When PDF output is requested, this skill must hand off to the `html-to-pdf-qa` workflow and follow its rendered-page QA rules.

## Source Mapping

- `pbakaus/impeccable`: use as the model for design verbs, critique/audit/polish flow, and anti-generic-AI visual standards.
- `VoltAgent/awesome-design-md`: use as the model for durable project-level `DESIGN.md` guidance.
- `fonted-design`: no exact same-name repository was confirmed during creation; treat this as the typography/font-design layer until the user provides a precise repo URL.

## Required Workflow

1. Inspect the existing project, page, HTML/CSS, or content before designing.
2. Identify the actual purpose: website, app tool, resume, portfolio, report, landing page, dashboard, or print document.
3. Define a compact design brief:
   - audience and reading context
   - content hierarchy and density
   - visual tone
   - primary constraints such as mobile, print, ATS readability, or page count
4. Choose a visual system before implementation:
   - typography roles and line heights
   - color roles and contrast
   - spacing grid and layout rhythm
   - component states and interaction behavior
   - responsive behavior
5. Implement in the existing stack or produce standalone HTML/CSS when requested.
6. Run visual QA in browser or via screenshots when feasible.
7. If exporting HTML to PDF, use the `html-to-pdf-qa` skill and inspect every rendered PDF page.

## Design Rules

- Make hierarchy visible through type, spacing, alignment, and content grouping before adding decoration.
- Avoid the generic AI SaaS look: default Inter/system typography, one-note purple or blue gradients, decorative blobs, nested cards, and gray text on colored backgrounds.
- Do not wrap every section in cards. Use cards for repeated items, tools, and bounded modules only.
- Use color as a system with roles: background, surface, text, muted text, border, accent, danger/success, and focus.
- Typography is a product decision. Define role-based sizes, weights, line heights, and wrapping behavior.
- Mixed Chinese-English text needs readable line height, stable numerals, and tested wrapping for long English words, URLs, and dates.
- Motion is optional. If used, keep it purposeful and restrained; avoid bouncy decorative transitions.
- Resume design should be dense, readable, and evidence-first; it is not a landing page.

## Reference Files

Load only the references needed for the task:

- `references/design-rubric.md` for website/app/page visual QA and anti-pattern checks.
- `references/design-md-template.md` when creating or updating a project-level `DESIGN.md`.
- `references/resume-html-design.md` for resume HTML, print layout, and PDF readiness.

## PDF Integration

When the user asks to convert HTML to PDF, export a resume PDF, or deliver print-ready output:

1. Finish the HTML/CSS design pass first.
2. Invoke the `html-to-pdf-qa` skill or follow its workflow.
3. Render the generated PDF to page images.
4. Inspect every page, regardless of page count.
5. Fix excessive blank space, unreadable font size, awkward breaks, clipping, weak alignment, or poor density before final delivery.

Do not assume the target is two pages. The target page count depends on content, purpose, readability, and visual balance.

## Output Standard

For design or HTML work, report:

- files changed or created
- the design system choices that matter
- visual QA performed
- remaining tradeoffs, if any

For PDF work, also report:

- PDF path
- page count
- rendered-page QA result

Keep the report short and concrete.
