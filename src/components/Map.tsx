import { useEffect, useRef, useState, useCallback } from 'react';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { LoadingScreen } from './LoadingScreen';
import { PremiumControls } from './PremiumControls';
import { MineMarkers } from './MineMarkers';
import { LoadingSkeleton } from './LoadingSkeleton';
import './Map.css';
import './MineMarkers.css';
import { fetchMinerals } from '../services/mineralsService';
import { Mineral } from '../types/minerals';
import { isSupabaseConfigured } from '../lib/supabase';

interface MapProps {
  maptilerApiKey?: string;
}

const INDIA_SUBCONTINENT_BOUNDS: [[number, number], [number, number]] = [
  [60, 0],    // Southwest - including Sri Lanka and southern ocean
  [100, 40]   // Northeast - including Jammu & Kashmir, Ladakh, Tibet
];

const INDIA_CENTER: [number, number] = [78.9629, 20.5937];

export const Map = ({ maptilerApiKey = import.meta.env.VITE_MAPTILER_API_KEY || '' }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);
  const [minerals, setMinerals] = useState<Mineral[]>([]);
  const [isLoadingMinerals, setIsLoadingMinerals] = useState(false);
  const [mineralsError, setMineralsError] = useState<string | null>(null);
  const [selectedMineId, setSelectedMineId] = useState<number | null>(null);
  const isInitialized = useRef(false);
  const isLoadingRef = useRef(true);

  // Memoize callbacks to prevent unnecessary re-renders
  const flyToIndia = useCallback(() => {
    if (map.current) {
      map.current.flyTo({
        center: INDIA_CENTER,
        zoom: 4,
        bearing: 0,
        pitch: 0,
        duration: 1500,
        essential: true
      });
    }
  }, []);

  const locateUser = useCallback(() => {
    if (map.current && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          map.current?.flyTo({
            center: [longitude, latitude],
            zoom: 10,
            duration: 1500
          });
        },
        (error) => {
          console.error('Geolocation error:', error);
        }
      );
    }
  }, []);

  const flyToMine = useCallback((mineral: Mineral) => {
    if (map.current) {
      setSelectedMineId(mineral.id);
      map.current.flyTo({
        center: [mineral.longitude, mineral.latitude],
        zoom: 12,
        bearing: 0,
        pitch: 0,
        duration: 1500,
        essential: true
      });
    }
  }, []);

  const handleMineSelect = useCallback((mineral: Mineral) => {
    flyToMine(mineral);
  }, [flyToMine]);

  // Fit map bounds to show all minerals smoothly
  const fitBoundsToMinerals = useCallback(() => {
    if (!map.current || minerals.length === 0) return;

    const bounds = minerals.reduce((bounds, mineral) => {
      return bounds.extend([mineral.longitude, mineral.latitude]);
    }, new maplibregl.LngLatBounds(
      [minerals[0].longitude, minerals[0].latitude],
      [minerals[0].longitude, minerals[0].latitude]
    ));

    map.current.fitBounds(bounds, {
      padding: 50,
      duration: 1500,
      maxZoom: 10
    });
  }, [minerals]);

  // Fit bounds when minerals change (separate effect)
  useEffect(() => {
    if (minerals.length > 0 && map.current) {
      console.log('Fitting bounds to minerals');
      setTimeout(() => fitBoundsToMinerals(), 500);
    }
  }, [minerals, fitBoundsToMinerals]);

  // Fetch minerals from Supabase
  useEffect(() => {
    console.log('=== MINERALS FETCH TRIGGER ===');
    console.log('isMapReady:', isMapReady);
    console.log('isSupabaseConfigured:', isSupabaseConfigured);
    
    if (!isMapReady || !isSupabaseConfigured) {
      console.log('Skipping minerals fetch - conditions not met');
      console.log('isMapReady:', isMapReady, 'isSupabaseConfigured:', isSupabaseConfigured);
      return;
    }

    const loadMinerals = async () => {
      console.log('=== STARTING MINERALS LOAD ===');
      setIsLoadingMinerals(true);
      setMineralsError(null);
      
      try {
        console.log('Fetching minerals from Supabase...');
        const data = await fetchMinerals();
        console.log(`✓ Fetch returned ${data.length} minerals`);
        console.log('Sample mineral:', data[0]);
        console.log('Setting minerals state...');
        setMinerals(data);
        console.log('✓ Minerals state set');
      } catch (err) {
        console.error('✗ Error fetching minerals:', err);
        const errorMessage = err instanceof Error ? err.message : 'Failed to load minerals data';
        setMineralsError(errorMessage);
      } finally {
        console.log('Minerals load complete');
        setIsLoadingMinerals(false);
      }
    };

    loadMinerals();
  }, [isMapReady]);

  // Log when minerals state changes
  useEffect(() => {
    console.log('=== MINERALS STATE CHANGE ===');
    console.log('Minerals count:', minerals.length);
    console.log('Minerals array:', minerals);
  }, [minerals]);

  useEffect(() => {
    console.log('=== MAP INITIALIZATION START ===');
    console.log('API key loaded:', maptilerApiKey ? 'Yes' : 'No');
    console.log('API key value:', maptilerApiKey ? `${maptilerApiKey.substring(0, 8)}...` : 'N/A');
    console.log('mapContainer.current:', mapContainer.current);
    console.log('Container dimensions:', mapContainer.current ? {
      width: mapContainer.current.offsetWidth,
      height: mapContainer.current.offsetHeight
    } : 'N/A');
    console.log('isInitialized:', isInitialized.current);

    // Prevent duplicate initialization in React Strict Mode
    if (isInitialized.current) {
      console.log('Map already initialized, skipping duplicate initialization');
      return;
    }

    if (!mapContainer.current) {
      console.error('ERROR: Map container ref is null - DOM not ready');
      setError('Failed to initialize map container: DOM element not available');
      setIsLoading(false);
      return;
    }

    if (!maptilerApiKey) {
      console.error('ERROR: MapTiler API key is missing');
      setError('MapTiler API key is required. Please set VITE_MAPTILER_API_KEY environment variable.');
      setIsLoading(false);
      return;
    }

    // Check if using placeholder key and use OSM fallback
    if (maptilerApiKey === 'get_your_own_key_from_cloud_maptiler_com_account' || 
        maptilerApiKey === 'your_maptiler_api_key_here' || 
        maptilerApiKey === 'oKPbasBPRD2mm9oFQzTg') {
      console.warn('WARNING: Using placeholder MapTiler API key. Switching to OSM fallback style.');
      const fallbackStyle = {
        version: 8 as const,
        sources: {
          'osm': {
            type: 'raster' as const,
            tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
            tileSize: 256,
            attribution: '© OpenStreetMap contributors'
          }
        },
        layers: [
          {
            id: 'osm-tiles',
            type: 'raster' as const,
            source: 'osm',
            minzoom: 0,
            maxzoom: 19
          }
        ]
      };
      
      console.log('Using fallback OSM style');
      isInitialized.current = true;

      try {
        const mapInstance = new maplibregl.Map({
          container: mapContainer.current,
          style: fallbackStyle,
          center: INDIA_CENTER,
          zoom: 4,
          pitch: 0,
          bearing: 0,
          maxBounds: INDIA_SUBCONTINENT_BOUNDS,
          minZoom: 3,
          maxZoom: 18,
          renderWorldCopies: false
        });

        map.current = mapInstance;
        console.log('MapLibre instance created with fallback style');

        mapInstance.on('load', () => {
          console.log('✓ Map: fully loaded (fallback style)');
          isLoadingRef.current = false;
          setIsLoading(false);
          setIsMapReady(true);
        });

        mapInstance.on('error', (e: any) => {
          console.error('✗ Map error event:', e);
          const errorMessage = e.error?.message || e.message || 'Unknown error';
          console.error('✗ Error details:', errorMessage);
          setError('Failed to load map: ' + errorMessage);
          isLoadingRef.current = false;
          setIsLoading(false);
        });

        const timeout = setTimeout(() => {
          if (isLoadingRef.current) {
            console.log('⚠ Force removing loading screen after 5 seconds');
            setIsLoading(false);
            setIsMapReady(true);
          }
        }, 5000);

        return () => {
          console.log('Cleaning up map');
          clearTimeout(timeout);
          if (mapInstance) {
            mapInstance.remove();
            map.current = null;
          }
          isInitialized.current = false;
          isLoadingRef.current = true;
        };
      } catch (err) {
        console.error('✗ Map initialization error with fallback:', err);
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        setError('Failed to initialize map: ' + errorMessage);
        setIsLoading(false);
        isInitialized.current = false;
        isLoadingRef.current = false;
      }
      return;
    }

    // Use MapTiler with real API key
    const styleUrl = `https://api.maptiler.com/maps/streets/style.json?key=${maptilerApiKey}`;
    
    console.log('Final style URL being used:', styleUrl);
    console.log('Starting map initialization with MapTiler');
    isInitialized.current = true;

    try {
      console.log('Creating MapLibre instance');
      const mapInstance = new maplibregl.Map({
        container: mapContainer.current,
        style: styleUrl,
        center: INDIA_CENTER,
        zoom: 4,
        pitch: 0,
        bearing: 0,
        maxBounds: INDIA_SUBCONTINENT_BOUNDS,
        minZoom: 3,
        maxZoom: 18,
        renderWorldCopies: false
      });

      map.current = mapInstance;
      console.log('MapLibre instance created successfully');

      // Set up event handlers
      mapInstance.on('style.load', () => {
        console.log('✓ Map: style loaded');
      });

      mapInstance.on('idle', () => {
        console.log('✓ Map: idle - all loading complete');
      });

      mapInstance.on('data', (e) => {
        if (e.dataType === 'source') {
          console.log('✓ Map: source data loaded:', e.sourceId);
        }
      });

      mapInstance.on('styledata', () => {
        console.log('✓ Map: style data loaded');
      });

      mapInstance.on('sourcedataloading', (e) => {
        console.log('Map: source data loading:', e.sourceId);
      });

      mapInstance.on('sourcedata', (e) => {
        if (e.isSourceLoaded) {
          console.log('✓ Map: source data loaded for:', e.sourceId);
        }
      });

      mapInstance.on('load', () => {
        console.log('✓ Map: fully loaded');
        isLoadingRef.current = false;
        setIsLoading(false);
        setIsMapReady(true);
        console.log('✓ Map: loading screen removed');
      });

      mapInstance.on('error', (e: any) => {
        console.error('✗ Map error event:', e);
        const errorMessage = e.error?.message || e.message || 'Unknown error';
        console.error('✗ Error details:', errorMessage);
        console.error('✗ Full error object:', JSON.stringify(e, null, 2));
        setError('Failed to load map: ' + errorMessage);
        isLoadingRef.current = false;
        setIsLoading(false);
      });

      // Force loading screen removal after timeout
      const timeout = setTimeout(() => {
        if (isLoadingRef.current) {
          console.log('⚠ Force removing loading screen after 5 seconds');
          setIsLoading(false);
          setIsMapReady(true);
        }
      }, 5000);

      return () => {
        console.log('Cleaning up map');
        clearTimeout(timeout);
        if (mapInstance) {
          mapInstance.remove();
          map.current = null;
        }
        isInitialized.current = false;
        isLoadingRef.current = true;
      };
    } catch (err) {
      console.error('✗ Map initialization error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      console.error('✗ Error stack:', err instanceof Error ? err.stack : 'N/A');
      setError('Failed to initialize map: ' + errorMessage);
      setIsLoading(false);
      isInitialized.current = false;
      isLoadingRef.current = false;
    }
  }, [maptilerApiKey]);

  if (error) {
    return (
      <div className="map-error">
        <div className="error-content">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {isLoading && <LoadingScreen message="Loading map..." />}
      <div ref={mapContainer} className="map-container" />
      {isMapReady && (
        <>
          <MineMarkers 
            map={map.current} 
            minerals={minerals}
            selectedMineId={selectedMineId}
            onMineSelect={handleMineSelect}
          />
          <PremiumControls 
            map={map.current} 
            onHome={flyToIndia}
            onLocate={locateUser}
          />
          {isLoadingMinerals && (
            <div className="minerals-loading-indicator">
              <LoadingSkeleton />
            </div>
          )}
          {mineralsError && (
            <div className="minerals-error-indicator">
              <div className="error-icon">⚠</div>
              <div className="error-message">
                <strong>Failed to load mine data</strong>
                <p>{mineralsError}</p>
              </div>
            </div>
          )}
          {!isLoadingMinerals && !mineralsError && minerals.length > 0 && (
            <div className="minerals-count-indicator">
              {minerals.length} mines loaded
            </div>
          )}
        </>
      )}
    </>
  );
};
