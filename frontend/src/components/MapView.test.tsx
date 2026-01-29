import { vi } from 'vitest';
import { render } from '@testing-library/react';
import MapView from './MapView';

describe('MapView', () => {
    beforeAll(() => {
      global.fetch = vi.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve({}) })) as any;
    });
    afterAll(() => {
      (global.fetch as any).mockRestore && (global.fetch as any).mockRestore();
    });
  it('renders without crashing', () => {
    render(<MapView />);
  });
});
