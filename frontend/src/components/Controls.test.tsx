import { vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Controls from './Controls';
import * as config from '../config';

describe('Controls', () => {
    beforeAll(() => {
      global.fetch = vi.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve({}) })) as any;
    });
    afterAll(() => {
      (global.fetch as any).mockRestore && (global.fetch as any).mockRestore();
    });
  it('renders all control buttons', () => {
    render(<Controls />);
    expect(screen.getByText(/Move Robots/i)).toBeInTheDocument();
    expect(screen.getByText(/Reset Robots/i)).toBeInTheDocument();
    expect(screen.getByText(/Start Auto/i)).toBeInTheDocument();
    expect(screen.getByText(/Stop Auto/i)).toBeInTheDocument();
  });

  it('opens and closes the options modal', () => {
    render(<Controls />);
    fireEvent.click(screen.getAllByTitle('Options')[0]);
    expect(screen.getByText(/Robot Controls Settings/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Cancel/i));
    expect(screen.queryByText(/Robot Controls Settings/i)).not.toBeInTheDocument();
  });

  it('updates values in the modal and saves', () => {
    render(<Controls />);
    fireEvent.click(screen.getAllByTitle('Options')[0]);
    const metersInput = screen.getByLabelText(/Move Meters/i, { selector: 'input' });
    fireEvent.change(metersInput, { target: { value: 5 } });
    fireEvent.click(screen.getByText(/Save/i));
    fireEvent.click(screen.getAllByTitle('Options')[0]);
    expect(screen.getByLabelText(/Move Meters/i, { selector: 'input' })).toHaveValue(5);
  });

  it('resets state to defaults on reload', () => {
    const { unmount } = render(<Controls />);
    fireEvent.click(screen.getAllByTitle('Options')[0]);
    const metersInput = screen.getByLabelText(/Move Meters/i, { selector: 'input' });
    fireEvent.change(metersInput, { target: { value: 7 } });
    fireEvent.click(screen.getByText(/Save/i));
    // Unmount, clear storage, and re-mount to simulate reload
    unmount();
    localStorage.clear();
    const { unmount: unmount2 } = render(<Controls />);
    fireEvent.click(screen.getAllByTitle('Options')[0]);
    expect(screen.getByLabelText(/Move Meters/i, { selector: 'input' })).toHaveValue(config.DEFAULT_MOVE_METERS);
    unmount2();
  });

  it('calls correct fetch endpoints for each button', () => {
    const fetchSpy = vi.spyOn(global, 'fetch');
    render(<Controls />);
    fireEvent.click(screen.getByText(/Move Robots/i));
    expect(fetchSpy).toHaveBeenCalledWith('/move', expect.any(Object));
    fireEvent.click(screen.getByText(/Reset Robots/i));
    expect(fetchSpy).toHaveBeenCalledWith('/reset', expect.any(Object));
    fireEvent.click(screen.getByText(/Start Auto/i));
    expect(fetchSpy).toHaveBeenCalledWith('/start-auto', expect.any(Object));
    fireEvent.click(screen.getByText(/Stop Auto/i));
    expect(fetchSpy).toHaveBeenCalledWith('/stop-auto', expect.any(Object));
    fetchSpy.mockRestore();
  });

  it('updates main UI state after modal change', () => {
    render(<Controls />);
    fireEvent.click(screen.getAllByTitle('Options')[0]);
    const metersInput = screen.getByLabelText(/Move Meters/i, { selector: 'input' });
    fireEvent.change(metersInput, { target: { value: 42 } });
    fireEvent.click(screen.getByText(/Save/i));
    // Open modal again and check value
    fireEvent.click(screen.getAllByTitle('Options')[0]);
    expect(screen.getByLabelText(/Move Meters/i, { selector: 'input' })).toHaveValue(42);
  });
});
