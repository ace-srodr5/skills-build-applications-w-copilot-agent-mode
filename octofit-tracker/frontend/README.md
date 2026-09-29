# OctoFit Tracker Frontend

React 19 presentation tier for the OctoFit Tracker multi-tier application. The app uses Vite, Bootstrap, and `react-router-dom` to display backend resources for users, teams, activities, leaderboard entries, and workouts.

## Environment

Define `VITE_CODESPACE_NAME` in `.env.local` when running in GitHub Codespaces:

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

When `VITE_CODESPACE_NAME` is present, the frontend calls:

```text
https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/
```

When it is unset, the app safely falls back to `http://localhost:8000/api` to avoid `https://undefined-8000...` URLs.

## Scripts

```bash
npm run dev
npm run build
npm run lint
```
