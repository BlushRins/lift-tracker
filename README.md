# Lift Tracker

An offline lifting log. Log each set's weight (kg) and reps; your best set is the heaviest weight (more reps breaks a tie), and it shows how much stronger you got week over week.

- Installable web app (PWA). Works with no connection after the first visit.
- Log tab: one set per tap ("Log set 3"), big kg/reps readout with steppers, **Beat last time** (last session's sets plus two targets: +1 rep or +2.5 kg, and a live Ahead/Below verdict), plate calculator in bumper-plate colours (20/15 kg bar).
- Routines: save a day like "Leg day" (Leg press → Squat → RDL); lifts show in order, tick off as you log, with a Next button.
- Progress tab: strength gained (kg added to your best set per lift), 8-week streak strip, personal records (heaviest weight per lift; same weight with more reps also counts), heaviest-each-week chart, milestones. No volume totals and no e1RM, on purpose: everything is plain kg and reps.
- Bodyweight lifts (pull-ups, dips, push-ups): log reps with 0 kg, or any added weight; shown as "BW" / "BW +10".
- Edit lifts: rename (history and routines follow), mark as bodyweight, hide (history stays), or delete an unused lift.
- Body weight: a weekly weigh-in on Progress with a simple trend line.
- History tab: training calendar (tap a day to jump to it), days grouped by lift, Edit, Delete with Undo, backup export/import (includes routines).
- Data is stored on the device only (localStorage). Use **Export backup** to keep a copy.

Design rules ("gym floor"): flat, near-black, rules instead of nested cards, Barlow Condensed numbers. Yellow `#FFC400` is only ever a fill with black text on it, never a text colour.

Live: https://blushrins.github.io/lift-tracker/

When changing any app file, bump `VERSION` in `sw.js` so installed copies pick up the update.
