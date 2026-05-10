# DESIGN.md Contract

## Use when

- The task creates, updates, validates, or explains `DESIGN.md`.
- The output will become a reusable design-system contract.
- The user asks for Google DESIGN.md compatibility or lint behavior.

## Do not use when

- The task is simple standalone HTML or a one-off style tweak.
- The task is resume/PDF-only and does not reuse a design system.

## Key outputs

- Google-compatible `DESIGN.md` contract rules.
- Token/prose precedence.
- Lint and repair priorities.

`DESIGN.md` is the project-root design-system contract. It is the first-priority visual source for agents when present.

## Structure

A valid `DESIGN.md` has:

- YAML frontmatter: machine-readable tokens.
- Markdown body: human-readable why/how.

Tokens are normative. Descriptive prose explains application but must not contradict tokens.

## Frontmatter Token Rules

Use the Google DESIGN.md token schema:

- `version`: optional, current value usually `alpha`
- `name`: project or design-system name
- `description`: one-line visual system summary
- `colors`: map of token name to sRGB hex value
- `typography`: map of role name to typography object
- `rounded`: map of scale level to dimension
- `spacing`: map of scale level to dimension or number
- `components`: map of component variant to component token properties

Token references use `{colors.primary}` style paths.

Component token properties are limited to:

- `backgroundColor`
- `textColor`
- `typography`
- `rounded`
- `padding`
- `size`
- `height`
- `width`

If a component needs unsupported details such as border color, shadow, focus ring, motion, backdrop filter, or responsive behavior, describe them in the Markdown body or a sidecar file (`DESIGN.json` / `docs/DESIGN-EXTENDED.md`).

## Markdown Body Rules

Use Google-compatible section order:

1. `## Overview`
2. `## Colors`
3. `## Typography`
4. `## Layout`
5. `## Elevation & Depth`
6. `## Shapes`
7. `## Components`
8. `## Do's and Don'ts`

Fold awesome-design-md-style guidance into these sections:

- visual atmosphere -> `Overview`
- color roles -> `Colors`
- typography hierarchy -> `Typography`
- spacing, grid, density, responsive behavior -> `Layout`
- shadows, borders, layers -> `Elevation & Depth`
- radii and form language -> `Shapes`
- component anatomy and states -> `Components`
- agent prompt guide and guardrails -> `Do's and Don'ts`

Do not create messy extra top-level sections for `Responsive Behavior` or `Agent Prompt Guide` unless preserving an existing file. Prefer folding or sidecar storage.

## Lint Requirement

After creating or updating `DESIGN.md`, run through the audit script:

```bash
node skills/designed-html-builder/scripts/run-design-audit.mjs .
```

The script attempts:

```bash
npx @google/design.md lint DESIGN.md --format json
```

If lint fails, fix in this order:

1. broken token refs
2. missing or malformed typography tokens
3. invalid color values or bad contrast
4. duplicate or out-of-order sections
5. orphaned tokens not used by prose or components

If the CLI is unavailable, report `DESIGN.md lint: skipped:<reason>` and manually review against this contract.

## Google Spec vs Awesome Examples

- Google DESIGN.md is the normative spec.
- awesome-design-md is a source of structure, token precision, and agent-readable description style.
- Do not imitate a brand identity blindly.
- Learn how examples name tokens, describe component states, and connect visual atmosphere to implementation.
- Keep output compatible with Google lint unless the user explicitly asks for a non-compatible sidecar.
