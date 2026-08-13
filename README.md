# Adarsh Babu K — Portfolio

Personal portfolio site for **Adarsh Babu K**, Java Backend Developer (Microservices · Spring Boot · Kafka).
Static, dependency-free, and ready to serve from GitHub Pages.

## Contents

```
.
├── index.html                 # the whole page (single file, semantic sections)
├── assets/
│   ├── css/styles.css         # design tokens, layout, dark/light themes
│   ├── js/main.js             # theme toggle, mobile nav, scroll reveal, active nav
│   └── resume/
│       └── Adarsh-Babu-K-Resume.pdf
├── Resume.pdf                 # original source résumé
├── .nojekyll                  # serve files as-is on GitHub Pages
└── README.md
```

## Sections

Hero · About · Technical skills · Experience (timeline) · Projects · Education & credentials · Contact

## Features

- **No build step, no dependencies** — plain HTML, CSS and JavaScript
- **Dark / light theme** with a toggle, `prefers-color-scheme` default, and `localStorage` persistence
- **Fully responsive**, with a mobile nav drawer down to 320px
- **Scroll-reveal animations** and active-section nav highlighting via `IntersectionObserver`
- **Accessible**: skip link, semantic landmarks, visible focus rings, ARIA on interactive controls
- **Respects `prefers-reduced-motion`** and has a print stylesheet
- Résumé download link and Open Graph metadata for link previews

## Run locally

Open `index.html` directly, or serve it:

```bash
python -m http.server 8000
```

Then visit http://localhost:8000

## Publish on GitHub Pages

1. Create a repository. For a URL like `https://<username>.github.io`, name it
   `<username>.github.io`. Any other name gives `https://<username>.github.io/<repo>/`.
2. Push this folder:

```bash
git init && git add . && git commit -m "Add portfolio site" && git branch -M main && git remote add origin https://github.com/<username>/<repo>.git && git push -u origin main
```

3. In the repo: **Settings → Pages → Build and deployment → Source: Deploy from a branch**,
   branch `main`, folder `/ (root)`. Save and wait ~1 minute.

## Things to update

- The GitHub link in `index.html` currently points to `https://github.com/adarshbabuk` — change it
  if your username differs (it appears in the hero links).
- Add live/repo links to the project cards in the Projects section once repos exist.
- Optionally set `og:url` and `og:image` in `<head>` after the site has a public URL.
