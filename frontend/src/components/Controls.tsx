
import React, { useState } from 'react';
import './Controls.css';
import OptionsModal from './OptionsModal';

interface ControlsProps {
  moveMeters: number;
  setMoveMeters: (n: number) => void;
  moveIntervalMs: number;
  setMoveIntervalMs: (n: number) => void;
  robotCount: number;
  setRobotCount: (n: number) => void;
  autoRunning: boolean;
  onMove: () => void;
  onStartAuto: () => void;
  onStopAuto: () => void;
  onReset: () => void;
  post: (endpoint: string, body: Record<string, unknown>) => Promise<any>;
}

const Controls: React.FC<ControlsProps> = ({
  moveMeters,
  setMoveMeters,
  moveIntervalMs,
  setMoveIntervalMs,
  robotCount,
  setRobotCount,
  autoRunning,
  onMove,
  onStartAuto,
  onStopAuto,
  onReset,
  post,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleSave = () => setModalOpen(false);

  return (
    <>
      <div className="controls-container">
        <button onClick={onMove}>Move Robots</button>
        <button onClick={onReset}>Reset Robots</button>
        <button onClick={onStartAuto} disabled={autoRunning}>Start Auto</button>
        <button onClick={onStopAuto} disabled={!autoRunning}>Stop Auto</button>
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
