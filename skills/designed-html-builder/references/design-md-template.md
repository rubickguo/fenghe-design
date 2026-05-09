# DESIGN.md Template

Create or update a project-level `DESIGN.md` when the design direction should persist across future edits. Keep it short enough that future agents will actually follow it.

```markdown
# DESIGN.md

## Visual Theme And Atmosphere

Describe the product feeling in concrete terms. Include what it should not feel like.

## Audience And Use Context

Who uses this page, what they are trying to do, and how often they use it.

## Color Palette And Roles

- Background:
- Surface:
- Text:
- Muted text:
- Border:
- Accent:
- Success:
- Warning:
- Danger:
- Focus:

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

## Layout Principles

- Page width:
- Grid:
- Section rhythm:
- Mobile behavior:
- Print behavior, if relevant:

## Component Styling

Define buttons, inputs, tabs, cards, tables, lists, dialogs, and empty states that appear in this project.

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
