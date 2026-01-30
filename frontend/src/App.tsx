
import React, { useState, useRef, useEffect } from 'react';
import MapView from './components/MapView';
import Controls from './components/Controls';
import {
  DEFAULT_MOVE_METERS,
  DEFAULT_MOVE_INTERVAL_MS,
  DEFAULT_ROBOT_COUNT
} from './config';
import './App.css';

async function post(endpoint: string, body: Record<string, unknown>, expectStatus?: string) {
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (expectStatus && data.status !== expectStatus) {
    throw new Error(`Expected status '${expectStatus}', got '${data.status}'`);
  }
  return data;
}


const App: React.FC = () => {
  const [moveMeters, setMoveMeters] = useState<number>(DEFAULT_MOVE_METERS);
  const [moveIntervalMs, setMoveIntervalMs] = useState<number>(DEFAULT_MOVE_INTERVAL_MS);
  const [robotCount, setRobotCount] = useState<number>(DEFAULT_ROBOT_COUNT);
  const [autoRunning, setAutoRunning] = useState(false);
  const [robots, setRobots] = useState<any[]>([]);
  const pollingRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch robots helper
  const fetchRobots = async () => {
    const res = await fetch('/robots');
    const data = await res.json();
    setRobots(Array.isArray(data.robots) ? data.robots : []);
  };

  useEffect(() => {
    fetchRobots();
  }, []);

  // Move robots and update from response
  const handleMove = async () => {
    const res = await post('/move', { meters: moveMeters });
    if (res && Array.isArray(res.robots)) {
      setRobots(res.robots);
    }
  };

  // Start auto: validate response, start polling, fetch robots
  const handleStartAuto = async () => {
    const data = await post('/start-auto', { meters: moveMeters, intervalMs: moveIntervalMs }, 'started');
    if (data && data.status === 'started') {
      setAutoRunning(true);
      await fetchRobots();
    }
  };

  // Stop auto: validate response, stop polling, fetch
  const handleStopAuto = async () => {
    const data = await post('/stop-auto', {}, 'stopped');
    if (data && data.status === 'stopped') {
      setAutoRunning(false);
      await fetchRobots();
    }
  };

  // Reset robots and state, update from response
  const handleReset = async () => {
    setMoveMeters(DEFAULT_MOVE_METERS);
    setMoveIntervalMs(DEFAULT_MOVE_INTERVAL_MS);
    setRobotCount(DEFAULT_ROBOT_COUNT);
    setAutoRunning(false);
    const res = await post('/reset', { count: DEFAULT_ROBOT_COUNT });
    if (res && Array.isArray(res.robots)) {
      setRobots(res.robots);
    }
    await post('/stop-auto', {}, 'stopped');
  };

  return (
    <div className="app-root">
      <Controls
        moveMeters={moveMeters}
        setMoveMeters={setMoveMeters}
        moveIntervalMs={moveIntervalMs}
        setMoveIntervalMs={setMoveIntervalMs}
        robotCount={robotCount}
        setRobotCount={setRobotCount}
        autoRunning={autoRunning}
        onMove={handleMove}
        onStartAuto={handleStartAuto}
        onStopAuto={handleStopAuto}
        onReset={handleReset}
        post={post}
      />
      <MapView
        autoRunning={autoRunning}
        moveIntervalMs={moveIntervalMs}
        robots={robots}
        setRobots={setRobots}
      />
    </div>
  );
};

export default App;
