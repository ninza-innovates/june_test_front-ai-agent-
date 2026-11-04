# June: Smart AI Rental Agent

Create React App frontend (`frontend` 0.1.0) styled with Tailwind CSS. The page sends a text query to a backend with axios and displays the JSON result. `src/socket.js` holds a Socket.IO client helper.

## What it does

`src/App.jsx` is a single page. The form posts JSON `{ "query": "<text>" }` to `http://localhost:5000/query`. A successful response renders `data.output` as formatted JSON. A failed response shows `error` from the body, or the text `An error occurred`. The source comment calls that API a Flask backend. This repository is only the frontend.

`src/socket.js` is not imported by `src/App.jsx` or `src/index.js`, so the page does not open a socket. `socket.io-client` is imported there but is not listed in `package.json`.

## Prerequisites

- Node.js and npm
- A backend that accepts `POST /query` (the page calls `http://localhost:5000/query`)

## Install

```bash
npm install
```

## Scripts

Commands from `package.json`:

- `npm start` — `react-scripts start` (development server; Create React App serves it at http://localhost:3000)
- `npm run build` — `react-scripts build` (production bundle in `build/`)
- `npm test` — `react-scripts test`
- `npm run eject` — `react-scripts eject`

## Configuration

| Value | Where | Notes |
| --- | --- | --- |
| `http://localhost:5000/query` | `src/App.jsx` | Hardcoded axios URL. Not read from the environment. |
| `REACT_APP_SOCKET_URL` | `src/socket.js` | Socket.IO server URL. Defaults to `http://localhost:5000` when unset. |

Create React App loads `REACT_APP_*` from a root `.env` file (gitignored). Restart `npm start` after changing it.

The socket client is created with `autoConnect: false` and `withCredentials: true`. `setSocketAuthToken` sets `auth.token` only when the value matches a three-segment JWT-style string.

Tailwind is set up in `tailwind.config.js` (content: `./src/**/*.{js,jsx,ts,tsx}`) and `src/index.css` (`@tailwind` base, components, and utilities).
