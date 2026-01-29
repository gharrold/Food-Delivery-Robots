// Default values from backend .env
export const DEFAULT_MOVE_METERS = 1;
export const DEFAULT_MOVE_INTERVAL_MS = 60000;
export const DEFAULT_ROBOT_COUNT = 20;

export const MOVE_METERS_RANGE = { min: 1, max: 100, step: 1 };
export const MOVE_INTERVAL_MS_RANGE = { min: 100, max: 600000, step: 1000 };
export const ROBOT_COUNT_RANGE = { min: 1, max: 200, step: 1 };
