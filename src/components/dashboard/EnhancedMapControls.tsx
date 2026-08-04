import { useState, useEffect } from 'react';
import { ZoomIn, ZoomOut, Maximize2, Crosshair } from 'lucide-react';
import { Button } from '../ui/button';
import * as maplibregl from 'maplibre-gl';

interface EnhancedMapControlsProps {
  map: maplibregl.Map | null;
}

export const EnhancedMapControls = ({ map }: EnhancedMapControlsProps) => {
  const [mouseCoords, setMouseCoords] = useState<[number, number] | null>(null);
  const [zoomLevel, setZoomLevel] = useState(4);

  const handleZoomIn = () => {
    if (map) {
      map.zoomIn();
      setZoomLevel(map.getZoom());
    }
  };

  const handleZoomOut = () => {
    if (map) {
      map.zoomOut();
      setZoomLevel(map.getZoom());
    }
  };

  const handleFullscreen = () => {
    if (map) {
      const container = map.getContainer();
      if (!document.fullscreenElement) {
        container.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }
  };

  useEffect(() => {
    if (!map) return;

    const onZoom = () => setZoomLevel(map.getZoom());
    const onMouseMove = (e: maplibregl.MapMouseEvent) => {
      setMouseCoords([e.lngLat.lng, e.lngLat.lat]);
    };

    map.on('zoom', onZoom);
    map.on('mousemove', onMouseMove);

    return () => {
      map.off('zoom', onZoom);
      map.off('mousemove', onMouseMove);
    };
  }, [map]);

  return (
    <>
      {/* Map Zoom & Fullscreen Controls Stack */}
      <div className="absolute right-4 bottom-24 z-30 flex flex-col items-center gap-1.5 bg-background/90 dark:bg-slate-900/90 backdrop-blur-xl border border-border/80 rounded-2xl p-1.5 shadow-2xl">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleZoomIn}
          className="h-9 w-9 rounded-xl hover:bg-muted/80"
          title="Zoom In"
        >
          <ZoomIn className="h-4 w-4 text-foreground" />
        </Button>
        <span className="text-[11px] font-mono font-bold text-center text-muted-foreground select-none px-1">
          {Math.round(zoomLevel)}x
        </span>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleZoomOut}
          className="h-9 w-9 rounded-xl hover:bg-muted/80"
          title="Zoom Out"
        >
          <ZoomOut className="h-4 w-4 text-foreground" />
        </Button>

        <div className="w-6 h-px bg-border/60 my-0.5" />

        <Button
          variant="ghost"
          size="icon"
          onClick={handleFullscreen}
          className="h-9 w-9 rounded-xl hover:bg-muted/80"
          title="Toggle Fullscreen"
        >
          <Maximize2 className="h-4 w-4 text-foreground" />
        </Button>
      </div>

      {/* Mouse Coordinates Glass Pill */}
      {mouseCoords && (
        <div className="absolute bottom-4 right-4 z-30 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/80 dark:bg-slate-900/80 backdrop-blur-md border border-border/60 shadow-lg text-[11px] font-mono text-muted-foreground">
          <Crosshair className="h-3 w-3 text-primary animate-spin" />
          <span>
            {mouseCoords[1].toFixed(4)}°N, {mouseCoords[0].toFixed(4)}°E
          </span>
        </div>
      )}
    </>
  );
};
