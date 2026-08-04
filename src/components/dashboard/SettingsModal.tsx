import { Settings, Moon, Sun, Map, Globe, Database } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  mapStyle: 'streets' | 'satellite' | 'dark';
  onChangeMapStyle: (style: 'streets' | 'satellite' | 'dark') => void;
  onShowToast?: (title: string, description?: string) => void;
}

export const SettingsModal = ({
  isOpen,
  onClose,
  isDarkMode,
  onToggleDarkMode,
  mapStyle,
  onChangeMapStyle,
}: SettingsModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-background/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-border/80 rounded-3xl p-6 shadow-2xl">
        <DialogHeader className="text-left border-b border-border/60 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-slate-800 text-slate-100 dark:bg-slate-800 dark:text-slate-100 shadow-md">
              <Settings className="h-5 w-5" />
            </div>
            <div>
              <DialogTitle className="text-lg font-bold">Platform Settings & Preferences</DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground mt-0.5">
                Configure GIS rendering, dark mode, coordinate formats, and connection status.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-5 py-2">
          {/* Appearance */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Interface & Theme
            </h4>
            <div className="flex items-center justify-between p-3.5 rounded-2xl border border-border/70 bg-card">
              <div className="flex items-center gap-3">
                {isDarkMode ? <Moon className="h-5 w-5 text-indigo-400" /> : <Sun className="h-5 w-5 text-amber-500" />}
                <div>
                  <span className="text-sm font-semibold text-foreground block">Dark Mode</span>
                  <span className="text-xs text-muted-foreground">
                    {isDarkMode ? 'Dark glassmorphic theme enabled' : 'Light high-contrast theme enabled'}
                  </span>
                </div>
              </div>
              <Button size="sm" variant="outline" onClick={onToggleDarkMode} className="rounded-xl text-xs">
                Toggle Mode
              </Button>
            </div>
          </div>

          {/* Map Base Layer */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Map Style Provider
            </h4>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => onChangeMapStyle('streets')}
                className={`p-3 rounded-2xl border text-center transition-all ${
                  mapStyle === 'streets'
                    ? 'border-primary bg-primary/10 font-bold text-primary'
                    : 'border-border/70 hover:bg-accent/60 text-muted-foreground'
                }`}
              >
                <Map className="h-4 w-4 mx-auto mb-1" />
                <span className="text-xs block">Streets</span>
              </button>

              <button
                onClick={() => onChangeMapStyle('satellite')}
                className={`p-3 rounded-2xl border text-center transition-all ${
                  mapStyle === 'satellite'
                    ? 'border-primary bg-primary/10 font-bold text-primary'
                    : 'border-border/70 hover:bg-accent/60 text-muted-foreground'
                }`}
              >
                <Globe className="h-4 w-4 mx-auto mb-1" />
                <span className="text-xs block">Satellite</span>
              </button>

              <button
                onClick={() => onChangeMapStyle('dark')}
                className={`p-3 rounded-2xl border text-center transition-all ${
                  mapStyle === 'dark'
                    ? 'border-primary bg-primary/10 font-bold text-primary'
                    : 'border-border/70 hover:bg-accent/60 text-muted-foreground'
                }`}
              >
                <Moon className="h-4 w-4 mx-auto mb-1" />
                <span className="text-xs block">Dark Vector</span>
              </button>
            </div>
          </div>

          {/* Data Connection */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Database Integration
            </h4>
            <div className="p-3.5 rounded-2xl border border-border/70 bg-card space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-foreground flex items-center gap-2">
                  <Database className="h-4 w-4 text-emerald-500" />
                  Supabase Minerals Table
                </span>
                <Badge className="bg-emerald-500/20 text-emerald-500 hover:bg-emerald-500/20 border-none text-[10px]">
                  Connected
                </Badge>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
                <span>MapLibre GL Vector Engine</span>
                <span className="font-mono text-[11px]">v6.1.0</span>
              </div>
            </div>
          </div>

          {/* Future Modules */}
          <div className="p-3.5 rounded-2xl border border-dashed border-border/80 bg-muted/30 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-foreground block">Drone Imagery & Satellite 3D</span>
              <span className="text-[11px] text-muted-foreground">High resolution spectral raster datasets</span>
            </div>
            <Badge variant="outline" className="text-[10px] text-muted-foreground">
              Coming Soon
            </Badge>
          </div>
        </div>

        <div className="border-t border-border/60 pt-4 flex justify-end">
          <Button onClick={onClose} className="rounded-xl text-xs font-semibold">
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
