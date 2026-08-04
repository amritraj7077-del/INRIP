import { Layers, ChevronRight } from 'lucide-react';

export const ActiveLayerWidget = () => {
  return (
    <div className="absolute bottom-6 left-4 z-20">
      <div className="bg-white/95 backdrop-blur px-3 py-2 rounded-2xl shadow-xl border border-slate-200/80 flex items-center gap-3 cursor-pointer hover:bg-slate-50 transition">
        <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center text-xs">
          <Layers className="h-4 w-4" />
        </div>
        <div>
          <p className="text-[9px] text-slate-400 font-semibold uppercase">Active Layer</p>
          <p className="text-xs font-bold text-slate-900">Mine Locations</p>
        </div>
        <ChevronRight className="h-3 w-3 text-slate-400 pl-2" />
      </div>
    </div>
  );
};
