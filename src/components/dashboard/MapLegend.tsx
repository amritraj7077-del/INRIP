import { useState } from 'react';
import { Layers, ChevronUp, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const MapLegend = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const legendItems = [
    { name: 'Iron Ore', color: '#ef4444' },
    { name: 'Copper', color: '#f59e0b' },
    { name: 'Gold', color: '#eab308' },
    { name: 'Bauxite', color: '#22c55e' },
    { name: 'Coal', color: '#3b82f6' },
    { name: 'Limestone', color: '#8b5cf6' },
    { name: 'Manganese', color: '#ec4899' },
    { name: 'Other Minerals', color: '#6b7280' },
  ];

  return (
    <div className="absolute bottom-4 left-4 z-30">
      <div className="bg-background/90 dark:bg-slate-900/90 backdrop-blur-xl border border-border/80 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300">
        {/* Toggle Bar */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-foreground hover:bg-muted/50 transition-colors w-full"
        >
          <Layers className="h-3.5 w-3.5 text-primary" />
          <span>Mineral Legend</span>
          {isExpanded ? (
            <ChevronDown className="h-3.5 w-3.5 text-muted-foreground ml-1" />
          ) : (
            <ChevronUp className="h-3.5 w-3.5 text-muted-foreground ml-1" />
          )}
        </button>

        {/* Collapsible Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="p-3 border-t border-border/40 grid grid-cols-2 gap-x-4 gap-y-2 text-xs"
            >
              {legendItems.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0 shadow-sm"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-[11px] font-medium text-muted-foreground whitespace-nowrap">
                    {item.name}
                  </span>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
