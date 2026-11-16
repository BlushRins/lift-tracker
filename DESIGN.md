---
# gstack: design-md-format=spec
name: Lift Tracker
description: A gym-floor log for one-handed use between sets; near-black, flat and loud only where it counts.
# Token names match the CSS custom properties in index.html (yellow = --yellow, fs-md = --fs-md, sp-12 = --sp-12).
colors:
  yellow: "#FFC400"
  on-yellow: "#111111"
  yellow-press: "#E0AC00"
  bg: "#0E0E0E"
  raised: "#171717"
  rule: "#2A2A2A"
  rule-strong: "#3D3D3A"
  ink: "#F2F2EE"
  muted: "#8C8C86"
  up: "#2BD47D"
  down: "#FF5A4E"
  bg-light: "#F3F2EE"
  raised-light: "#E8E6E0"
  rule-light: "#D6D3CB"
  rule-strong-light: "#B9B6AD"
  ink-light: "#111111"
  muted-light: "#5C5C57"
  up-light: "#0A7A3E"
  down-light: "#B3261E"
  p25: "#D7262E"
  p20: "#2563D9"
  p15: "#FFC400"
  p10: "#1E9E4A"
  p5: "#F2F2EE"
  p5-light: "#FFFFFF"
  psm: "#6E6E6A"
  psm-light: "#9A9890"
typography:
  display:
    fontFamily: Barlow Condensed
    fontWeight: 700
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
  fs-2xs:
    fontSize: 0.75rem
  fs-xs:
    fontSize: 0.82rem
  fs-sm:
    fontSize: 0.9rem
  fs-ui:
    fontSize: 0.95rem
  fs-body:
    fontSize: 1rem
  fs-md:
    fontSize: 1.1rem
  fs-lg:
    fontSize: 1.25rem
  fs-xl:
    fontSize: 1.4rem
  fs-2xl:
    fontSize: 1.6rem
  fs-3xl:
    fontSize: 2rem
  fs-4xl:
    fontSize: 2.2rem
  fs-num:
    fontSize: 3.6rem
  fs-hero:
    fontSize: clamp(4rem, 22vw, 6rem)
rounded:
  sm: 2px
  md: 4px
  phone: 20px
spacing:
  sp-4: 4px
  sp-6: 6px
  sp-8: 8px
  sp-10: 10px
  sp-12: 12px
  sp-14: 14px
  sp-16: 16px
  sp-20: 20px
  sp-24: 24px
  sp-32: 32px
  sp-48: 48px
  sp-64: 64px
  sp-96: 96px
components:
  button-primary:
    backgroundColor: "{colors.yellow}"
    textColor: "{colors.on-yellow}"
    rounded: "{rounded.sm}"
  button-primary-pressed:
    backgroundColor: "{colors.yellow-press}"
  button:
    backgroundColor: "{colors.raised}"
    textColor: "{colors.ink}"
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

**Strategy:** Restrained. Neutrals carry the whole screen; the yellow appears as a fill on the primary action, PR marks and trained calendar days, always with `on-yellow` text on it. `up` and `down` (green and red) are only for the change markers and destructive links.
**Light or dark:** dark by default, because the app is read under gym lighting and between sets; the light set applies when the phone is in light mode (`prefers-color-scheme`). Light surfaces keep the same hierarchy: raised is darker than the page, rules get stronger, muted text stays above 4.5:1 on both page and raised surfaces.
The plate colours are the standard bumper-plate colours and appear only in the plate calculator.

## Typography

Barlow Condensed is the display and numeral face (headings in uppercase, weight and reps in tabular figures); Barlow is the reading face. Both load from Google Fonts with metric-matched local fallbacks, so the large numerals don't jump when the web font arrives or is missing offline. Body text never goes below 16px. Labels are small condensed uppercase with a little tracking.

Every font size in the app is a step of the `fs-*` scale; sizes in `em` (the unit after a number, the PR mark) are proportions of their parent and stay as they are. `fs-num` is the weight and reps readout, `fs-hero` the strength-gained number. The landing page uses its own larger display sizes (48 to 112px) for headlines.

## Layout

Padding, margins and gaps use the `sp-*` steps: the app uses 4 to 24, the landing page 4 to 96. Values of 1 to 3px are optical nudges (hairline offsets, badge padding) and stay literal, and negative margins stay literal because each one cancels a neighbouring size.

Single column on the phone with a 16px gutter and a sticky Log set bar above the tab bar. Sections are separated by hairline rules and a 3px ink rule on the landing page; nothing is nested in a bordered box inside another bordered box. The landing page widens to a 1200px max with the hero text beside one phone screenshot from 1024px.

## Elevation & Depth

None. No shadows, glows, gradients, blur or glass. Depth comes from the raised surface colour and rules only.

## Shapes

Controls use a 2px radius in the app (4px on the landing page's larger buttons). The only large radius is the 20px phone frame around screenshots on the landing page.

## Components

- **Primary button:** yellow fill, black condensed uppercase label, pressed state darkens to `yellow-press`; never yellow text on a dark ground.
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
| 2026-11-15 | Token names match the CSS; `fs-*` type scale and `sp-*` spacing added | Design-system audit: 33 font sizes and 18 spacing values collapsed to 13 and 9 steps with no layout change |
| 2026-11-16 | v10: rest timer inside the Log set button, per-lift weight step and rest, screen kept on during a workout | The timer lives in the button so nothing moves under the thumb; no new colours or motion |
