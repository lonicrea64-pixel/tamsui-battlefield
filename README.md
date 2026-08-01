# Tamsui Battle Interactive Map

A digital humanities prototype for the 1884 Tamsui battle. The frontend provides an interactive map, historical context, character perspectives, and guide planning. The backend provides site, timeline, and learning-check APIs.

## Stack

- Frontend: Next.js App Router, React, Tailwind CSS, react-leaflet
- Backend: Node.js, Express, TypeScript
- Workspace: npm workspaces

## Local Development

```bash
npm install
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:8080
- Health check: http://localhost:8080/api/v1/health

## Build And Test

```bash
npm run build
npm run test
```

## Docker

```bash
docker compose up --build
```

## Main Directories

- `frontend/app`: Next.js App Router entry
- `frontend/components`: Map, panels, and content sections
- `frontend/contexts`: Map UI state
- `frontend/data`: Frontend map point data
- `backend/src`: Express API and mock data
- `docs`: API and MVP specification files
