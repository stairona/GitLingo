# GitLingo

A Duolingo-style web app that teaches Git and GitHub to total beginners, one small lesson at a time.
Built in 24 hours for the hackathon (Midnight Mode, so it's dark by default).

Live site: coming soon (Vercel)

## How to run it on your laptop

You need [Node.js](https://nodejs.org) installed (it comes with npm).

```bash
npm install     # download the packages listed in package.json (only needed once)
npm run dev     # start the app, then open http://localhost:5173
```

Other commands:
- `npm run build` makes the final version of the site in `dist/` (Vercel runs this for us)
- `npm run lint` checks the code for common mistakes

## Where things are

See [docs/repo-organization.md](docs/repo-organization.md) for the folder map, and
[docs/lessons/README.md](docs/lessons/README.md) for how the lessons work.
