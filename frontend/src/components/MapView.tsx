import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polygon } from 'react-leaflet';
import AnimatedMarker from './AnimatedMarker';
import L, { LatLngExpression, Icon } from 'leaflet';
import '../App.css';

const polygon: LatLngExpression[] = [
  [34.055, -118.275],
  [34.055, -118.225],
  [34.020, -118.225],
  [34.020, -118.275],
];

const robotIcon: Icon = new L.Icon({
  iconUrl: '/robot.svg',
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

interface RobotsResponse {
  robots: LatLngExpression[];
}

const MapView: React.FC = () => {
  const [robots, setRobots] = useState<LatLngExpression[]>([]);

  useEffect(() => {
    fetch('/robots')
      .then(res => res.json())
      .then((data: RobotsResponse) => setRobots(data.robots));
    const interval = setInterval(() => {
      fetch('/robots')
        .then(res => res.json())
        .then((data: RobotsResponse) => setRobots(data.robots));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <MapContainer center={[34.0375, -118.25]} zoom={13} className="map-container">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Polygon positions={polygon} pathOptions={{ color: 'blue' }} />
      {robots.map((pos, idx) => (
        <AnimatedMarker key={idx} position={pos} icon={robotIcon} />
      ))}
    </MapContainer>
  );
};

export default MapView;
