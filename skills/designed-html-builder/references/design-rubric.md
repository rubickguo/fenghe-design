# Design Rubric

Use this checklist when designing or reviewing websites, web apps, HTML pages, dashboards, and portfolio pages.

## Intent

- The first screen makes the product, person, object, or task clear.
- The page supports the user's actual workflow instead of presenting a generic marketing layout.
- The content hierarchy is obvious when scanning for 5 seconds.
- The design has a coherent point of view, not a pile of fashionable effects.

## Typography

- Type scale has named roles: page title, section title, body, metadata, labels, controls.
- Body text is readable at desktop and mobile sizes.
- Line height supports the language and density; Chinese-English mixed text is not cramped.
- Letter spacing is not negative.
- Long words, URLs, dates, and numeric strings do not overflow containers.
- Font choice is intentional. Do not default to Arial, Inter, or system fonts unless it matches the product context.

## Layout

- The page uses a clear grid and stable spacing rhythm.
- Dense tools and dashboards prioritize scanning, comparison, and repeated action.
- Landing pages use strong first-viewport subject matter and avoid pure template composition.
- Cards are not nested inside cards.
- Sections are not styled as unrelated floating cards.
- Fixed-format UI elements use stable dimensions so hover states and labels do not shift layout.

## Color And Contrast

- Colors have roles rather than one-off decoration.
- Text contrast is strong enough on every background.
- Muted text remains readable.
- Avoid gray text on saturated or image backgrounds.
- Avoid one-note palettes dominated by a single hue family unless the brand requires it.
- Avoid pure black/gray-only pages unless a specific editorial or product reason exists.

## Components

- Buttons, tabs, toggles, sliders, menus, and inputs match the expected control type.
- Icons are used for familiar tool actions when available.
- States exist for hover, focus, selected, disabled, loading, and empty data where relevant.
- UI text fits inside controls at all target widths.
- Error and empty states are useful, not generic.

## Responsive Behavior

- Mobile layout is designed, not merely compressed.
- Important controls remain reachable.
- Text does not overlap or occlude content.
- Tables, grids, and sidebars have explicit responsive behavior.
- Hero or first-screen content leaves a hint of the next section when the page is a landing page.

## Interaction And Motion

- Motion clarifies state, continuity, or feedback.
- Avoid decorative bounce, elastic easing, and slow transitions that reduce usability.
- Interactive elements have visible focus states.

## Anti-Patterns

- Generic AI SaaS template look.
- Oversized hero typography inside compact tools.
- Purple-blue gradients used as the entire visual idea.
- Decorative orbs, blobs, or bokeh backgrounds.
- Every section wrapped in a card.
- Weak hierarchy hidden behind long text blocks.
- Pixel-perfect desktop with broken mobile.
- A beautiful HTML page that fails print or PDF output.
