import * as maplibregl from 'maplibre-gl';

/**
 * GIS Layer Management Utilities for INRIP
 * Prepare for future GIS layers and custom SVG mineral resource icons
 */

export interface GISLayerConfig {
  id: string;
  type: 'fill' | 'line' | 'circle' | 'symbol' | 'fill-extrusion' | 'raster' | 'heatmap' | 'hillshade';
  source: string;
  paint?: any;
  layout?: any;
  minzoom?: number;
  maxzoom?: number;
}

export interface ResourceIconConfig {
  id: string;
  svgPath: string;
  color: string;
  size: number;
}

export interface MineralResource {
  id: string;
  type: 'iron' | 'coal' | 'gold' | 'copper' | 'bauxite' | 'limestone' | 'manganese' | 'other';
  coordinates: [number, number];
  properties: {
    name: string;
    state: string;
    district: string;
    capacity?: string;
    status?: string;
  };
}

/**
 * Add a custom GIS layer to the map
 */
export const addGISLayer = (
  map: maplibregl.Map,
  config: GISLayerConfig
): void => {
  try {
    if (!map.getSource(config.source)) {
      console.warn(`Source ${config.source} not found`);
      return;
    }

    map.addLayer({
      id: config.id,
      type: config.type,
      source: config.source as any,
      paint: config.paint,
      layout: config.layout,
      minzoom: config.minzoom,
      maxzoom: config.maxzoom
    } as any);
  } catch (error) {
    console.error(`Failed to add layer ${config.id}:`, error);
  }
};

/**
 * Remove a GIS layer from the map
 */
export const removeGISLayer = (map: maplibregl.Map, layerId: string): void => {
  try {
    if (map.getLayer(layerId)) {
      map.removeLayer(layerId);
    }
  } catch (error) {
    console.error(`Failed to remove layer ${layerId}:`, error);
  }
};

/**
 * Create a custom SVG marker for mineral resources
 */
export const createResourceMarker = (
  config: ResourceIconConfig
): HTMLElement => {
  const element = document.createElement('div');
  element.className = 'resource-marker';
  element.style.width = `${config.size}px`;
  element.style.height = `${config.size}px`;
  
  element.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="${config.color}" stroke-width="2">
      ${config.svgPath}
    </svg>
  `;
  
  return element;
};

/**
 * Add custom SVG mineral resource icons to the map
 */
export const addResourceMarkers = (
  map: maplibregl.Map,
  resources: Array<{
    coordinates: [number, number];
    iconConfig: ResourceIconConfig;
  }>
): maplibregl.Marker[] => {
  const markers: maplibregl.Marker[] = [];
  
  resources.forEach(resource => {
    const element = createResourceMarker(resource.iconConfig);
    const marker = new maplibregl.Marker({
      element,
      anchor: 'center'
    })
      .setLngLat(resource.coordinates)
      .addTo(map);
    
    markers.push(marker);
  });
  
  return markers;
};

/**
 * Predefined SVG paths for mineral resource types
 */
export const MINERAL_RESOURCE_ICONS = {
  iron: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
  coal: 'M22 10v6M2 10l10-5 10 5-10 5z',
  gold: 'M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z',
  copper: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
  bauxite: 'M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2',
  limestone: 'M3 21h18v-8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8zm4-10h2v6H7v-6zm4 0h2v6h-2v-6zm4 0h2v6h-2v-6z',
  manganese: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
  other: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'
};

/**
 * Add GeoJSON layer for mineral deposits
 */
export const addGeoJSONLayer = (
  map: maplibregl.Map,
  sourceId: string,
  geojsonData: GeoJSON.FeatureCollection,
  layerId: string,
  paintConfig: any
): void => {
  try {
    if (map.getSource(sourceId)) {
      map.removeSource(sourceId);
    }

    map.addSource(sourceId, {
      type: 'geojson',
      data: geojsonData
    });

    map.addLayer({
      id: layerId,
      type: 'circle',
      source: sourceId,
      paint: paintConfig
    });
  } catch (error) {
    console.error('Failed to add GeoJSON layer:', error);
  }
};

/**
 * Create clustered markers for mineral resources
 */
export const createClusteredMarkers = (
  _map: maplibregl.Map,
  _resources: MineralResource[],
  _clusterRadius: number = 50
): void => {
  // Placeholder for clustering logic
  // This would use a clustering library like supercluster
  console.log('Clustered markers placeholder - ready for implementation');
};

/**
 * Add heatmap layer for mineral density
 */
export const addHeatmapLayer = (
  map: maplibregl.Map,
  sourceId: string,
  geojsonData: GeoJSON.FeatureCollection,
  layerId: string
): void => {
  try {
    if (map.getSource(sourceId)) {
      map.removeSource(sourceId);
    }

    map.addSource(sourceId, {
      type: 'geojson',
      data: geojsonData
    });

    map.addLayer({
      id: layerId,
      type: 'heatmap',
      source: sourceId,
      paint: {
        'heatmap-weight': ['get', 'capacity'],
        'heatmap-intensity': ['interpolate', ['linear'], ['zoom'], 0, 1, 9, 3],
        'heatmap-color': [
          'interpolate',
          ['linear'],
          ['heatmap-density'],
          0,
          'rgba(33,102,172,0)',
          0.2,
          'rgb(103,169,207)',
          0.4,
          'rgb(209,229,240)',
          0.6,
          'rgb(253,219,199)',
          0.8,
          'rgb(239,138,98)',
          1,
          'rgb(178,24,43)'
        ],
        'heatmap-radius': ['interpolate', ['linear'], ['zoom'], 0, 2, 9, 20],
        'heatmap-opacity': ['interpolate', ['linear'], ['zoom'], 7, 1, 9, 0]
      }
    });
  } catch (error) {
    console.error('Failed to add heatmap layer:', error);
  }
};

/**
 * Layer visibility control
 */
export const toggleLayerVisibility = (
  map: maplibregl.Map,
  layerId: string,
  visible: boolean
): void => {
  try {
    map.setLayoutProperty(layerId, 'visibility', visible ? 'visible' : 'none');
  } catch (error) {
    console.error(`Failed to toggle visibility for layer ${layerId}:`, error);
  }
};

/**
 * Filter layer by property
 */
export const filterLayerByProperty = (
  map: maplibregl.Map,
  layerId: string,
  property: string,
  value: any
): void => {
  try {
    map.setFilter(layerId, ['==', ['get', property], value]);
  } catch (error) {
    console.error(`Failed to filter layer ${layerId}:`, error);
  }
};

/**
 * Clear layer filter
 */
export const clearLayerFilter = (map: maplibregl.Map, layerId: string): void => {
  try {
    map.setFilter(layerId, null);
  } catch (error) {
    console.error(`Failed to clear filter for layer ${layerId}:`, error);
  }
};
