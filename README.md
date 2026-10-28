# Lift Tracker

An offline lifting log. Log weight (kg), reps and sets; it scores each set by estimated one-rep max (Epley: kg × (1 + reps ÷ 30)) and shows how much stronger you got week over week.

- Installable web app (PWA). Works with no connection after the first visit.
- Log tab: exercise chips, −/+ steppers, last weight auto-filled, Repeat last set, plate calculator (20/15 kg bar).
- Progress tab: animated strength-gained counter, weekly streak, lift cards with trend lines, chart with PR rings, weight moved as familiar objects, badges.
- History tab: sets as cards grouped by day, Edit, Delete with Undo, backup export/import.
- PR celebrations (confetti, vibration on Android) when a set beats your best ever.
- Data is stored on the device only (localStorage). Use **Export backup** to keep a copy.

Live: https://blushrins.github.io/lift-tracker/

When changing any app file, bump `VERSION` in `sw.js` so installed copies pick up the update.
