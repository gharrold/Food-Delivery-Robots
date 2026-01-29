import * as config from './config';

describe('config', () => {
  it('has valid default values and ranges', () => {
    expect(config.DEFAULT_MOVE_METERS).toBeGreaterThanOrEqual(config.MOVE_METERS_RANGE.min);
    expect(config.DEFAULT_MOVE_METERS).toBeLessThanOrEqual(config.MOVE_METERS_RANGE.max);
    expect(config.DEFAULT_MOVE_INTERVAL_MS).toBeGreaterThanOrEqual(config.MOVE_INTERVAL_MS_RANGE.min);
    expect(config.DEFAULT_MOVE_INTERVAL_MS).toBeLessThanOrEqual(config.MOVE_INTERVAL_MS_RANGE.max);
    expect(config.DEFAULT_ROBOT_COUNT).toBeGreaterThanOrEqual(config.ROBOT_COUNT_RANGE.min);
    expect(config.DEFAULT_ROBOT_COUNT).toBeLessThanOrEqual(config.ROBOT_COUNT_RANGE.max);
  });

  it('step values are positive', () => {
    expect(config.MOVE_METERS_RANGE.step).toBeGreaterThan(0);
    expect(config.MOVE_INTERVAL_MS_RANGE.step).toBeGreaterThan(0);
    expect(config.ROBOT_COUNT_RANGE.step).toBeGreaterThan(0);
  });
});
