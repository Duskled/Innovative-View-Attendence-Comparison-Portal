# Innovative View AM Attendance Portal — Plain HTML/CSS/JavaScript

This folder contains the complete static version of the portal. It does not require React, Next.js, npm, or a build step.

## Files

- `index.html` — workbook upload and comparison page
- `dashboard.html` — results dashboard
- `styles.css` — complete design and responsive styling
- `icons.js` — locally bundled Lucide SVG icons matching the hosted portal
- `theme.js` — dark/light theme switcher and saved preference handling
- `app.js` — upload-page interactions
- `dashboard.js` — dashboard filtering, searching and Excel download
- `attendance.js` — Excel reading, normalization, deterministic matching and export logic; SheetJS is bundled inside this file

## Run locally

ES modules require the files to be served over HTTP. From this folder, run one of these:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Host it

Upload every file in this folder to any static host, keeping the filenames together in the same directory. Examples include GitHub Pages, Cloudflare Pages, Netlify and static hosting provided by many control panels.

No attendance data is bundled into these files. Uploaded workbooks are processed in the user's browser and the latest comparison is kept in that browser tab's session storage.

Dark mode is the default. The theme control is available on both pages, and the browser remembers the user's light or dark selection.

## Accuracy behavior

The portal never creates placeholder attendance. Ambiguous or conflicting identities are excluded from attendance results rather than being auto-matched or shown under the wrong person.

Every dashboard and Excel comparison row represents one AM on one exact attendance date. Payment and RM IN/OUT values stay grouped under that date, and the export includes the original source row numbers for audit tracing.

Blank cells and explicit absence markers in IN/OUT columns are not attendance and are excluded. A record is created only when at least one valid time exists. Rows that reuse an AM identifier while conflicting on name or vendor are excluded from attendance results instead of borrowing attendance from another row.
