import { ArrowLeft, Search, Mic, SlidersHorizontal, WandSparkles } from 'lucide-react';
import { useState } from 'react';

interface MapTopOverlaysProps {
  onBackToHome: () => void;
}

export const MapTopOverlays = ({ onBackToHome }: MapTopOverlaysProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      {/* Top-Left Branding & Back Button */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
        <div className="bg-white/95 backdrop-blur px-3 py-2 rounded-xl shadow-md border border-slate-200/80 flex items-center gap-2">
          <div className="w-7 h-7 bg-black text-white font-bold rounded-lg flex items-center justify-center text-xs">IN</div>
          <div>
            <h1 className="font-bold text-xs text-slate-900 leading-tight">INRIP</h1>
            <p className="text-[9px] text-slate-500 font-medium">Natural Resource Intelligence</p>
          </div>
        </div>

        <button 
          onClick={onBackToHome}
          className="bg-white/95 backdrop-blur px-3 py-2 rounded-xl shadow-md border border-slate-200/80 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 transition"
        >
          <ArrowLeft className="h-2.5 w-2.5" /> Back to Home
        </button>
      </div>

      {/* Top-Center Search Bar */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 w-96 max-w-lg">
        <div className="bg-white/95 backdrop-blur px-3 py-2 rounded-2xl shadow-md border border-slate-200/80 flex items-center gap-2">
          <Search className="h-3 w-3 text-slate-400 pl-1" />
          <input 
            type="text" 
            placeholder="Search mines, minerals, district or state..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-xs text-slate-800 placeholder-slate-400 focus:outline-none"
          />
          <button className="text-slate-400 hover:text-slate-600 px-1">
            <Mic className="h-3 w-3" />
          </button>
          <button className="text-slate-400 hover:text-slate-600 px-1 border-l border-slate-200 pl-2">
            <SlidersHorizontal className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* Top-Right AI Assistant Trigger */}
      <div className="absolute top-4 right-4 z-20">
        <button className="bg-white/95 backdrop-blur px-3.5 py-2 rounded-xl shadow-md border border-slate-200/80 text-xs font-bold text-slate-800 flex items-center gap-2 hover:bg-slate-50 transition">
          <WandSparkles className="h-3 w-3 text-amber-500" /> AI Assistant
        </button>
      </div>
    </>
  );
};
