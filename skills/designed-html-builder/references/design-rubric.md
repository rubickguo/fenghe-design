# Design Rubric

## Use when

- The task is critique, audit, redesign, visual QA, or substantial polish.
- The page has hierarchy, layout, color, component, responsive, or accessibility risks.

## Do not use when

- The task is a small text/style edit with obvious local context.
- The task is pure `DESIGN.md` authoring or pure PDF export.

## Key outputs

- Review dimensions for visual quality.
- Polish drift classification.
- Harden checks for real content and responsive behavior.

Use this for `critique`, `audit`, `polish`, and broad page review. Pair it with `impeccable-runtime.md`.

## Two-Lane Critique

### 1. LLM Design Director Review

Review the interface across:

- AI slop detection: category-reflex palette, decorative blobs, gradient text, glassy cards, side-stripe cards, identical card grids, template hero metrics, overused fonts.
- Hierarchy: primary action, scan order, section grouping, content density, first-screen clarity.
- Information architecture: labels, navigation, grouping, cognitive load, progressive disclosure.
- Composition: alignment, grid, rhythm, whitespace, repeated containers, balance.
- Typography: role scale, line length, CJK/mixed-language wrapping, numeric alignment, font choice, line height.
- Color: strategy, semantic roles, contrast, accent dosage, state colors.
- Emotional fit: does the page match register, audience, purpose, and anti-references from `PRODUCT.md`?
- Edge states: empty, loading, error, disabled, selected, overflow, long content, large datasets.
- Microcopy: button labels, empty states, errors, tooltips, accessibility labels.

### 2. Deterministic Scan

When possible, run:

```bash
node skills/designed-html-builder/scripts/run-design-audit.mjs <target>
```

Use its JSON to report:

- Impeccable CLI findings, exit code, and skipped reason.
- Google DESIGN.md lint findings, summary, and skipped reason.
- Whether fallback review was required.

If runtime tools are unavailable, state the skipped reason and continue with this rubric.

## Intent

- The first screen makes the product, person, object, or task clear.
- The page supports the user's actual workflow instead of presenting a generic marketing layout.
- The content hierarchy is obvious within 5 seconds.
- The visual register matches the surface: brand, product/app, dashboard, document, resume, portfolio, landing page, or print.
- The design avoids first-order and second-order category reflex.

## Polish Workflow

Before changing visuals, discover:

- `PRODUCT.md` and `DESIGN.md`
- `DESIGN.json` or extended sidecars
- CSS variables and tokens
- Tailwind config
- component files and comparable components
- existing states, spacing, radii, typography, and color vocabulary

Classify every issue:

- `missing token`: create or document a reusable token/role.
- `one-off implementation`: replace local styling with the existing system.
- `conceptual mismatch`: change the pattern because it does not fit the user task or register.

## Harden Workflow

Stress the page with hostile content:

- long Chinese paragraphs
- long English words and URLs
- emoji
- CJK, Japanese, and Korean text
- RTL where relevant
- 30-40% longer translated strings
- empty, loading, error, disabled, selected states
- large datasets
- 320px mobile width and narrow containers
- zoom/text scaling
- print page breaks when relevant

## Typography

- Type scale has named roles.
- Body text is readable on desktop, mobile, and print when relevant.
- Line height supports language and density.
- Letter spacing is not negative for body text; display text may use it intentionally.
- Long words, URLs, dates, and numeric strings do not overflow containers.
- Font choice is intentional. Product UI may use system fonts; brand pages need stronger voice.

## Layout

- The page uses a clear grid and stable spacing rhythm.
- Dense tools and dashboards prioritize scanning, comparison, and repeated action.
- Landing pages use strong first-viewport subject matter and avoid pure template composition.
- Cards are not nested inside cards.
- Sections are not styled as unrelated floating cards.
- Fixed-format UI elements use stable dimensions so hover states and labels do not shift layout.

## Color And Contrast

- A color strategy is chosen before individual colors: restrained, committed accent, full palette, or immersive/drenched.
- Colors have semantic roles rather than one-off decoration.
- Text contrast is strong enough on every background.
- Muted text remains readable.
- Gray text is not placed on saturated or image backgrounds.
- One-note palettes are avoided unless the brand explicitly requires them.

## Components

- Buttons, tabs, toggles, sliders, menus, and inputs match the expected control type.
- States exist for hover, focus, selected, disabled, loading, empty, and error.
- Focus states are visible and keyboard-accessible.
- UI text fits inside controls at target widths.
- Empty and error states are useful and specific.

## Responsive Behavior

- Mobile layout is designed, not merely compressed.
- Important controls remain reachable.
- Tables, grids, and sidebars have explicit responsive behavior.
- Text does not overlap or occlude content.
- Touch targets meet at least 44px where practical.

## Interaction And Motion

- Motion clarifies state, continuity, or feedback.
- Avoid decorative bounce, elastic easing, and slow transitions that reduce usability.
- Interactive elements have visible focus states.
- Destructive actions prefer undo when feasible; irreversible actions require clear confirmation.

## Anti-Patterns

- Generic AI SaaS template look.
- Oversized hero typography inside compact tools.
- Purple-blue gradients used as the entire visual idea.
- Gradient text used as the main hierarchy device.
- Decorative orbs, blobs, or bokeh backgrounds.
- Side-stripe cards as the default visual treatment.
- Glassmorphism used as decoration rather than function.
- Every section wrapped in a card.
- Identical card grids used for unrelated content.
- Weak hierarchy hidden behind long text blocks.
- Pixel-perfect desktop with broken mobile.
- A beautiful HTML page that fails print or PDF output.
