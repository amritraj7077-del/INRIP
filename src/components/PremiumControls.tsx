import { useEffect } from 'react';
import * as maplibregl from 'maplibre-gl';
import './PremiumControls.css';

interface PremiumControlsProps {
  map: maplibregl.Map | null;
  onHome: () => void;
  onLocate: () => void;
}

export const PremiumControls = ({ map, onHome, onLocate }: PremiumControlsProps) => {
  useEffect(() => {
    if (!map) return;

    // Add navigation controls
    const navControl = new maplibregl.NavigationControl({
      showCompass: true,
      showZoom: false,
      visualizePitch: true
    });
    (map as any).addControl(navControl, 'top-right');

    // Add fullscreen control
    const fullscreenControl = new maplibregl.FullscreenControl();
    (map as any).addControl(fullscreenControl, 'top-right');

    // Add scale control
    const scaleControl = new maplibregl.ScaleControl({
      maxWidth: 120,
      unit: 'metric'
    });
    (map as any).addControl(scaleControl, 'bottom-left');

    return () => {
      try {
        (map as any).removeControl(navControl);
        (map as any).removeControl(fullscreenControl);
        (map as any).removeControl(scaleControl);
      } catch (error) {
        console.warn('Error removing controls:', error);
      }
    };
  }, [map]);

  return (
    <div className="premium-controls">
      {/* Custom Zoom Controls */}
      <div className="zoom-controls-premium">
        <button
          className="control-button zoom-in"
          onClick={() => map?.zoomIn()}
          aria-label="Zoom in"
          title="Zoom in"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
        <button
          className="control-button zoom-out"
          onClick={() => map?.zoomOut()}
          aria-label="Zoom out"
          title="Zoom out"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
      </div>

      {/* Home Button */}
      <button
        className="control-button home-button"
        onClick={onHome}
        aria-label="Home"
        title="Reset to India view"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      </button>

      {/* Locate Me Button */}
      <button
        className="control-button locate-button"
        onClick={onLocate}
        aria-label="Locate me"
        title="Find my location"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="3 11 22 2 13 21 11 13 3 11" />
        </svg>
      </button>
    </div>
  );
};
