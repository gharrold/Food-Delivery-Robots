# Robot Backend Setup

## Install dependencies
npm install

## Run the server
npm start

## Environment variables
- Set in .env or use defaults:
  - ROBOT_COUNT
  - MOVE_METERS
  - MOVE_INTERVAL_MS
  - PORT

## Endpoints
- GET /robots
- POST /move { meters }
- POST /reset { count }
- POST /start-auto { meters, intervalMs }
- POST /stop-auto
