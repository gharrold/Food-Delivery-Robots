import React from 'react';
import {
  MOVE_METERS_RANGE,
  MOVE_INTERVAL_MS_RANGE,
  ROBOT_COUNT_RANGE,
} from '../config';

interface OptionsModalProps {
  moveMeters: number;
  setMoveMeters: (n: number) => void;
  moveIntervalMs: number;
  setMoveIntervalMs: (n: number) => void;
  robotCount: number;
  setRobotCount: (n: number) => void;
  onSave: () => void;
  onCancel: () => void;
}

const clamp = (val: number, min: number, max: number) => Math.max(min, Math.min(max, val));

const OptionsModal: React.FC<OptionsModalProps> = ({
  moveMeters,
  setMoveMeters,
  moveIntervalMs,
  setMoveIntervalMs,
  robotCount,
  setRobotCount,
  onSave,
  onCancel,
}) => (
  <div className="controls-modal-backdrop" onClick={onCancel}>
    <div className="controls-modal" onClick={e => e.stopPropagation()}>
      <h3>Robot Controls Settings</h3>
      <label htmlFor="move-meters-input">
        Move Meters:
        <div className="number-input-group">
          <button
            id="move-meters-decrement"
            type="button"
            aria-label="Decrease move meters"
            className="number-stepper"
            onClick={() => setMoveMeters(clamp(moveMeters - MOVE_METERS_RANGE.step, MOVE_METERS_RANGE.min, MOVE_METERS_RANGE.max))}
          >−</button>
          <input
            id="move-meters-input"
            type="number"
            min={MOVE_METERS_RANGE.min}
            max={MOVE_METERS_RANGE.max}
            step={MOVE_METERS_RANGE.step}
            value={moveMeters}
            onChange={e => setMoveMeters(clamp(Number(e.target.value), MOVE_METERS_RANGE.min, MOVE_METERS_RANGE.max))}
            className="number-input"
          />
          <button
            id="move-meters-increment"
            type="button"
            aria-label="Increase move meters"
            className="number-stepper"
            onClick={() => setMoveMeters(clamp(moveMeters + MOVE_METERS_RANGE.step, MOVE_METERS_RANGE.min, MOVE_METERS_RANGE.max))}
          >+</button>
        </div>
      </label>
      <label htmlFor="move-interval-input">
        Move Interval (ms):
        <div className="number-input-group">
          <button
            id="move-interval-decrement"
            type="button"
            aria-label="Decrease move interval"
            className="number-stepper"
            onClick={() => setMoveIntervalMs(clamp(moveIntervalMs - MOVE_INTERVAL_MS_RANGE.step, MOVE_INTERVAL_MS_RANGE.min, MOVE_INTERVAL_MS_RANGE.max))}
          >−</button>
          <input
            id="move-interval-input"
            type="number"
            min={MOVE_INTERVAL_MS_RANGE.min}
            max={MOVE_INTERVAL_MS_RANGE.max}
            step={MOVE_INTERVAL_MS_RANGE.step}
            value={moveIntervalMs}
            onChange={e => setMoveIntervalMs(clamp(Number(e.target.value), MOVE_INTERVAL_MS_RANGE.min, MOVE_INTERVAL_MS_RANGE.max))}
            className="number-input"
          />
          <button
            id="move-interval-increment"
            type="button"
            aria-label="Increase move interval"
            className="number-stepper"
            onClick={() => setMoveIntervalMs(clamp(moveIntervalMs + MOVE_INTERVAL_MS_RANGE.step, MOVE_INTERVAL_MS_RANGE.min, MOVE_INTERVAL_MS_RANGE.max))}
          >+</button>
        </div>
      </label>
      <label htmlFor="robot-count-input">
        Robot Count:
        <div className="number-input-group">
          <button
            id="robot-count-decrement"
            type="button"
            aria-label="Decrease robot count"
            className="number-stepper"
            onClick={() => setRobotCount(clamp(robotCount - ROBOT_COUNT_RANGE.step, ROBOT_COUNT_RANGE.min, ROBOT_COUNT_RANGE.max))}
          >−</button>
          <input
            id="robot-count-input"
            type="number"
            min={ROBOT_COUNT_RANGE.min}
            max={ROBOT_COUNT_RANGE.max}
            step={ROBOT_COUNT_RANGE.step}
            value={robotCount}
            onChange={e => setRobotCount(clamp(Number(e.target.value), ROBOT_COUNT_RANGE.min, ROBOT_COUNT_RANGE.max))}
            className="number-input"
          />
          <button
            id="robot-count-increment"
            type="button"
            aria-label="Increase robot count"
            className="number-stepper"
            onClick={() => setRobotCount(clamp(robotCount + ROBOT_COUNT_RANGE.step, ROBOT_COUNT_RANGE.min, ROBOT_COUNT_RANGE.max))}
          >+</button>
        </div>
      </label>
      <div className="options-modal-actions">
        <button id="options-save" className="primary" onClick={onSave}>Save</button>
        <button id="options-cancel" className="secondary" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  </div>
);

export default OptionsModal;
