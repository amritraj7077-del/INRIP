import { useEffect, useRef } from 'react';
import * as maplibregl from 'maplibre-gl';
import { Mineral } from '../../types/minerals';
import { createCustomMarkerElement } from './CustomMarkers';

interface ClusteredMarkersProps {
  map: maplibregl.Map | null;
  minerals: Mineral[];
  onMarkerClick: (mineral: Mineral) => void;
  selectedMineId?: number | null;
}

export const ClusteredMarkers = ({ map, minerals, onMarkerClick, selectedMineId }: ClusteredMarkersProps) => {
  const markersRef = useRef<Map<number, maplibregl.Marker>>(new Map());

  useEffect(() => {
    if (!map || minerals.length === 0) return;

    const currentMarkers = markersRef.current;
    const existingIds = new Set(currentMarkers.keys());
    const newIds = new Set(minerals.map(m => m.id));

    // Remove markers that are no longer in the data
    existingIds.forEach(id => {
      if (!newIds.has(id)) {
        const marker = currentMarkers.get(id);
        if (marker) {
          marker.remove();
          currentMarkers.delete(id);
        }
      }
    });

    // Add or update markers
    minerals.forEach((mineral) => {
      const existingMarker = currentMarkers.get(mineral.id);
      const isSelected = mineral.id === selectedMineId;

      if (existingMarker) {
        // Update if selected state changed
        const markerElement = existingMarker.getElement();
        if (markerElement) {
          const scale = isSelected ? 1.3 : 1;
          markerElement.style.transform = `scale(${scale})`;
          markerElement.style.transition = 'transform 0.2s ease';
        }
      } else {
        // Create new marker
        const markerElement = createCustomMarkerElement(mineral, isSelected);
        
        const marker = new maplibregl.Marker({
          element: markerElement,
          anchor: 'center',
        })
          .setLngLat([mineral.longitude, mineral.latitude])
          .addTo(map);

        // Add click handler
        markerElement.addEventListener('click', () => {
          onMarkerClick(mineral);
        });

        currentMarkers.set(mineral.id, marker);
      }
    });

    return () => {
      currentMarkers.forEach(marker => marker.remove());
      currentMarkers.clear();
    };
  }, [map, minerals, selectedMineId, onMarkerClick]);

  return null;
};
