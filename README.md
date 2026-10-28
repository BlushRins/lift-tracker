# Lift Tracker

An offline lifting log. Log weight (kg), reps and sets; it scores each set by estimated one-rep max (Epley: kg × (1 + reps ÷ 30)) and shows how much stronger you got week over week.

- Installable web app (PWA). Works with no connection after the first visit.
- Data is stored on the device only (localStorage). Use **Export backup** to keep a copy.

Live: https://blushrins.github.io/lift-tracker/

When changing any app file, bump `VERSION` in `sw.js` so installed copies pick up the update.
