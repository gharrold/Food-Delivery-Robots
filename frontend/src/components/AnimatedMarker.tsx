import { Marker, useMap } from 'react-leaflet';
import { useEffect, useRef, useState } from 'react';
import { LatLngExpression, Icon } from 'leaflet';

// Linear interpolation between two lat/lng points
function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function interpolateLatLng(from: LatLngExpression, to: LatLngExpression, t: number): LatLngExpression {
  const [fromLat, fromLng] = from as [number, number];
  const [toLat, toLng] = to as [number, number];
  return [lerp(fromLat, toLat, t), lerp(fromLng, toLng, t)];
}

interface AnimatedMarkerProps {
  position: LatLngExpression;
  icon: Icon;
  [key: string]: any;
}

const AnimatedMarker: React.FC<AnimatedMarkerProps> = ({ position, icon, ...props }) => {
  useMap();
  const [currentPos, setCurrentPos] = useState<LatLngExpression>(position);
  const prevPos = useRef<LatLngExpression>(position);
  const animFrame = useRef<number | null>(null);

  useEffect(() => {
    let start: number | undefined;
    const duration = 500; // ms
    const from = prevPos.current;
    const to = position;
    if ((from as [number, number])[0] === (to as [number, number])[0] && (from as [number, number])[1] === (to as [number, number])[1]) return;
    function animate(ts: number) {
      if (start === undefined) start = ts;
      const t = Math.min((ts - start) / duration, 1);
      setCurrentPos(interpolateLatLng(from, to, t));
      if (t < 1) {
        animFrame.current = requestAnimationFrame(animate);
      } else {
        prevPos.current = to;
      }
    }
    animFrame.current = requestAnimationFrame(animate);
    return () => {
      if (animFrame.current !== null) cancelAnimationFrame(animFrame.current);
    };
  }, [position]);

  return <Marker position={currentPos} icon={icon} {...props} />;
};

export default AnimatedMarker;
