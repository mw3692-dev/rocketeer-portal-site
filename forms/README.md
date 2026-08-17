# Form replacements (for retiring Google)

Native, self-hosted HTML versions of **every Google Form and Jotform** used in the
Rocketeer Portal. Each one mirrors the original's fields, input types, options, and
required flags — captured directly from the live forms — so they can replace Google
when it's retired.

Open **`index.html`** for a directory of all 13 forms.

## Forms included

| File | Replaces | Source | Fields |
|------|----------|--------|--------|
| `basketball.html` … `running.html` (8) | Sports & Hobby club sign-ups | Google Forms | 3 each |
| `cvc-nominate.html` | Core Value Champion Nomination | Google Form | 5 |
| `rs-cares-volunteer.html` | RS Cares Volunteer Sign-Up | Google Form | 12 |
| `jot-hopeline.html` | Hopeline Session Request | Jotform | 14 |
| `jot-hmo-dependent.html` | HMO Dependent Enrollment | Jotform | 7 |
| `jot-contractor-update.html` | Contractor Record Update Request | Jotform | 26 |

- **`schema.json`** — machine-readable field definitions for all forms (useful for
  building a database, API, or importing into another form tool).
- **`forms.css`** / **`forms.js`** — shared styling (portal theme) + client-side
  validation and submit handling.

## Wiring them to a real backend

Out of the box the forms **validate and show a local confirmation** (demo mode — no data
is sent). To capture submissions when you cut over from Google, point each form at a
backend. Options, easiest first:

1. **Netlify Forms** (if hosted on Netlify): add `netlify` and a `name` attribute to each
   `<form>`. Netlify captures submissions automatically — no code.
2. **Formspree** (works anywhere, incl. GitHub Pages): set the form's
   `data-endpoint="https://formspree.io/f/XXXXXXX"`. `forms.js` will POST to it.
3. **Custom API / Google Sheets / database**: set `data-endpoint` to your URL; `forms.js`
   POSTs a standard `FormData` payload you can store wherever you like.

File-upload fields (CVC supporting docs, HMO documents) need a backend that accepts
multipart uploads (Formspree paid, Netlify, or custom).

## Notes on fidelity

- Jotform **name** and **address** fields are expanded into their sub-inputs
  (first/last, street/city/state/zip/country) to match the originals.
- Dropdown/radio/checkbox **options** are copied verbatim from the live forms.
- These files are marked `noindex` like the rest of the staging site.
