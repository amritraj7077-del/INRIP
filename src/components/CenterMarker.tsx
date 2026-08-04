import { useEffect, useRef } from 'react';
import * as maplibregl from 'maplibre-gl';
import './CenterMarker.css';

interface CenterMarkerProps {
  map: maplibregl.Map | null;
}

export const CenterMarker = ({ map }: CenterMarkerProps) => {
  const markerRef = useRef<maplibregl.Marker | null>(null);

  useEffect(() => {
    if (!map) return;

    // Create custom marker element
    const markerElement = document.createElement('div');
    markerElement.className = 'center-marker';
    
    // Add inner SVG
    markerElement.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="3" class="marker-core" />
        <circle cx="12" cy="12" r="8" class="marker-ring" />
        <circle cx="12" cy="12" r="12" class="marker-outer" />
      </svg>
    `;

    const marker = new maplibregl.Marker({
      element: markerElement,
      anchor: 'center'
    }).setLngLat(map.getCenter()).addTo(map);

    markerRef.current = marker;

    // Update marker position when map moves
    const updateMarker = () => {
      if (markerRef.current) {
        markerRef.current.setLngLat(map.getCenter());
      }
    };

    map.on('move', updateMarker);
    map.on('moveend', updateMarker);

    return () => {
      map.off('move', updateMarker);
      map.off('moveend', updateMarker);
      if (markerRef.current) {
        markerRef.current.remove();
        markerRef.current = null;
      }
    };
  }, [map]);

  return null;
};
