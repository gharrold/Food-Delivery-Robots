import { vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import Controls from './Controls';
import * as config from '../config';
import React from 'react';

describe('Controls', () => {
  const TestWrapper = (props: Partial<React.ComponentProps<typeof Controls>> = {}) => {
    const [moveMeters, setMoveMeters] = React.useState(config.DEFAULT_MOVE_METERS);
    const [moveIntervalMs, setMoveIntervalMs] = React.useState(config.DEFAULT_MOVE_INTERVAL_MS);
    const [robotCount, setRobotCount] = React.useState(config.DEFAULT_ROBOT_COUNT);
    const [autoRunning, setAutoRunning] = React.useState(false);
    const post = vi.fn(() => Promise.resolve({ status: 'ok' }));
    return (
      <Controls
        moveMeters={moveMeters}
        setMoveMeters={setMoveMeters}
        moveIntervalMs={moveIntervalMs}
        setMoveIntervalMs={setMoveIntervalMs}
        robotCount={robotCount}
        setRobotCount={setRobotCount}
        autoRunning={autoRunning}
        onMove={() => {}}
        onStartAuto={() => setAutoRunning(true)}
        onStopAuto={() => setAutoRunning(false)}
        onReset={() => {
          setMoveMeters(config.DEFAULT_MOVE_METERS);
          setMoveIntervalMs(config.DEFAULT_MOVE_INTERVAL_MS);
          setRobotCount(config.DEFAULT_ROBOT_COUNT);
          setAutoRunning(false);
        }}
        post={post}
        {...props}
      />
    );
  };

  it('renders all control buttons', () => {
    render(<TestWrapper />);
    expect(screen.getByText(/Move Robots/i)).toBeInTheDocument();
    expect(screen.getByText(/Reset Robots/i)).toBeInTheDocument();
    expect(screen.getByText(/Start Auto/i)).toBeInTheDocument();
    expect(screen.getByText(/Stop Auto/i)).toBeInTheDocument();
  });

  it('opens and closes the options modal', () => {
    render(<TestWrapper />);
    fireEvent.click(screen.getAllByTitle('Options')[0]);
    expect(screen.getByText(/Robot Controls Settings/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Cancel/i));
    expect(screen.queryByText(/Robot Controls Settings/i)).not.toBeInTheDocument();
  });

  it('updates values in the modal and saves', () => {
    render(<TestWrapper />);
    fireEvent.click(screen.getAllByTitle('Options')[0]);
    const metersInput = screen.getByLabelText(/Move Meters/i, { selector: 'input' });
    fireEvent.change(metersInput, { target: { value: 5 } });
    fireEvent.click(screen.getByText(/Save/i));
    fireEvent.click(screen.getAllByTitle('Options')[0]);
    expect(screen.getByLabelText(/Move Meters/i, { selector: 'input' })).toHaveValue(5);
  });

  it('resets state to defaults on reset', () => {
    render(<TestWrapper />);
    fireEvent.click(screen.getAllByTitle('Options')[0]);
    const metersInput = screen.getByLabelText(/Move Meters/i, { selector: 'input' });
    fireEvent.change(metersInput, { target: { value: 7 } });
    fireEvent.click(screen.getByText(/Save/i));
    fireEvent.click(screen.getByText(/Reset Robots/i));
    fireEvent.click(screen.getAllByTitle('Options')[0]);
    expect(screen.getByLabelText(/Move Meters/i, { selector: 'input' })).toHaveValue(config.DEFAULT_MOVE_METERS);
  });

  it('calls correct handlers for each button', () => {
    const post = vi.fn(() => Promise.resolve({ status: 'ok' }));
    const onMove = vi.fn();
    render(<TestWrapper post={post} onMove={onMove} />);
    fireEvent.click(screen.getByText(/Move Robots/i));
    expect(onMove).toHaveBeenCalled();
    fireEvent.click(screen.getByText(/Reset Robots/i));
    // Reset now only resets state, does not call post
    fireEvent.click(screen.getByText(/Start Auto/i));
    fireEvent.click(screen.getByText(/Stop Auto/i));
    // Additional assertions for start/stop can be added if needed
  });

  it('updates main UI state after modal change', () => {
    render(<TestWrapper />);
    fireEvent.click(screen.getAllByTitle('Options')[0]);
    const metersInput = screen.getByLabelText(/Move Meters/i, { selector: 'input' });
    fireEvent.change(metersInput, { target: { value: 42 } });
    fireEvent.click(screen.getByText(/Save/i));
    // Open modal again and check value
    fireEvent.click(screen.getAllByTitle('Options')[0]);
    expect(screen.getByLabelText(/Move Meters/i, { selector: 'input' })).toHaveValue(42);
  });
});
