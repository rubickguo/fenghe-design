# Impeccable Internalized Workflow

This reference turns Impeccable-style design behavior into executable workflow rules for this skill. Prefer `impeccable-runtime.md` when available; use this as the compact fallback.

## Preflight Gates

Before changing UI, answer these briefly:

- Context: What exists now, and what content or behavior must remain?
- Surface: Is this brand, product/app, dashboard, document, resume, portfolio, landing page, or print?
- User task: What should the viewer do or understand first?
- Register: Should it feel quiet, operational, editorial, personal, premium, playful, technical, or document-like?
- Constraint: What matters most: mobile, print, density, conversion, repeated use, credibility, or speed of scanning?

## Mode Routing

- `teach`: establish `PRODUCT.md` and optionally `DESIGN.md`; do not invent strategic facts without user confirmation.
- `document`: extract visual system from UI/tokens/components into Google-compatible `DESIGN.md`.
- `shape`: use when direction is unclear. Produce a design brief, not final code first.
- `craft`: use when creating a new page or HTML artifact. Establish tokens and layout before coding.
- `critique`: use when reviewing. Lead with concrete problems and evidence.
- `audit`: run technical quality checks, DESIGN.md lint, responsive/a11y review, and runtime scans where possible.
- `polish`: use when improving existing UI. Preserve the intended product shape while removing drift.
- `harden`: use when robustness matters. Test long content, empty data, narrow screens, and print breaks.
- `typeset`: use for Chinese-English layout, resume text, print pages, reports, or dense editorial pages.
- `layout`: use when hierarchy, spacing, grid, or density is the real problem.
- `colorize`: use when the palette lacks roles, contrast, or point of view.
- `adapt`: rework layouts and interactions for mobile/tablet/desktop/print contexts.

## Critique And Polish

When critiquing, classify the issue:

- hierarchy: users cannot tell what matters first
- density: too sparse, too crowded, or mismatched to task frequency
- system drift: inconsistent spacing, type, color, or component behavior
- genericness: template-like first screen, category-reflex palette, or decorative filler
- fragility: text overflow, broken mobile, missing states, or bad print
- content mismatch: visuals overstate or understate the real material

When polishing, identify the cause:

- missing token: the system lacks a reusable role or component rule
- one-off implementation: a local element ignores the existing system
- conceptual mismatch: the layout pattern does not match the user's task

## Anti-Patterns

Avoid these unless the user explicitly asks and there is a strong reason:

- decorative blobs, bokeh, or orbs
- purple-blue gradients as the whole visual idea
- gradient text as the main hierarchy device
- side-stripe cards as a default component treatment
- glassmorphism as decoration
- identical card grids for unrelated content
- oversized hero typography inside tools, resumes, or dashboards
- modal-first interaction design
- perfect-data-only layouts

## Hardening Checks

Verify with real or hostile content:

- long Chinese paragraphs
- long English words and URLs
- emoji
- Japanese and Korean text where relevant
- RTL where relevant
- 30-40% longer translations
- mixed Chinese-English dates, numbers, and product names
- empty, loading, selected, disabled, error, and overflow states
- mobile narrow widths
- print page breaks and blank space when relevant

## Runtime Honesty

Do not say Impeccable ran unless `npx impeccable...` actually ran. If using this file, report it as `used Impeccable runtime fallback reference`.
