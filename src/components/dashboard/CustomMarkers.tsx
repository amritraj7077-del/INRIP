import { Mineral } from '../../types/minerals';

// Color mapping for different mineral types
const mineralColors: Record<string, string> = {
  'iron ore': '#ef4444',
  'copper': '#f59e0b',
  'gold': '#eab308',
  'bauxite': '#22c55e',
  'coal': '#3b82f6',
  'limestone': '#8b5cf6',
  'manganese': '#ec4899',
  'default': '#6b7280',
};

export const getMineralColor = (mineral: string): string => {
  const lowerMineral = mineral.toLowerCase();
  return mineralColors[lowerMineral] || mineralColors['default'];
};

export const createCustomMarkerElement = (mineral: Mineral, isSelected: boolean): HTMLElement => {
  const color = getMineralColor(mineral.mineral);
  const scale = isSelected ? 1.3 : 1;

  const el = document.createElement('div');
  el.style.width = `${40 * scale}px`;
  el.style.height = `${40 * scale}px`;
  el.style.cursor = 'pointer';
  el.style.transition = 'transform 0.2s ease';

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 40 40');
  svg.setAttribute('width', '100%');
  svg.setAttribute('height', '100%');

  // Outer glow
  const glow = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  glow.setAttribute('cx', '20');
  glow.setAttribute('cy', '20');
  glow.setAttribute('r', '16');
  glow.setAttribute('fill', color);
  glow.setAttribute('opacity', '0.3');
  svg.appendChild(glow);

  // Main circle
  const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  circle.setAttribute('cx', '20');
  circle.setAttribute('cy', '20');
  circle.setAttribute('r', '10');
  circle.setAttribute('fill', color);
  circle.setAttribute('stroke', 'white');
  circle.setAttribute('stroke-width', '2');
  svg.appendChild(circle);

  // Inner dot
  const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  dot.setAttribute('cx', '20');
  dot.setAttribute('cy', '20');
  dot.setAttribute('r', '4');
  dot.setAttribute('fill', 'white');
  svg.appendChild(dot);

  el.appendChild(svg);

  return el;
};

export const createClusterMarkerElement = (count: number): HTMLElement => {
  const el = document.createElement('div');
  el.style.width = '50px';
  el.style.height = '50px';
  el.style.cursor = 'pointer';
  el.style.transition = 'transform 0.2s ease';

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 50 50');
  svg.setAttribute('width', '100%');
  svg.setAttribute('height', '100%');

  // Cluster circle
  const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  circle.setAttribute('cx', '25');
  circle.setAttribute('cy', '25');
  circle.setAttribute('r', '22');
  circle.setAttribute('fill', '#3b82f6');
  circle.setAttribute('stroke', 'white');
  circle.setAttribute('stroke-width', '3');
  svg.appendChild(circle);

  // Count text
  const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  text.setAttribute('x', '25');
  text.setAttribute('y', '25');
  text.setAttribute('text-anchor', 'middle');
  text.setAttribute('dominant-baseline', 'middle');
  text.setAttribute('fill', 'white');
  text.setAttribute('font-size', '14');
  text.setAttribute('font-weight', 'bold');
  text.textContent = count.toString();
  svg.appendChild(text);

  el.appendChild(svg);

  return el;
};
