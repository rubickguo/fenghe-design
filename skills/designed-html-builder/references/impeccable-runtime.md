# Impeccable Runtime And Fallback

## Use when

- The user asks for runtime scan, strict audit, production-ready QA, or explicit Impeccable validation.
- You need to distinguish actual CLI results from local fallback review.

## Do not use when

- The task is a normal HTML generation or light polish request.
- There is no markup target and no user request for deep QA.

## Key outputs

- Runtime command rules.
- Fallback reason reporting.
- Two-pass critique, polish drift classification, and harden checks.

This skill uses Impeccable in three distinct ways. Keep the labels precise.

## Runtime Labels

- `ran Impeccable CLI`: `npx impeccable --json <target>` or `npx impeccable detect --json <target>` actually ran.
- `used Impeccable runtime fallback reference`: this file or `impeccable-internalized.md` was loaded because the runtime was unavailable or incomplete.
- `applied Impeccable-style internal rules`: the local design workflow was applied without claiming CLI execution.

## Upstream Runtime Command

Use `run-design-audit.mjs` first:

```bash
node skills/designed-html-builder/scripts/run-design-audit.mjs <target>
```

It attempts:

- Impeccable deterministic scan against markup, directories, or URLs.
- Google DESIGN.md lint when `DESIGN.md` exists.
- Structured JSON output with `ran`, `exitCode`, `findings`, `reason`, and `fallbackRequired`.

If calling directly, use:

```bash
npx impeccable --json <target>
```

If that fails because the installed CLI expects the explicit subcommand, retry:

```bash
npx impeccable detect --json <target>
```

## Live Overlay

When a browser target is available and environment support exists:

1. Start or locate the dev server.
2. Try `npx impeccable live`.
3. Inject/read the browser detector or console findings if exposed.
4. Stop the live process before final response.

If any step is unavailable, record `impeccable live: skipped:<reason>` and continue with screenshot/browser QA when possible.

## Fallback Behavior

Fallback is valid only when explicit:

- `tool=unavailable:npm unavailable`
- `tool=unavailable:network unavailable`
- `tool=unavailable:command failed`
- `tool=unavailable:no markup target`
- `tool=unavailable:browser unavailable`

Use this file plus `design-rubric.md`, `resume-html-design.md`, and `design-md-contract.md` as the review substrate. Final reports must separate runtime checks from fallback review.

## Two-Pass Critique

Critique has two lanes:

1. LLM design director review:
   - AI slop detection
   - hierarchy and information architecture
   - composition and density
   - typography and line length
   - color strategy and contrast
   - emotional fit to register and audience
   - edge states and microcopy

2. Deterministic scan:
   - Impeccable CLI when target can be scanned
   - browser overlay or screenshots when available
   - DESIGN.md lint when design tokens exist or are changed

## Polish Drift Classification

Before polishing, discover:

- `DESIGN.md`
- `PRODUCT.md`
- tokens and CSS variables
- Tailwind config
- component files and comparable components
- existing typography, spacing, color, radius, and state vocabulary

Classify each drift:

- `missing token`: the system lacks a reusable role or component token
- `one-off implementation`: an element ignores the existing system
- `conceptual mismatch`: the pattern does not fit the task or register

## Harden Hostile Content

Test or reason through:

- long Chinese paragraphs
- long English words and URLs
- emoji
- CJK, Japanese, and Korean text
- RTL where relevant
- 30-40% longer translations
- empty, loading, error, disabled, selected states
- large datasets
- narrow mobile widths
- print page breaks
- zoom and text scaling

Do not ship perfect-data-only layouts.
