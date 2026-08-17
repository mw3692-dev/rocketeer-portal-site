# Rocketeer Portal — mimic

A static, responsive mimic of the internal **Rocket Station "Rocketeer Portal"**
(`sites.google.com/rocketstation.com/rocketeerportal`), rebuilt from the 13 links provided.
Content was captured from the live (authenticated) portal for review/redesign purposes.

## Run it

```bash
cd rocketeer-portal-site
python3 -m http.server 8000     # → http://localhost:8000
```

Plain HTML/CSS/JS, no build step.

## Pages

| Area | Page | Source link |
|------|------|-------------|
| Home | `index.html` | (constructed landing) |
| My Work | `holiday-schedule.html` | my-work/holiday-schedule |
| My Work | `schedule-update.html` | my-work/schedule-update |
| My Work | `time-off.html` | Apps Script PTO app (`…/exec?page=pto`) |
| Get Help | `benefits.html` | get-help/benefit |
| Get Help | `rtem-scheduler.html` | HubSpot RTEM scheduler |
| My Community | `healthline.html` | my-community/healthline |
| My Community | `hopeline.html` | my-community/hopeline |
| My Community | `hmo-healthcare.html` | my-community/hmo-healthcare |
| My Community | `rs-cares.html` | my-community/rs-cares |
| My Community | `sms-launch.html` | my-community/rocketeer-sms-launch |
| My Community | `sports-hobby.html` | my-community/sports-hobby |
| My Community | `cvc-recognition.html` | my-community/cvc/recognition |
| My Community | `events.html` | my-community/events |

## Notes

- **Design** mirrors the original Google Sites theme: gold `#f4c94b` + black + navy,
  yellow SMS banner, photo hero with the Rocket Station "target" ring, alternating
  black/white sections, yellow buttons, black footer.
- **Live tools are placeholders.** The real portal embeds Google Apps Script apps
  (Time Off, Holiday Schedule, Schedule Update), a HubSpot scheduler, Jotforms, and
  videos/photo galleries that require internal Google Workspace / third-party auth.
  Those are represented here as styled "loads here" placeholders with links, since the
  data and forms can't be reproduced statically.
- **Hero image** uses an Unsplash placeholder (`hero__bg`); swap for the real portal
  banner assets when available.
- Fonts: **Poppins** (headings) + **Inter** (body) as close substitutes for the
  original theme fonts.

## Visibility

This repo is **public but unlisted** — every page carries `<meta name="robots" content="noindex, nofollow">` so search engines don't index it. It is intended for internal review only; the content is not password-protected, so treat the repo/site URL as shareable-with-the-team but not for public distribution.

## Versions

- **V1** (root) — mimic with buttons pointing at the **live Google/Jotform** URLs.
- **V2** (`/v2/`) — same site, but every form button opens the **self-hosted replacement** in `v2/forms/` instead of Google. This is the drop-in for when Google is retired (wire each form's `data-endpoint` to a backend — see `forms/README.md`). Marked with a gold **V2** badge in the nav.

Live: `…/rocketeer-portal-site/` (V1) and `…/rocketeer-portal-site/v2/` (V2).
