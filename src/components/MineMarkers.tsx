import { useEffect, useRef, memo } from 'react';
import * as maplibregl from 'maplibre-gl';
import { Mineral } from '../types/minerals';

interface MineMarkersProps {
  map: maplibregl.Map | null;
  minerals: Mineral[];
  selectedMineId?: number | null;
  onMineSelect?: (mine: Mineral) => void;
}

export const MineMarkers = memo(({ 
  map, 
  minerals, 
  selectedMineId,
  onMineSelect 
}: MineMarkersProps) => {
  const markersRef = useRef<Map<number, maplibregl.Marker>>(new Map());

  console.log('=== MineMarkers RENDER DEBUG ===');
  console.log('Map instance:', !!map);
  console.log('Map instance ref:', map);
  console.log('Minerals count:', minerals.length);
  console.log('Minerals array:', minerals);
  console.log('Selected mine ID:', selectedMineId);

  useEffect(() => {
    console.log('=== MineMarkers EFFECT DEBUG ===');
    console.log('Map available:', !!map);
    console.log('Map ref:', map);
    console.log('Minerals available:', minerals.length);
    console.log('Minerals array length:', minerals.length);
    
    if (!map) {
      console.warn('❌ Map instance is null, skipping marker rendering');
      return;
    }

    if (minerals.length === 0) {
      console.warn('❌ No minerals to render - minerals array is empty');
      return;
    }

    console.log(`✅ Starting marker creation for ${minerals.length} minerals`);

    const currentMarkers = markersRef.current;
    const existingIds = new Set(currentMarkers.keys());
    const newIds = new Set(minerals.map(m => m.id));
    
    console.log('Existing marker IDs:', Array.from(existingIds));
    console.log('New marker IDs:', Array.from(newIds));

    // Remove markers that are no longer in the data
    existingIds.forEach(id => {
      if (!newIds.has(id)) {
        const marker = currentMarkers.get(id);
        if (marker) {
          console.log(`Removing marker ID: ${id}`);
          marker.remove();
          currentMarkers.delete(id);
        }
      }
    });

    // Add or update markers
    let createdCount = 0;
    minerals.forEach((mineral) => {
      const existingMarker = currentMarkers.get(mineral.id);

      if (existingMarker) {
        // Update if selected state changed
        const isSelected = mineral.id === selectedMineId;
        const markerElement = existingMarker.getElement();
        
        if (markerElement) {
          if (isSelected) {
            markerElement.style.transform = 'scale(1.3)';
            markerElement.style.transition = 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
          } else {
            markerElement.style.transform = 'scale(1)';
            markerElement.style.transition = 'transform 0.3s ease';
          }
        }
      } else {
        // Create new marker
        const isSelected = mineral.id === selectedMineId;
        
        console.log(`Creating marker for: ${mineral.mine_name} (ID: ${mineral.id})`);
        console.log(`Coordinates: [${mineral.longitude}, ${mineral.latitude}]`);
        console.log(`Lat type: ${typeof mineral.latitude}, Lng type: ${typeof mineral.longitude}`);
        console.log(`Lat value: ${mineral.latitude}, Lng value: ${mineral.longitude}`);
        
        // Validate coordinates before creating marker
        if (typeof mineral.latitude !== 'number' || typeof mineral.longitude !== 'number') {
          console.error(`❌ Invalid coordinate types for ${mineral.mine_name}`);
          return;
        }
        
        if (isNaN(mineral.latitude) || isNaN(mineral.longitude)) {
          console.error(`❌ NaN coordinates for ${mineral.mine_name}`);
          return;
        }
        
        // Create popup content
        const popupContent = document.createElement('div');
        popupContent.className = 'mine-popup';
        popupContent.innerHTML = `
          <div class="mine-popup-content">
            <h3 class="mine-popup-title">${escapeHtml(mineral.mine_name)}</h3>
            <div class="mine-popup-details">
              <p><strong>Mineral:</strong> ${escapeHtml(mineral.mineral)}</p>
              <p><strong>State:</strong> ${escapeHtml(mineral.state)}</p>
              <p><strong>District:</strong> ${escapeHtml(mineral.district)}</p>
              <p><strong>Owner:</strong> ${escapeHtml(mineral.owner)}</p>
              <p><strong>Status:</strong> ${escapeHtml(mineral.status)}</p>
            </div>
          </div>
        `;

        // Create popup
        const popup = new maplibregl.Popup({
          offset: 25,
          closeButton: true,
          closeOnClick: true,
          className: 'mine-popup-container'
        }).setDOMContent(popupContent);

        // Create marker
        const marker = new maplibregl.Marker({
          color: isSelected ? '#e74c3c' : '#e74c3c',
          scale: isSelected ? 1.3 : 1
        })
          .setLngLat([mineral.longitude, mineral.latitude])
          .setPopup(popup)
          .addTo(map);

        console.log(`✓ Marker created and added to map for ${mineral.mine_name}`);
        createdCount++;

        // Add click handler
        marker.getElement()?.addEventListener('click', () => {
          if (onMineSelect) {
            onMineSelect(mineral);
          }
        });

        currentMarkers.set(mineral.id, marker);
      }
    });

    console.log(`✓ Total markers created: ${createdCount}`);
    console.log(`✓ Total markers in map: ${currentMarkers.size}`);
    console.log('Marker IDs:', Array.from(currentMarkers.keys()));

    return () => {
      console.log('=== MineMarkers CLEANUP ===');
      // Cleanup all markers
      currentMarkers.forEach(marker => marker.remove());
      currentMarkers.clear();
    };
  }, [map, minerals, selectedMineId, onMineSelect]);

  return null;
});

/**
 * Escape HTML to prevent XSS
 */
const escapeHtml = (text: string): string => {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
};

MineMarkers.displayName = 'MineMarkers';
