
import React, { useState, useEffect } from 'react';
import './Controls.css';
import {
  DEFAULT_MOVE_METERS,
  DEFAULT_MOVE_INTERVAL_MS,
  DEFAULT_ROBOT_COUNT,
} from '../config';
import OptionsModal from './OptionsModal';

function post(endpoint: string, body: Record<string, unknown>) {
  return fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

const Controls: React.FC = () => {
  const [moveMeters, setMoveMeters] = useState<number>(DEFAULT_MOVE_METERS);
  const [moveIntervalMs, setMoveIntervalMs] = useState<number>(DEFAULT_MOVE_INTERVAL_MS);
  const [robotCount, setRobotCount] = useState<number>(DEFAULT_ROBOT_COUNT);
  const [modalOpen, setModalOpen] = useState(false);

  // Reset state and server on mount (page reload)
  useEffect(() => {
    setMoveMeters(DEFAULT_MOVE_METERS);
    setMoveIntervalMs(DEFAULT_MOVE_INTERVAL_MS);
    setRobotCount(DEFAULT_ROBOT_COUNT);
    // Reset server robots and stop auto
    post('/reset', { count: DEFAULT_ROBOT_COUNT });
    post('/stop-auto', {});
  }, []);


  const handleSave = () => {
    setModalOpen(false);
  };

  return (
    <>
        <div className="controls-container">
        <button onClick={() => post('/move', { meters: moveMeters })}>Move Robots</button>
        <button onClick={() => post('/reset', { count: robotCount })}>Reset Robots</button>
        <button onClick={() => post('/start-auto', { meters: moveMeters, intervalMs: moveIntervalMs })}>Start Auto</button>
        <button onClick={() => post('/stop-auto', {})}>Stop Auto</button>
        <span
          className="controls-options-icon"
          title="Options"
          onClick={() => setModalOpen(true)}
        >
          ⚙️
        </span>
        </div>
        {modalOpen && (
          <OptionsModal
            moveMeters={moveMeters}
            setMoveMeters={setMoveMeters}
            moveIntervalMs={moveIntervalMs}
            setMoveIntervalMs={setMoveIntervalMs}
            robotCount={robotCount}
            setRobotCount={setRobotCount}
            onSave={handleSave}
            onCancel={() => setModalOpen(false)}
          />
        )}
    </>
  );
};

export default Controls;
