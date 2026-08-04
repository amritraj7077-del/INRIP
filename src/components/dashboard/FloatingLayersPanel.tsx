import { MapPin, Grip, Droplets, Road, Trees, Globe, ChevronUp } from 'lucide-react';

export const FloatingLayersPanel = () => {
  const layers = [
    { icon: MapPin, color: 'text-amber-500', label: 'Mine Locations', checked: true },
    { icon: Grip, color: 'text-emerald-500', label: 'Mineral Zones', checked: true },
    { icon: Droplets, color: 'text-sky-500', label: 'Geology', checked: true },
    { icon: Road, color: 'text-purple-500', label: 'Infrastructure', checked: true },
    { icon: Trees, color: 'text-emerald-600', label: 'Forest Cover', checked: false },
    { icon: Globe, color: 'text-slate-500', label: 'Satellite Imagery', checked: false },
  ];

  return (
    <div className="bg-white/95 backdrop-blur rounded-2xl shadow-xl border border-slate-200/80 p-3 text-xs">
      <div className="flex items-center justify-between font-bold text-slate-900 pb-2 border-b border-slate-100">
        <span className="flex items-center gap-1.5">
          <MapPin className="h-3 w-3 text-slate-600" /> Layers
        </span>
        <ChevronUp className="h-2.5 w-2.5 text-slate-400" />
      </div>

      <div className="space-y-2 pt-2 text-[11px]">
        {layers.map((layer, index) => (
          <label key={index} className="flex items-center justify-between cursor-pointer">
            <span className="flex items-center gap-2">
              <layer.icon className={`h-3 w-3 ${layer.color}`} /> {layer.label}
            </span>
            <input 
              type="checkbox" 
              defaultChecked={layer.checked}
              className="rounded border-slate-300 text-amber-500 focus:ring-0"
            />
          </label>
        ))}
      </div>
    </div>
  );
};
