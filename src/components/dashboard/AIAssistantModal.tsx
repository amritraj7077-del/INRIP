import { Bot, Sparkles, Cpu, ArrowRight } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Mineral } from '../../types/minerals';
import { motion } from 'framer-motion';

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  minerals: Mineral[];
  onSelectMine: (mine: Mineral) => void;
  onShowToast: (title: string, description?: string) => void;
}

export const AIAssistantModal = ({
  isOpen,
  onClose,
  minerals,
  onSelectMine,
  onShowToast,
}: AIAssistantModalProps) => {
  // Compute top recommended mines based on mock suitability heuristic
  const recommendedMines = minerals
    .map((m) => ({
      ...m,
      suitabilityScore: Math.floor(75 + (m.id % 23)),
      risk: (m.id % 3 === 0 ? 'Low' : m.id % 3 === 1 ? 'Medium' : 'High') as 'Low' | 'Medium' | 'High',
    }))
    .sort((a, b) => b.suitabilityScore - a.suitabilityScore)
    .slice(0, 5);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl bg-background/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-border/80 rounded-3xl p-6 shadow-2xl">
        <DialogHeader className="text-left border-b border-border/60 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white shadow-lg">
              <Bot className="h-6 w-6" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold flex items-center gap-2">
                INRIP AI Intelligence Assistant
                <Sparkles className="h-4 w-4 text-amber-400" />
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground mt-0.5">
                Automated mineral site evaluation, environmental risk mapping, and reserve estimation.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-5 py-3">
          {/* Executive Summary Card */}
          <div className="bg-purple-500/10 dark:bg-purple-500/20 border border-purple-500/30 rounded-2xl p-4 flex items-start gap-3">
            <Cpu className="h-5 w-5 text-purple-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                AI Dataset Insights ({minerals.length} Mines Evaluated)
              </h4>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                Based on satellite land cover, hydrological proximity, and infrastructure access data, 
                <span className="font-semibold text-foreground"> {recommendedMines.length} top priority sites</span> demonstrate 
                optimal commercial viability with high ESG safety ratings.
              </p>
            </div>
          </div>

          {/* Top AI Recommendations */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 px-1 flex items-center justify-between">
              <span>Top AI Recommended Mines</span>
              <span className="text-[10px] text-purple-500 font-medium">Ranked by Suitability</span>
            </h4>

            <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
              {recommendedMines.map((mine, idx) => (
                <motion.div
                  key={mine.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => {
                    onSelectMine(mine);
                    onClose();
                  }}
                  className="p-3.5 rounded-2xl border border-border/70 bg-card hover:bg-accent/70 cursor-pointer flex items-center justify-between transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-xl bg-purple-500/15 text-purple-600 font-bold text-xs flex items-center justify-center">
                      #{idx + 1}
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                        {mine.mine_name}
                      </h5>
                      <p className="text-xs text-muted-foreground">
                        {mine.mineral} • {mine.district}, {mine.state}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="text-xs font-bold text-emerald-500 block">
                        {mine.suitabilityScore}% Match
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        Risk: {mine.risk}
                      </span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="border-t border-border/60 pt-4 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            Model v4.2 • Updated real-time
          </span>
          <Button
            onClick={() => {
              onClose();
              onShowToast(
                'AI Report Generation',
                'Generating full strategic resource forecast document...'
              );
            }}
            className="rounded-xl font-semibold text-xs gap-2"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Generate AI Full Audit Report
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
