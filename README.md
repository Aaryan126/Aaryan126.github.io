# Aaryan Kandiah — Portfolio

A design-first portfolio covering interaction design, responsible AI, and product engineering. The main experience is an editorial case-study site; AaryanOS is an optional interactive desktop playground.

## Local development

```bash
npm install
npm run dev
```

The Vite server runs at `http://localhost:5173` by default.

## Quality checks

```bash
npm run lint
npm run test
npm run build
```

## Content model

Portfolio facts and project case studies are maintained in `src/data/portfolio.js`. Both the main site and AaryanOS consume the shared project records so outcomes, links, and descriptions stay consistent.

## Deployment

Pushes to `main` build and deploy `dist/` to the `gh-pages` branch through the GitHub Actions workflow in `.github/workflows/deploy.yml`.
