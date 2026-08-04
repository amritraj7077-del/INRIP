import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';
import * as maplibregl from 'maplibre-gl';

interface MapBottomControlsProps {
  map: maplibregl.Map | null;
}

export const MapBottomControls = ({ map }: MapBottomControlsProps) => {
  const [coordinates, setCoordinates] = useState('20.5937° N, 78.9629° E');

  const handleZoomIn = () => {
    if (map) map.zoomIn();
  };

  const handleZoomOut = () => {
    if (map) map.zoomOut();
  };

  // Update coordinates on mouse move
  if (map) {
    map.on('mousemove', (e) => {
      setCoordinates(`${e.lngLat.lat.toFixed(4)}° N, ${e.lngLat.lng.toFixed(4)}° E`);
    });
  }

  return (
    <div className="absolute bottom-6 right-4 z-20 flex items-end gap-3">
      {/* Scale Indicator */}
      <div className="bg-white/95 backdrop-blur px-3 py-1.5 rounded-xl shadow-md border border-slate-200/80 text-[10px] font-mono text-slate-600">
        200 km | —————
      </div>

      {/* Live Coordinates Box */}
      <div className="bg-white/95 backdrop-blur px-3 py-1.5 rounded-xl shadow-md border border-slate-200/80 text-[10px] font-mono text-slate-700 font-semibold">
        {coordinates}
      </div>

      {/* Map Zoom Controls */}
      <div className="bg-white/95 backdrop-blur rounded-xl shadow-md border border-slate-200/80 flex flex-col divide-y divide-slate-100">
        <button 
          onClick={handleZoomIn}
          className="w-8 h-8 flex items-center justify-center text-slate-700 hover:bg-slate-50 rounded-t-xl"
        >
          <Plus className="h-3 w-3" />
        </button>
        <button 
          onClick={handleZoomOut}
          className="w-8 h-8 flex items-center justify-center text-slate-700 hover:bg-slate-50 rounded-b-xl"
        >
          <Minus className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
};
