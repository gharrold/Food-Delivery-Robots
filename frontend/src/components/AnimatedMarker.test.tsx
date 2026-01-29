import { render } from '@testing-library/react';
import { vi } from 'vitest';
import AnimatedMarker from './AnimatedMarker';
import L from 'leaflet';
import { MapContainer } from 'react-leaflet';

describe('AnimatedMarker', () => {
  it('renders without crashing', () => {
    const icon = new L.Icon({ iconUrl: '/robot.svg', iconSize: [32, 32], iconAnchor: [16, 16] });
      render(
        <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '400px', width: '400px' }}>
          <AnimatedMarker
            position={[34, -118]}
            icon={icon}
          />
        </MapContainer>
      );
  });

  it('animates to new position when prop changes', () => {
    const icon = new L.Icon({ iconUrl: '/robot.svg', iconSize: [32, 32], iconAnchor: [16, 16] });
    const { rerender } = render(
      <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '400px', width: '400px' }}>
        <AnimatedMarker position={[34, -118]} icon={icon} />
      </MapContainer>
    );
    rerender(
      <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '400px', width: '400px' }}>
        <AnimatedMarker position={[35, -119]} icon={icon} />
      </MapContainer>
    );
    // No assertion: this test ensures no crash and triggers animation logic
  });

  it('cleans up animation frame on unmount after animation starts', () => {
    const icon = new L.Icon({ iconUrl: '/robot.svg', iconSize: [32, 32], iconAnchor: [16, 16] });
    const cancelSpy = vi.spyOn(window, 'cancelAnimationFrame');
    const { rerender, unmount } = render(
      <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '400px', width: '400px' }}>
        <AnimatedMarker position={[34, -118]} icon={icon} />
      </MapContainer>
    );
    // Trigger animation by changing position
    rerender(
      <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '400px', width: '400px' }}>
        <AnimatedMarker position={[35, -119]} icon={icon} />
      </MapContainer>
    );
    unmount();
    expect(cancelSpy).toHaveBeenCalled();
    cancelSpy.mockRestore();
  });
});
