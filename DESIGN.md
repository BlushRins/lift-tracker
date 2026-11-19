---
# gstack: design-md-format=spec
name: Lift Tracker
description: A training log kept like a field record; warm paper, ink rules, figures in mono, one tangerine key to press.
# Token names match the CSS custom properties in index.html (paper = --color-paper, accent = --color-accent, space-md = --space-md).
# The app (index.html, v11) uses this system. The landing page (about.html) uses the same theme.
colors:
  paper: "oklch(96% 0.011 85)"
  paper-2: "oklch(99.5% 0.005 85)"
  paper-3: "oklch(92% 0.016 85)"
  ink: "oklch(18% 0.006 60)"
  ink-2: "oklch(28% 0.008 60)"
  muted: "oklch(44% 0.012 60)"
  rule: "oklch(88% 0.013 85)"
  accent: "oklch(70% 0.19 40)"
  accent-ink: "oklch(18% 0.006 60)"
  accent-soft: "oklch(91% 0.05 50)"
  focus: "oklch(60% 0.19 40)"
  green: "oklch(48% 0.11 150)"
  green-soft: "oklch(92% 0.04 150)"
  grid: "oklch(90% 0.014 85)"
  sheet: "oklch(99.3% 0.004 85)"
  error: "oklch(52% 0.19 27)"
  paper-dark: "oklch(17% 0.01 85)"
  paper-2-dark: "oklch(21% 0.01 85)"
  ink-dark: "oklch(94% 0.008 85)"
  muted-dark: "oklch(73% 0.012 85)"
  rule-dark: "oklch(33% 0.012 85)"
  accent-dark: "oklch(76% 0.16 45)"
  p25: "oklch(55% 0.2 27)"
  p20: "oklch(53% 0.18 262)"
  p15: "oklch(84% 0.17 88)"
  p10: "oklch(60% 0.15 150)"
  p5: "oklch(98% 0.005 85)"
  psm: "oklch(62% 0.01 85)"
typography:
  display:
    fontFamily: Red Hat Display
    fontWeight: 600
    letterSpacing: -0.035em
  body:
    fontFamily: Red Hat Text
    fontSize: 1rem
    lineHeight: 1.55
  label:
    fontFamily: Red Hat Text
    fontSize: 0.875rem
    fontWeight: 500
  figure:
    fontFamily: Red Hat Mono
    fontWeight: 500
    fontFeature: tnum
  text-xs:
    fontSize: 0.75rem
  text-sm:
    fontSize: 0.875rem
  text-md:
    fontSize: 1rem
  text-lg:
    fontSize: 1.2rem
  text-xl:
    fontSize: 1.44rem
  text-display:
    fontSize: 1.728rem
  text-figure:
    fontSize: clamp(2rem, 10.5vw, 2.488rem)
  text-hero:
    fontSize: clamp(3.583rem, 19vw, 4.3rem)
rounded:
  pill: 6px
  card: 10px
  entry: 14px
  sheet: 3px
spacing:
  space-3xs: 2px
  space-2xs: 4px
  space-xs: 8px
  space-sm: 12px
  space-md: 16px
  space-lg: 24px
  space-xl: 40px
  space-2xl: 64px
components:
  key-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-ink}"
    rounded: "{rounded.pill}"
  key:
    backgroundColor: "{colors.paper-2}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
  entry:
    backgroundColor: "{colors.paper-2}"
    borderColor: "{colors.ink}"
    rounded: "{rounded.entry}"
  field:
    backgroundColor: "{colors.paper-2}"
    borderColor: "{colors.muted}"
    rounded: "{rounded.pill}"
---

# Lift Tracker

## Overview

**Creative North Star:** a training log kept like a field record: the set you are about to lift is written down on a waterproof notebook page, and everything else is a ruled record you can read back.
**Product context:** an offline phone web app (PWA) for logging barbell and bodyweight lifts, used one-handed between sets. The data lives only on the phone.
**System:** Hallmark's Furrow theme (dealt 2026-11-16), light and dark from one token set.
**Key characteristics:**
- The entry card is the signature: an ink head with the lift, kg and reps cells on an 8px notebook grid, moulded step keys at the foot, the plate list under an ink line.
- Figures (weights, reps, dates, times) are in Red Hat Mono, tabular; words are Red Hat Text; heads are Red Hat Display 600.
- Tangerine is a fill with ink on it, kept for the one key to press (Log set), the chosen target, trained calendar days and the PR mark. Selected chips are an ink fill.
- Green is what is in date: weeks trained, milestones earned, the row just logged.

## Colors

**Posture:** committed. The warm paper family carries the screen; tangerine stays a signal. Both modes are derived from the same tokens with the hue unchanged: dark paper at L 17, ink at L 94, elevation by lightness, shadows replaced by a hairline. The plate colours are the standard bumper-plate colours and appear only in the plate calculator.

## Typography

Labels, chips, tabs and table heads are Red Hat Text 500 a step smaller, sentence case, never tracked and never uppercase. Body never goes below 16px. Three weights in use: 400, 500, 600.

## Layout

One column at a phone's width (560px max). Spacing uses the `space-*` steps. Sections are separated by whitespace and a 1px ink rule over each list, with `rule` hairlines between rows. Only two surfaces lift: the entry card and the backup sheet.

## Components

- **Keys:** moulded, 6px radius, a lit top edge; pressed sinks 1px. Log set is 56px tall; step keys are 56px; every hit target is 44px or more.
- **Rest timer:** counts down inside Log set, so the key never changes size.
- **Sheets:** notebook cards (paper-2, ink ring, lift shadow) over a scrim; the key row stays pinned to the foot.

## Do's and Don'ts

- Do: keep tangerine as a fill with ink on it, one key to press per screen.
- Do: show PRs as the heaviest weight (more reps at the same weight also counts).
- Do: keep it fully offline and the data on the phone.
- Don't: bring back e1RM or volume totals.
- Don't: use uppercase or tracked labels, middle-dot strings, dashes in copy, or tangerine as type.
- Don't: invent numbers anywhere.

## Motion

Transforms and opacity only, 120 to 220ms, `ease-out` arrivals: a key press, a toast, a sheet, the row just logged highlighting once in green. Nothing loops; everything is off under reduced motion.

## Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-10-30 | "Gym floor" look: near-black, flat, Barlow, yellow fill only | The owner felt v2 looked AI-generated and picked this direction |
| 2026-10-30 | No volume totals, then no e1RM | The owner found both confusing; PR is the heaviest weight |
| 2026-11-12 | v8 polish: press states, 44px targets, short motion | Feel finished without changing the look |
| 2026-11-12 | Landing page as about.html, written down here | Created by /design-html from the app's own tokens |
| 2026-11-15 | Token names match the CSS; `fs-*` type scale and `sp-*` spacing added | Design-system audit: 33 font sizes and 18 spacing values collapsed to 13 and 9 steps with no layout change |
| 2026-11-16 | v10: rest timer inside the Log set button, per-lift weight step and rest, screen kept on during a workout | The timer lives in the button so nothing moves under the thumb |
| 2026-11-16 | v11: full Hallmark redesign on the Furrow theme, replacing the gym-floor system in the app | The owner asked for a new dealt theme and named all four aims: a busy Log screen, plain Progress and History, a generated look, a fresh version |
