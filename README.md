# Dapo Omoworare portfolio

A static site with no build step: HTML, CSS and plain JavaScript. The visual direction follows the ANANTA game site, with letterboxed full-screen panels, condensed display type and a project roster laid out like a character select screen. The night skylines are drawn in code, so there is no stock art to license.

## Edit the content

All text, links and projects live in `data.js`.

- **LinkedIn:** set `links.linkedin`. The button appears once the value is not empty.
- **Resume:** put `resume.pdf` in the project root and set `links.resume` to `"/resume.pdf"`.
- **Projects:** each entry has a name, a headline, a short body, a stack list, links and an `art` colour. `screen` is either `"image"` (with an `image` path) or one of the built-in mock screens: `alerts`, `jobs`, `map`, `prompt`, `swap`.
- **Log and archive:** plain lists, newest first.

## Run locally

```bash
python3 -m http.server 8080
# then open http://localhost:8080
```

## Deploy to Vercel

Option A, from GitHub:
1. Push this folder to a new repo, for example `Dapper-D/portfolio`.
2. On vercel.com choose **Add New, Project**, import the repo and keep the framework preset at **Other**. There is no build command and no output directory.
3. Click **Deploy**.

Option B, from the command line:
```bash
npm i -g vercel
vercel        # first run links the project
vercel --prod
```

`vercel.json` turns on clean URLs, sets a one-day cache on `/assets` and adds basic security headers.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Page structure |
| `styles.css` | Every style, including the responsive and reduced-motion rules |
| `main.js` | Renders content from `data.js`, draws the skylines, runs the loader and hero rain, and drives the pinned scroll timeline (see `seg(...)` calls to retime sections) |
| `data.js` | Content. Add a `sequence` block to a project for the pinned Ananta-style scroll sequence (see the B3spoken entry) |
| `assets/` | Project screenshots taken from the repos |
| `vendor/` | Lenis smooth scrolling (MIT licence) |
| `fonts/` | Bebas Neue and Barlow, self-hosted (SIL Open Font License, see the `OFL-*.txt` files) |

## Scroll timeline

On screens 981px and wider, the page is one sticky stage, and scroll position drives a timeline measured in screens. Each section is registered in `main.js` with `seg(name, length, layers)`. Change those numbers to make a section longer, shorter or faster. To debug, `window.__flow` in the console lists where each section starts.

## Accessibility

The site supports keyboard navigation with a skip link and visible focus rings. With `prefers-reduced-motion` turned on, the page drops the pinned timeline and smooth scrolling, the rain stops and the loader finishes at once. Body text is light grey on near-black and passes WCAG AA contrast.
