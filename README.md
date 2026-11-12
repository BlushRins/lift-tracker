# Lift Tracker

An offline lifting log. Log each set's weight (kg) and reps; your best set is the heaviest weight (more reps breaks a tie), and it shows how much stronger you got week over week.

- Installable web app (PWA). Works with no connection after the first visit.
- Log tab: one set per tap ("Log set 3"), big kg/reps readout with steppers, **Beat last time** (last session's sets plus two targets: +1 rep or +2.5 kg, and a live Ahead/Below verdict), plate calculator in bumper-plate colours (20/15 kg bar).
- Routines: save a day like "Leg day" (Leg press → Squat → RDL); lifts show in order, tick off as you log, with a Next button.
- Progress tab: strength gained (kg added to your best set per lift), 8-week streak strip, personal records (heaviest weight per lift; same weight with more reps also counts), heaviest-each-week chart, milestones. No volume totals and no e1RM, on purpose: everything is plain kg and reps.
- Lift picker: tap Search (or the lift name) for a full-screen search over your lifts (most recent first, with your last set) and a built-in library of about 55 exercises with muscle-group filters. Aliases work (`rdl`, `ohp`, `db bench`, `pullup`); Enter picks the top result, and anything not found can be added in one tap. The Log screen's chip row shows your 8 most recent lifts.
- Bodyweight lifts (pull-ups, dips, push-ups): log reps with 0 kg, or any added weight; shown as "BW" / "BW +10".
- Edit lifts: rename (history and routines follow), mark as bodyweight, hide (history stays), or delete an unused lift.
- Body weight: a weekly weigh-in on Progress with a simple trend line.
- History tab: training calendar (tap a day to jump to it), days grouped by lift, Edit, Delete with Undo, backup export/import (includes routines).
- Data is stored on the device only (localStorage). Use **Export backup** to keep a copy; on an iPhone it opens the share sheet (Save to Files, Drive, mail), elsewhere it downloads the .json file. The Backup section says when the last backup was, and a damaged saved log is kept aside instead of being overwritten.
- v8, phone shell: after 3 logged sets a one-line **Install** row appears on Log (on iPhone: Share, then Add to Home Screen); "Not now" hides it for 30 days. Updates download in the background and wait: **New version ready. Refresh** swaps over only when tapped, or by itself the next time the app is opened from closed. With the keyboard up, Log set sits right above it and the tab bar steps aside; Enter on kg goes to reps, Enter on reps logs the set. The phone's Back button closes an open sheet instead of leaving the app. **Share Lift Tracker** at the bottom of History sends the app's address, never your data.

Design rules ("gym floor"): flat, near-black, rules instead of nested cards, Barlow Condensed numbers. Yellow `#FFC400` is only ever a fill with black text on it, never a text colour.

Live: https://blushrins.github.io/lift-tracker/

When changing any app file, bump `VERSION` in `sw.js` (once per release) so installed copies pick up the update. Installed copies show "New version ready." and switch over on Refresh, or the next time the app is opened from closed. Never add a manifest `id` or change `start_url` / `scope`: that would turn every existing install into a second app.
