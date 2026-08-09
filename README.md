# Resume Site

A single-page resume/portfolio site with a Three.js animated background, built with Vite.

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deploy to GitHub Pages

1. Push this repo to GitHub (e.g. `github.com/<username>/resume-site`).
2. In the repo settings, go to **Pages** and set the source to **GitHub Actions**.
3. If the repo name isn't `resume-site`, update `REPO_NAME` in [`vite.config.js`](vite.config.js) to match — this sets the `base` path so assets resolve correctly at `https://<username>.github.io/<repo>/`.
   - If deploying as a user/org page (`<username>.github.io`), set `base: '/'` instead.
4. Push to `main` — the [`deploy.yml`](.github/workflows/deploy.yml) workflow builds and publishes automatically.

## Edit content

All resume content lives in [`src/data.js`](src/data.js).
