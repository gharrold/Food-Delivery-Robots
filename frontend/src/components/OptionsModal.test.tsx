import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import OptionsModal from './OptionsModal';
import * as config from '../config';

describe('OptionsModal', () => {
  const setup = (props = {}) => {
    const defaults = {
      moveMeters: config.DEFAULT_MOVE_METERS,
      setMoveMeters: vi.fn(),
      moveIntervalMs: config.DEFAULT_MOVE_INTERVAL_MS,
      setMoveIntervalMs: vi.fn(),
      robotCount: config.DEFAULT_ROBOT_COUNT,
      setRobotCount: vi.fn(),
      onSave: vi.fn(),
      onCancel: vi.fn(),
    };
    return render(<OptionsModal {...defaults} {...props} />);
  };

  it('renders all inputs and buttons with correct ids', () => {
    setup();
    expect(screen.getByLabelText(/Move Meters/i, { selector: 'input' })).toBeInTheDocument();
    expect(screen.getByLabelText(/Move Interval/i, { selector: 'input' })).toBeInTheDocument();
    expect(screen.getByLabelText(/Robot Count/i, { selector: 'input' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Save/i })).toHaveAttribute('id', 'options-save');
    expect(screen.getByRole('button', { name: /Cancel/i })).toHaveAttribute('id', 'options-cancel');
  });

  it('calls set functions and clamps values', () => {
    const setMoveMeters = vi.fn();
    const setMoveIntervalMs = vi.fn();
    const setRobotCount = vi.fn();
    setup({ setMoveMeters, setMoveIntervalMs, setRobotCount });
    fireEvent.click(screen.getByText('+', { selector: '#move-meters-increment' }));
    expect(setMoveMeters).toHaveBeenCalled();
    fireEvent.click(screen.getByText('+', { selector: '#move-interval-increment' }));
    expect(setMoveIntervalMs).toHaveBeenCalled();
    fireEvent.click(screen.getByText('+', { selector: '#robot-count-increment' }));
    expect(setRobotCount).toHaveBeenCalled();
  });

  it('clamps values at min and max', () => {
    const setMoveMeters = vi.fn();
    const setMoveIntervalMs = vi.fn();
    const setRobotCount = vi.fn();
    setup({
      moveMeters: config.MOVE_METERS_RANGE.min,
      setMoveMeters,
      moveIntervalMs: config.MOVE_INTERVAL_MS_RANGE.max,
      setMoveIntervalMs,
      robotCount: config.ROBOT_COUNT_RANGE.max,
      setRobotCount,
    });
    // Try to decrement below min
    fireEvent.click(screen.getByText('−', { selector: '#move-meters-decrement' }));
    expect(setMoveMeters).toHaveBeenCalledWith(config.MOVE_METERS_RANGE.min);
    // Try to increment above max
    fireEvent.click(screen.getByText('+', { selector: '#move-interval-increment' }));
    expect(setMoveIntervalMs).toHaveBeenCalledWith(config.MOVE_INTERVAL_MS_RANGE.max);
    fireEvent.click(screen.getByText('+', { selector: '#robot-count-increment' }));
    expect(setRobotCount).toHaveBeenCalledWith(config.ROBOT_COUNT_RANGE.max);
  });

  it('calls onSave and onCancel handlers', () => {
    const onSave = vi.fn();
    const onCancel = vi.fn();
    setup({ onSave, onCancel });
    fireEvent.click(screen.getByRole('button', { name: /Save/i }));
    expect(onSave).toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: /Cancel/i }));
    expect(onCancel).toHaveBeenCalled();
  });
});
