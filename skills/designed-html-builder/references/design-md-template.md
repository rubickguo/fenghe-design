# DESIGN.md Template

## Use when

- The task creates or replaces a project-level `DESIGN.md`.
- The task needs a Google-compatible frontmatter + Markdown template.

## Do not use when

- The task only reads or critiques an existing `DESIGN.md`.
- The task is normal HTML/page work without design-system output.

## Key outputs

- YAML frontmatter with supported token groups.
- Google-compatible section order.
- Places to fold awesome-design-md-style guidance without breaking lint.

Use this template when creating or replacing a project-level `DESIGN.md`. Replace placeholders with actual project values. Do not leave placeholder tokens in committed output.

```markdown
---
version: alpha
name: [Project Name]
description: [One-line visual system description]
colors:
  primary: "#3158D4"
  background: "#F8F7F4"
  surface: "#FFFFFF"
  text: "#171717"
  muted: "#666A73"
  border: "#DADDE3"
  success: "#1F8A4C"
  warning: "#B76E00"
  danger: "#C83A32"
typography:
  display:
    fontFamily: "[Display Font], system-ui, sans-serif"
    fontSize: "48px"
    fontWeight: 650
    lineHeight: 1.08
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "[UI Font], system-ui, sans-serif"
    fontSize: "28px"
    fontWeight: 650
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  body:
    fontFamily: "[UI Font], system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0"
  label:
    fontFamily: "[UI Font], system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "0"
rounded:
  sm: "4px"
  md: "8px"
  lg: "12px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  section: "64px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.background}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
  button-primary-hover:
    backgroundColor: "{colors.text}"
    textColor: "{colors.background}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: "24px"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "10px 12px"
---

# Design System: [Project Name]

## Overview

Describe the visual atmosphere, audience, reading context, and product register. Include what this system must not feel like. Fold any agent prompt guidance here or into Do's and Don'ts.

## Colors

Describe each color role and where it is allowed. Keep token names aligned with the YAML frontmatter. Explain palette strategy: restrained, committed accent, full palette, or immersive/drenched.

## Typography

Define hierarchy, font family intent, role usage, line height, line length, numeric behavior, and CJK/mixed-language wrapping rules. For product UI, prefer stable fixed scales. For brand/content surfaces, fluid display type is allowed when it preserves readable measure.

## Layout

Define page width, grid, spacing rhythm, density, responsive behavior, mobile collapse, and print behavior if relevant. This is where awesome-design-md-style Responsive Behavior should be folded.

## Elevation & Depth

Define shadows, borders, tonal layers, dividers, focus rings, and when each is allowed. If the system is flat, state the alternative hierarchy mechanism.

## Shapes

Define radius vocabulary and shape language for cards, controls, tags, images, dialogs, and print/document containers.

## Components

Describe recurring components, their anatomy, sizing, variants, and states: default, hover, focus, active, disabled, loading, error, empty, selected. Keep unsupported implementation details in prose or sidecar, not component frontmatter properties.

## Do's and Don'ts

- Do preserve the token roles before introducing new colors or type sizes.
- Do verify long text, CJK/mixed language wrapping, and narrow mobile widths.
- Do run DESIGN.md lint after token changes when the CLI is available.
- Don't imitate another brand identity directly.
- Don't use decorative blobs, gradient text, side-stripe cards, or nested cards as default hierarchy.
- Don't claim runtime checks ran unless they actually ran.
```

## Notes

- The YAML frontmatter is the machine layer. Keep it valid and token-oriented.
- The Markdown body is the application layer. Put responsive behavior, agent guidance, component state explanations, and print/CJK notes there.
- If extra structure is valuable but not Google-spec shaped, write it to `DESIGN.json` or `docs/DESIGN-EXTENDED.md`.
