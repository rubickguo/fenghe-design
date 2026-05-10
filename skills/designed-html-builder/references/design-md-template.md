# DESIGN.md Template

Create or update a project-level `DESIGN.md` when the design direction should persist across future edits. Keep it concrete enough to guide implementation and short enough that future agents will actually follow it.

```markdown
# DESIGN.md

## Visual Theme And Atmosphere

Describe the product feeling in concrete terms. Include what it should not feel like.

## Audience And Use Context

Who uses this page, what they are trying to do, and how often they use it.

## Color Palette And Roles

- `background`:
- `surface`:
- `surface-muted`:
- `text`:
- `text-muted`:
- `border`:
- `accent`:
- `focus`:
- `success`:
- `warning`:
- `danger`:

Explain where each role is allowed.

## Typography Rules

- Font stack:
- Page title:
- Section title:
- Body:
- Metadata:
- Control labels:
- Line height:
- Chinese-English wrapping rules:
- Maximum readable line length:

## Layout Principles

- Page width:
- Grid:
- Section rhythm:
- Density:
- Mobile behavior:
- Print behavior, if relevant:

## Component Styling

Define buttons, inputs, tabs, cards, tables, lists, dialogs, and empty states that appear in this project.

For each recurring component, specify:

- purpose
- anatomy
- spacing and sizing
- allowed variants
- hover/focus/selected/disabled/loading/empty/error states
- responsive behavior

## Depth And Elevation

Define when shadows, borders, surfaces, and dividers are allowed.

## Do And Don't

Do:
- 

Don't:
- 

## Responsive Behavior

Describe exact layout changes for mobile, tablet, and desktop.

## Agent Prompt Guide

When editing UI in this project, preserve these design rules and verify the changed screen visually before final response.
```

## Usage Notes

- Do not blindly imitate another brand's visible identity.
- Adapt references to the user's content, audience, and product category.
- A good `DESIGN.md` should prevent drift: typography, color roles, spacing, and component rules matter more than vague adjectives.
- If an existing UI already has patterns, extract and formalize them before adding new ones.
- If the existing system is weak, state the proposed design contract explicitly before broad edits.
