import { useState } from 'react';
import { Filter, Layers, Bot, Navigation, Settings, Check, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { motion, AnimatePresence } from 'framer-motion';

interface FloatingActionButtonsProps {
  onOpenFilterDrawer: () => void;
  activeFilterCount: number;
  onOpenAiModal: () => void;
  onOpenSettings: () => void;
  onLocateUser: () => void;
  mapStyle: 'streets' | 'satellite' | 'dark';
  onChangeMapStyle: (style: 'streets' | 'satellite' | 'dark') => void;
  showMiningZones: boolean;
  onToggleMiningZones: () => void;
}

export const FloatingActionButtons = ({
  onOpenFilterDrawer,
  activeFilterCount,
  onOpenAiModal,
  onOpenSettings,
  onLocateUser,
  mapStyle,
  onChangeMapStyle,
  showMiningZones,
  onToggleMiningZones,
}: FloatingActionButtonsProps) => {
  const [isLayersOpen, setIsLayersOpen] = useState(false);

  return (
    <div className="absolute right-4 top-36 z-30 flex flex-col gap-2.5 items-end">
      {/* 1. Filters Button */}
      <div className="relative">
        <Button
          variant="secondary"
          size="icon"
          onClick={onOpenFilterDrawer}
          className="h-12 w-12 rounded-2xl bg-background/90 dark:bg-slate-900/90 backdrop-blur-xl border border-border/80 shadow-xl hover:scale-105 transition-all text-foreground"
          title="Filter Mines & Minerals"
        >
          <Filter className="h-5 w-5 text-indigo-500" />
          {activeFilterCount > 0 && (
            <Badge className="absolute -top-1.5 -right-1.5 h-5 min-w-5 p-0 flex items-center justify-center rounded-full bg-indigo-600 text-[10px] text-white font-bold shadow-md">
              {activeFilterCount}
            </Badge>
          )}
        </Button>
      </div>

      {/* 2. Map Layers Button & Popover */}
      <div className="relative">
        <Button
          variant="secondary"
          size="icon"
          onClick={() => setIsLayersOpen(!isLayersOpen)}
          className={`h-12 w-12 rounded-2xl bg-background/90 dark:bg-slate-900/90 backdrop-blur-xl border border-border/80 shadow-xl hover:scale-105 transition-all text-foreground ${
            isLayersOpen ? 'ring-2 ring-primary' : ''
          }`}
          title="Map Layers & Styles"
        >
          <Layers className="h-5 w-5 text-blue-500" />
        </Button>

        <AnimatePresence>
          {isLayersOpen && (
            <motion.div
              initial={{ opacity: 0, x: 15, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 15, scale: 0.95 }}
              className="absolute right-14 top-0 w-56 bg-background/95 dark:bg-slate-900/95 backdrop-blur-xl border border-border/80 rounded-2xl shadow-2xl p-3 z-50 space-y-2"
            >
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5 px-1">
                Map Style
              </div>
              <div className="space-y-1">
                <button
                  onClick={() => {
                    onChangeMapStyle('streets');
                    setIsLayersOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between transition-colors ${
                    mapStyle === 'streets'
                      ? 'bg-primary/15 text-primary font-semibold'
                      : 'hover:bg-accent/70 text-foreground'
                  }`}
                >
                  <span>Streets View</span>
                  {mapStyle === 'streets' && <Check className="h-3.5 w-3.5 text-primary" />}
                </button>
                <button
                  onClick={() => {
                    onChangeMapStyle('satellite');
                    setIsLayersOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between transition-colors ${
                    mapStyle === 'satellite'
                      ? 'bg-primary/15 text-primary font-semibold'
                      : 'hover:bg-accent/70 text-foreground'
                  }`}
                >
                  <span>Satellite View</span>
                  {mapStyle === 'satellite' && <Check className="h-3.5 w-3.5 text-primary" />}
                </button>
                <button
                  onClick={() => {
                    onChangeMapStyle('dark');
                    setIsLayersOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between transition-colors ${
                    mapStyle === 'dark'
                      ? 'bg-primary/15 text-primary font-semibold'
                      : 'hover:bg-accent/70 text-foreground'
                  }`}
                >
                  <span>Dark Vector View</span>
                  {mapStyle === 'dark' && <Check className="h-3.5 w-3.5 text-primary" />}
                </button>
              </div>

              <div className="h-px bg-border/60 my-2" />

              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1 px-1">
                Data Overlays
              </div>
              <button
                onClick={onToggleMiningZones}
                className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between hover:bg-accent/70 transition-colors text-foreground"
              >
                <span>Mining Leases & Zones</span>
                <div
                  className={`h-4 w-4 rounded-md border flex items-center justify-center ${
                    showMiningZones ? 'bg-primary border-primary text-white' : 'border-border'
                  }`}
                >
                  {showMiningZones && <Check className="h-3 w-3" />}
                </div>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 3. AI Assistant Button */}
      <Button
        variant="secondary"
        size="icon"
        onClick={onOpenAiModal}
        className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-purple-600/90 to-indigo-600/90 backdrop-blur-xl border border-purple-400/40 shadow-xl hover:scale-105 transition-all text-white relative group"
        title="AI Resource Intelligence"
      >
        <Bot className="h-5 w-5" />
        <Sparkles className="h-3 w-3 text-amber-300 absolute top-1 right-1 animate-spin" />
      </Button>

      {/* 4. Locate Location Button */}
      <Button
        variant="secondary"
        size="icon"
        onClick={onLocateUser}
        className="h-12 w-12 rounded-2xl bg-background/90 dark:bg-slate-900/90 backdrop-blur-xl border border-border/80 shadow-xl hover:scale-105 transition-all text-foreground"
        title="Find My Location"
      >
        <Navigation className="h-5 w-5 text-emerald-500" />
      </Button>

      {/* 5. Settings Button */}
      <Button
        variant="secondary"
        size="icon"
        onClick={onOpenSettings}
        className="h-12 w-12 rounded-2xl bg-background/90 dark:bg-slate-900/90 backdrop-blur-xl border border-border/80 shadow-xl hover:scale-105 transition-all text-foreground"
        title="Platform Settings"
      >
        <Settings className="h-5 w-5 text-slate-500 dark:text-slate-400" />
      </Button>
    </div>
  );
};
