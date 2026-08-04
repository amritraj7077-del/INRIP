import { useState } from 'react';
import { Compass, Sparkles, Scale, FileText, ChevronUp, ChevronDown, Building2, Layers, Zap, TrendingUp } from 'lucide-react';
import { Button } from '../ui/button';
import { Mineral } from '../../types/minerals';
import { motion, AnimatePresence } from 'framer-motion';

interface BottomSheetQuickActionsProps {
  minerals: Mineral[];
  onExploreMines: () => void;
  onAiRecommendation: () => void;
  onCompareMines: () => void;
  onGenerateReport: () => void;
  onSelectMine: (mine: Mineral) => void;
}

export const BottomSheetQuickActions = ({
  minerals,
  onExploreMines,
  onAiRecommendation,
  onCompareMines,
  onGenerateReport,
  onSelectMine,
}: BottomSheetQuickActionsProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<'kpis' | 'list'>('kpis');

  const totalMines = minerals.length;
  const activeMines = minerals.filter((m) => m.status.toLowerCase() === 'active').length;
  const uniqueMinerals = new Set(minerals.map((m) => m.mineral)).size;
  const aiRecommendedCount = Math.round(totalMines * 0.25);

  return (
    <div className="absolute bottom-4 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:max-w-2xl z-30 flex flex-col items-center">
      <div className="w-full bg-background/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-border/80 rounded-3xl shadow-2xl overflow-hidden transition-all duration-300">
        {/* Top Drag/Expand Bar */}
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between px-5 py-2 cursor-pointer hover:bg-muted/40 transition-colors border-b border-border/40"
        >
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {isExpanded ? 'Resource Dashboard' : 'Quick Actions'}
            </span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
            <span className="text-[11px] font-medium hidden sm:inline">
              {isExpanded ? 'Minimize' : 'Metrics & Details'}
            </span>
            {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
          </div>
        </div>

        {/* Expanded Drawer View */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="p-4 space-y-4 max-h-[50vh] overflow-y-auto"
            >
              {/* Tab Selector */}
              <div className="flex bg-muted/60 p-1 rounded-xl gap-1">
                <button
                  onClick={() => setActiveTab('kpis')}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    activeTab === 'kpis'
                      ? 'bg-background shadow text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Key Metrics
                </button>
                <button
                  onClick={() => setActiveTab('list')}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    activeTab === 'list'
                      ? 'bg-background shadow text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Mine Directory ({minerals.length})
                </button>
              </div>

              {activeTab === 'kpis' ? (
                /* KPI Grid */
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-blue-500/10 dark:bg-blue-500/20 border border-blue-500/20 rounded-2xl p-3.5 flex flex-col">
                    <div className="flex items-center justify-between text-blue-500 mb-1">
                      <span className="text-xs font-medium">Total Mines</span>
                      <Building2 className="h-4 w-4" />
                    </div>
                    <span className="text-xl font-bold text-foreground">{totalMines}</span>
                    <span className="text-[10px] text-muted-foreground mt-0.5">+12% from last update</span>
                  </div>

                  <div className="bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/20 rounded-2xl p-3.5 flex flex-col">
                    <div className="flex items-center justify-between text-emerald-500 mb-1">
                      <span className="text-xs font-medium">Active Mines</span>
                      <Zap className="h-4 w-4" />
                    </div>
                    <span className="text-xl font-bold text-foreground">{activeMines}</span>
                    <span className="text-[10px] text-muted-foreground mt-0.5">
                      {Math.round((activeMines / (totalMines || 1)) * 100)}% active rate
                    </span>
                  </div>

                  <div className="bg-purple-500/10 dark:bg-purple-500/20 border border-purple-500/20 rounded-2xl p-3.5 flex flex-col">
                    <div className="flex items-center justify-between text-purple-500 mb-1">
                      <span className="text-xs font-medium">Mineral Types</span>
                      <Layers className="h-4 w-4" />
                    </div>
                    <span className="text-xl font-bold text-foreground">{uniqueMinerals}</span>
                    <span className="text-[10px] text-muted-foreground mt-0.5">Across India</span>
                  </div>

                  <div className="bg-amber-500/10 dark:bg-amber-500/20 border border-amber-500/20 rounded-2xl p-3.5 flex flex-col">
                    <div className="flex items-center justify-between text-amber-500 mb-1">
                      <span className="text-xs font-medium">AI Recommended</span>
                      <TrendingUp className="h-4 w-4" />
                    </div>
                    <span className="text-xl font-bold text-foreground">{aiRecommendedCount}</span>
                    <span className="text-[10px] text-muted-foreground mt-0.5">High suitability</span>
                  </div>
                </div>
              ) : (
                /* Mine List Preview */
                <div className="space-y-2">
                  {minerals.slice(0, 10).map((mine) => (
                    <div
                      key={mine.id}
                      onClick={() => {
                        onSelectMine(mine);
                        setIsExpanded(false);
                      }}
                      className="p-2.5 rounded-xl border border-border/60 hover:bg-accent/60 cursor-pointer flex items-center justify-between transition-colors"
                    >
                      <div>
                        <h4 className="text-xs font-semibold text-foreground">{mine.mine_name}</h4>
                        <p className="text-[11px] text-muted-foreground">
                          {mine.district}, {mine.state}
                        </p>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                        {mine.mineral}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main 4 Quick Action Buttons */}
        <div className="grid grid-cols-4 p-2.5 gap-2">
          {/* Action 1: Explore Mines */}
          <Button
            variant="ghost"
            onClick={onExploreMines}
            className="flex flex-col items-center justify-center h-16 py-2 px-1 rounded-2xl hover:bg-accent/80 transition-all group"
          >
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
              <Compass className="h-5 w-5" />
            </div>
            <span className="text-[11px] font-semibold text-foreground mt-1 tracking-tight">
              Explore Mines
            </span>
          </Button>

          {/* Action 2: AI Recommendation */}
          <Button
            variant="ghost"
            onClick={onAiRecommendation}
            className="flex flex-col items-center justify-center h-16 py-2 px-1 rounded-2xl hover:bg-accent/80 transition-all group"
          >
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
              <Sparkles className="h-5 w-5" />
            </div>
            <span className="text-[11px] font-semibold text-foreground mt-1 tracking-tight">
              AI Suggest
            </span>
          </Button>

          {/* Action 3: Compare Mines */}
          <Button
            variant="ghost"
            onClick={onCompareMines}
            className="flex flex-col items-center justify-center h-16 py-2 px-1 rounded-2xl hover:bg-accent/80 transition-all group"
          >
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform">
              <Scale className="h-5 w-5" />
            </div>
            <span className="text-[11px] font-semibold text-foreground mt-1 tracking-tight">
              Compare
            </span>
          </Button>

          {/* Action 4: Generate Report */}
          <Button
            variant="ghost"
            onClick={onGenerateReport}
            className="flex flex-col items-center justify-center h-16 py-2 px-1 rounded-2xl hover:bg-accent/80 transition-all group"
          >
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
              <FileText className="h-5 w-5" />
            </div>
            <span className="text-[11px] font-semibold text-foreground mt-1 tracking-tight">
              Gen Report
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};
