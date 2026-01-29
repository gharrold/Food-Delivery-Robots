# Simple Robot Visualization App

## Overview
A full-stack template for real-time robot movement visualization in Downtown Los Angeles. Includes a Node.js/Express backend and a React/Vite/Leaflet frontend.

---

## Backend (Node.js/Express)
- Holds in-memory robot positions inside a DTLA polygon
- Endpoints:
  - `GET /robots` — Get all robot positions
  - `POST /move` — Move all robots by meters
  - `POST /reset` — Reset robots
  - `POST /start-auto` — Start auto-move
  - `POST /stop-auto` — Stop auto-move
- Environment variables in `backend/.env`

### Setup & Run
```sh
cd backend
npm install
npm start
```

---

## Frontend (React/Vite/Leaflet)
- Map of Downtown LA
- Robot markers update in real time
- Controls for move/reset/start/stop

### Setup & Run
```sh
cd frontend
npm install
npm run dev
```

---

## Folder Structure
- `/backend` — Node.js/Express server
- `/frontend` — React/Vite app

---

## Notes
- Ensure backend is running on port 4000 (default)
- Frontend proxies API requests to backend
- All code is organized for SOLID, single-responsibility principles
