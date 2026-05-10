# DESIGN.md Contract

Use `DESIGN.md` as a durable design-system contract for future agents. It should be specific enough to guide implementation and short enough to be followed.

## When To Create Or Update

Create or update `DESIGN.md` when:

- the user asks for a reusable style, system, website direction, or skill behavior
- a repo has multiple pages or will receive future design changes
- the current UI is inconsistent and needs a shared visual language
- HTML will be reused for PDF or resume variants

Do not create it for a tiny one-off artifact unless the user asks.

## Required Sections

A project-level `DESIGN.md` should define:

- Visual theme and atmosphere: concrete feel plus what to avoid
- Audience and use context: who uses it, where, and how often
- Color roles: semantic tokens before decorative colors
- Typography rules: font stack, role scale, line height, and wrapping
- Spacing and layout: page width, grid, section rhythm, density, responsive behavior
- Component styling: buttons, inputs, cards, tabs, tables, lists, dialogs, states
- Depth and elevation: when to use border, shadow, tint, or divider
- Do and don't: practical constraints future agents can enforce
- Responsive behavior: mobile/tablet/desktop changes
- Agent prompt guide: how future AI edits should preserve the system

## Token Standard

Use semantic roles like:

- `background`
- `surface`
- `surface-muted`
- `text`
- `text-muted`
- `border`
- `accent`
- `focus`
- `success`
- `warning`
- `danger`

Define where each role is allowed. Avoid unlabelled one-off colors.

## Component Standard

For each recurring component, describe:

- purpose
- visual anatomy
- spacing and sizing
- allowed variants
- hover/focus/selected/disabled/loading/empty/error states
- responsive behavior

## Agent Rule

When editing a project with `DESIGN.md`, future work should first read it, then either follow it or explicitly state why the design contract needs to change.
