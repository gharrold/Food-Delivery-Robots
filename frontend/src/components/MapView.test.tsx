import { vi } from 'vitest';
import { render } from '@testing-library/react';
import MapView from './MapView';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

describe('MapView', () => {
    beforeAll(() => {
      global.fetch = vi.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve({}) })) as any;
    });
    afterAll(() => {
      (global.fetch as any).mockRestore && (global.fetch as any).mockRestore();
    });
  it('renders without crashing', () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <MapView autoRunning={false} moveIntervalMs={1000} robots={[]} setRobots={() => {}} />
      </QueryClientProvider>
    );
  });
});
