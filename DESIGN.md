---
# gstack: design-md-format=spec
name: Lift Tracker
description: A gym-floor log for one-handed use between sets; near-black, flat and loud only where it counts.
colors:
  primary: "#FFC400"
  on-primary: "#111111"
  primary-pressed: "#E0AC00"
  surface: "#0E0E0E"
  surface-raised: "#171717"
  rule: "#2A2A2A"
  rule-strong: "#3D3D3A"
  text: "#F2F2EE"
  text-muted: "#8C8C86"
  success: "#2BD47D"
  error: "#FF5A4E"
  surface-light: "#F3F2EE"
  surface-raised-light: "#E8E6E0"
  rule-light: "#D6D3CB"
  rule-strong-light: "#B9B6AD"
  text-light: "#111111"
  text-muted-light: "#5C5C57"
  success-light: "#0A7A3E"
  error-light: "#B3261E"
  plate-25kg: "#D7262E"
  plate-20kg: "#2563D9"
  plate-15kg: "#FFC400"
  plate-10kg: "#1E9E4A"
  plate-5kg: "#F2F2EE"
  plate-small: "#6E6E6A"
typography:
  display:
    fontFamily: Barlow Condensed
    fontWeight: 700
    fontSize: 3.6rem
    letterSpacing: 0.01em
  body:
    fontFamily: Barlow
    fontSize: 1rem
    lineHeight: 1.45
  label:
    fontFamily: Barlow Condensed
    fontSize: 0.82rem
    letterSpacing: 0.06em
  mono:
    fontFamily: Barlow Condensed
    fontFeature: tnum
rounded:
  sm: 2px
  md: 4px
  phone: 20px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.sm}"
  button-primary-pressed:
    backgroundColor: "{colors.primary-pressed}"
  button:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.text}"
    borderColor: "{colors.rule-strong}"
    rounded: "{rounded.sm}"
  input:
    borderColor: "{colors.rule-strong}"
    rounded: "{rounded.sm}"
---

# Lift Tracker

## Overview

**Creative North Star:** a gym floor, not a dashboard: dark rubber, painted lines, and one yellow you can find with a tired thumb.
**Product context:** an offline phone web app (PWA) for logging barbell and bodyweight lifts at the gym, used one-handed between sets. The data lives only on the phone.
**Mode per surface:** the app is Operate (log fast, read last time at a glance); the landing page (`about.html`) is Persuade (one action: open the app).
**Key characteristics:**
- Near-black, flat, hairline rules instead of boxes.
- Big condensed numerals for weight and reps; everything else stays quiet.
- Yellow is reserved for the one thing to press next.
- Feels like equipment, not a template: no decoration that isn't information.

## Colors

**Strategy:** Restrained. Neutrals carry the whole screen; the yellow appears as a fill on the primary action, PR marks and trained calendar days, always with `on-primary` text on it. Success and error are only for the up and down change markers and destructive links.
**Light or dark:** dark by default, because the app is read under gym lighting and between sets; the light set applies when the phone is in light mode (`prefers-color-scheme`). Light surfaces keep the same hierarchy: raised is darker than the page, rules get stronger, muted text stays above 4.5:1 on both page and raised surfaces.
The plate colours are the standard bumper-plate colours and appear only in the plate calculator.

## Typography

Barlow Condensed is the display and numeral face (headings in uppercase, weight and reps in tabular figures); Barlow is the reading face. Both load from Google Fonts with metric-matched local fallbacks, so the large numerals don't jump when the web font arrives or is missing offline. Body text never goes below 16px. Labels are small condensed uppercase with a little tracking.

## Layout

Single column on the phone with a 16px gutter and a sticky Log set bar above the tab bar. Sections are separated by hairline rules and a 3px ink rule on the landing page; nothing is nested in a bordered box inside another bordered box. The landing page widens to a 1200px max with the hero text beside one phone screenshot from 1024px.

## Elevation & Depth

None. No shadows, glows, gradients, blur or glass. Depth comes from the raised surface colour and rules only.

## Shapes

Controls use a 2px radius in the app (4px on the landing page's larger buttons). The only large radius is the 20px phone frame around screenshots on the landing page.

## Components

- **Primary button:** yellow fill, black condensed uppercase label, pressed state darkens to `primary-pressed`; never yellow text on a dark ground.
- **Buttons, chips, steppers:** raised fill with a strong rule; every tappable thing is at least 44 x 44px; `:focus-visible` is a clear ink outline.
- **Steppers:** repeat while held; floors at 0 kg and 1 rep.
- **Toasts and sheets:** enter and leave with short motion; sticky toasts carry an action.

## Do's and Don'ts

- Do: keep yellow as a fill with black text, used for one next action per screen.
- Do: show PRs as the heaviest weight (more reps at the same weight also counts).
- Do: keep every tap target at least 44px and every body text at least 16px.
- Do: keep it fully offline and the data on the phone.
- Don't: bring back e1RM (estimated one-rep max) anywhere.
- Don't: show volume totals (weight x reps x sets) or other "big number" stats.
- Don't: add gradients, shadows, glows, emoji, confetti or dashboard cards.
- Don't: invent proof on the landing page (reviews, user counts, ratings).

## Motion

- **Approach:** minimal-functional.
- **Easing:** cubic-bezier(.2, .7, .2, 1) for app state changes.
- **Duration:** press feedback 120ms, enter and exit 200ms or less, nothing over 250ms, nothing looping.
- **The one authored moment:** the row you just logged highlights once.
- All motion is off under `prefers-reduced-motion: reduce`.

## Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-10-30 | "Gym floor" look: near-black, flat, Barlow, yellow fill only | The owner felt v2 looked AI-generated and picked this direction |
| 2026-10-30 | No volume totals, then no e1RM | The owner found both confusing; PR is the heaviest weight |
| 2026-11-12 | v8 polish: press states, 44px targets, short motion | Feel finished without changing the look |
| 2026-11-12 | Landing page as about.html, written down here | Created by /design-html from the app's own tokens |
