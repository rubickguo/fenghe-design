# Resume HTML Design

## Use when

- The task is resume, CV, print HTML, or PDF-ready layout.
- The document needs readable density, page-break control, or Chinese-English typography.

## Do not use when

- The task is a normal landing page, dashboard, or app UI.
- The task only creates or validates a project `DESIGN.md`.

## Key outputs

- readable evidence density
- print-safe layout
- mixed Chinese-English typography
- PDF readiness checks

Use this reference for resume HTML, print-ready career pages, and PDF-bound documents.

## Resume Design Goal

A resume is a screening document. The design should improve scanning, credibility, and evidence density. It should not behave like a landing page.

## Structure

- Header: name, target identity, contact, key links.
- Summary: concise positioning, no vague self-praise.
- Experience: company, role, time, scope, concrete impact, evidence.
- Projects or selected work: use only when it strengthens the target role.
- Skills: grouped by relevance, not a keyword dump.
- Education and extras: compact unless strategically important.

## Visual Rules

- Keep a restrained but distinct visual system.
- Use strong alignment and section rhythm.
- Avoid oversized hero areas, decorative gradients, and bulky cards.
- Use compact section labels and readable body text.
- Make dates, company names, roles, and outcomes easy to scan.
- Use bullets only when each bullet carries evidence.
- Keep line length controlled; avoid dense walls of text.
- Chinese-English mixed content needs generous enough line height and stable punctuation spacing.

## Print CSS

- Define `@page` margin intentionally.
- Use print-safe colors and avoid low-contrast text.
- Prevent important blocks from splitting awkwardly with `break-inside: avoid` where practical.
- Do not rely on background images or decorative effects for meaning.
- Keep links visible enough in PDF.

## PDF Readiness

When exporting to PDF, use the `html-to-pdf-qa` workflow:

- Render the PDF to page images.
- Inspect every page, not just the browser HTML.
- Check font size, page breaks, blank space, clipping, alignment, and density.
- Do not force a one-page or two-page resume if it makes the document worse.
- If the user asks for a specific page count, treat it as a constraint to balance against readability.

Before export, run the Designed HTML Builder preflight:

- Load project/person/job context if it exists.
- Load `DESIGN.md` when present, but prioritize resume readability over decorative web styling.
- Run `run-design-audit.mjs` when the HTML file exists and tool access is available.
- If tools are unavailable, report runtime checks as skipped and do manual visual review.

After export, inspect every rendered page. Do not call a PDF ready just because the file exists.

## Role-Specific Emphasis

For product manager resumes:

- Prioritize product judgment, user understanding, project ownership, cross-functional delivery, metrics, and product value.
- Avoid making the resume read like pure operations, pure growth, or generic coordination unless that is the target.

For developer resumes:

- Prioritize technical scope, architecture decisions, delivery ownership, debugging complexity, code quality, performance, reliability, and measurable engineering outcomes.
- Translate metrics into engineering impact where possible.

## Resume Hardening

Test:

- Chinese-English mixed company names, product names, dates, and URLs.
- Long project bullets and dense skill lists.
- Page breaks between job title, date, and bullets.
- Final page density and blank space.
- Font size at actual PDF zoom, not only browser preview.
