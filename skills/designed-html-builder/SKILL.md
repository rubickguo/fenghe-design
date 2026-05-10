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

## Internalized Design Engines

These are operational rules, not citations.

### Impeccable-Style Workflow

- Treat design requests as modes: `shape`, `craft`, `critique`, `polish`, `harden`, `typeset`, `layout`, and `colorize`.
- Run preflight before implementation: gather context, classify the surface, identify constraints, choose a visual register, then edit.
- Use critique before polish. Name the actual problem first: unclear hierarchy, generic visual language, weak density, inconsistent system, broken responsive behavior, poor print output, or fragile edge states.
- During polish, distinguish the cause of drift: missing design token, one-off implementation, or conceptual mismatch.
- During harden, test hostile content: long Chinese sentences, long English words, URLs, dates, empty states, dense data, narrow mobile widths, and print page breaks.
- Avoid default AI aesthetics: category-reflex colors, decorative blobs, gradient text as a main idea, side-stripe accents as a default card treatment, identical card grids, hero metric templates, and modal-first thinking.

### DESIGN.md Contract

- If a project has `DESIGN.md`, read it before designing and preserve its token/component language.
- If a project lacks `DESIGN.md` but the design will be reused, create or update one with concrete rules, not vague adjectives.
- A useful `DESIGN.md` defines visual theme, color roles, typography roles, spacing, layout, component styling, depth/elevation, responsive behavior, and agent guidance.
- Use semantic roles first (`background`, `surface`, `text`, `muted`, `border`, `accent`, `focus`, `success`, `warning`, `danger`) before choosing arbitrary hex values.
- Extract local patterns from existing UI before adding new ones. If the existing system is weak, state the proposed system explicitly.

### Typography And Font Layer

- Typography is a structural layer, not decoration. Decide hierarchy, density, line length, and wrapping before visual effects.
- For Chinese and mixed Chinese-English pages, prioritize readable line height, controlled line length, stable numerals, and overflow behavior.
- For print or resume HTML, prefer durable readability over expressive web styling.

## Required Workflow

1. Inspect the existing project, page, HTML/CSS, screenshots, or content before designing.
2. Identify the surface register: brand page, product/app tool, dashboard, personal site, portfolio, resume, report, landing page, or print document.
3. Route the task into the right mode:
   - `shape`: define direction before implementation.
   - `craft`: create a new designed page or HTML artifact.
   - `critique`: identify problems before changing visuals.
   - `polish`: improve an existing page while preserving intent.
   - `harden`: make the page robust against real content and device constraints.
   - `typeset`: improve typography, mixed-language layout, and print readability.
   - `layout`: fix hierarchy, grid, density, spacing, and page rhythm.
   - `colorize`: define or repair color roles and contrast.
4. Define a compact design brief:
   - audience and reading context
   - content hierarchy and density
   - visual tone
   - primary constraints such as mobile, print, ATS readability, or page count
5. Choose a visual system before implementation:
   - typography roles and line heights
   - color roles and contrast
   - spacing grid and layout rhythm
   - component states and interaction behavior
   - responsive behavior
6. Implement in the existing stack or produce standalone HTML/CSS when requested.
7. Run visual QA in browser or via screenshots when feasible.
8. If exporting HTML to PDF, use the `html-to-pdf-qa` skill and inspect every rendered PDF page.

## Design Rules

- Make hierarchy visible through type, spacing, alignment, and content grouping before adding decoration.
- Avoid the generic AI SaaS look: default Inter/system typography, one-note purple or blue gradients, decorative blobs, nested cards, and gray text on colored backgrounds.
- Before choosing colors, choose a color strategy: restrained, committed accent, full palette, or immersive/drenched. Do not let the product category choose colors automatically.
- Do not wrap every section in cards. Use cards for repeated items, tools, and bounded modules only.
- Use color as a system with roles: background, surface, text, muted text, border, accent, danger/success, and focus.
- Typography is a product decision. Define role-based sizes, weights, line heights, and wrapping behavior.
- Keep long-form text near 65-75 characters per line where practical; for dense tools and resumes, preserve scanability with tighter but readable measures.
- Mixed Chinese-English text needs readable line height, stable numerals, and tested wrapping for long English words, URLs, and dates.
- Layout needs rhythm, not repeated identical containers. Vary section treatment according to content meaning.
- Do not use thick colored side borders, gradient text, glassy cards, or decorative effects as the default way to create hierarchy.
- Motion is optional. If used, keep it purposeful and restrained; avoid bouncy decorative transitions.
- Resume design should be dense, readable, and evidence-first; it is not a landing page.
- Run the category-reflex check: if the design could be described as "generic AI SaaS", "generic portfolio", "generic dashboard", or "generic resume", revise the visual language.

## Reference Files

Load only the references needed for the task:

- `references/impeccable-internalized.md` for mode routing, critique/polish/harden behavior, and anti-pattern rules.
- `references/design-md-contract.md` for creating or applying durable `DESIGN.md` guidance.
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
