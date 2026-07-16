# Dylan Dreis — Personal Portfolio

A single-page, static portfolio site — plain HTML, CSS, and vanilla JavaScript. No build step, no dependencies.

## Run it locally

Just open `index.html` in a browser. That's it — no server or build step required.

(Optional: if the GitHub feed doesn't load due to your browser's local-file restrictions, serve the folder with any static server, e.g. `python3 -m http.server`, then visit `http://localhost:8000`.)

## File structure

```
personal portfolio/
├── index.html      Page structure and content sections
├── styles.css      All styling (palette, layout, responsive rules)
├── main.js         Content data arrays + interactivity (nav, GitHub feed)
├── assets/         Résumé PDF and any images go here
└── README.md       This file
```

## What to edit to add your real information

| What to change | File | Where |
|---|---|---|
| Work experience | `main.js` | `EXPERIENCE` array near the top — one object per role |
| Featured AI projects | `main.js` | `PROJECTS` array — replace the 3 `TODO` placeholder cards with your real projects |
| GitHub username for the live feed | `main.js` | `GITHUB_USERNAME` constant (already set to `ddreis2003-glitch`) |
| Résumé PDF | `assets/resume.pdf` | Add your actual PDF file here — the "Download résumé" button already links to it |
| Name, headline, About text, education, skills, contact links | `index.html` | Hero, About, and Footer sections — edit the text directly |

Each `PROJECTS` entry has a `placeholder: true` flag that renders a "Placeholder — TODO" badge on the card. Remove that flag (or delete it) once you swap in a real project.

## Deploying to GitHub Pages

1. Initialize git and commit (if not already done):
   ```
   git init
   git add .
   git commit -m "Initial portfolio site"
   ```
2. Create a repo on GitHub. For a personal user site, name it exactly:
   ```
   ddreis2003-glitch.github.io
   ```
   (Any other name works too, but the site will then live at `https://ddreis2003-glitch.github.io/repo-name` instead of the root domain.)
3. Push:
   ```
   git branch -M main
   git remote add origin https://github.com/ddreis2003-glitch/ddreis2003-glitch.github.io.git
   git push -u origin main
   ```
4. On GitHub: go to the repo's **Settings → Pages**, set **Source** to the `main` branch and `/ (root)` folder, then save.
5. Your site will be live at `https://ddreis2003-glitch.github.io` within a minute or two.

## Notes

- The "Latest from GitHub" section fetches public repo data client-side from the GitHub REST API with no auth token, so it's subject to GitHub's unauthenticated rate limit (60 requests/hour per IP). If the feed shows an error message, that's the graceful fallback working as intended — just wait for the rate limit to reset.
- All paths are relative, so the site works unmodified whether it's the root of a user site or a subfolder project site on GitHub Pages.
