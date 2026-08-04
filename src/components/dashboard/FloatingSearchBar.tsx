import { useState, useRef, useEffect } from 'react';
import { Search, X, MapPin, Sparkles, Bell, Settings, Sun, Moon, Filter } from 'lucide-react';
import { Mineral } from '../../types/minerals';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { motion, AnimatePresence } from 'framer-motion';

interface FloatingSearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  minerals: Mineral[];
  onSelectMine: (mine: Mineral) => void;
  selectedMineralType: string | null;
  onSelectMineralType: (type: string | null) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenSettings: () => void;
  onOpenFilterDrawer: () => void;
  onShowToast: (title: string, description?: string) => void;
}

const POPULAR_MINERALS = [
  'All',
  'Iron Ore',
  'Copper',
  'Gold',
  'Bauxite',
  'Coal',
  'Limestone',
  'Manganese',
];

export const FloatingSearchBar = ({
  searchQuery,
  onSearchChange,
  minerals,
  onSelectMine,
  selectedMineralType,
  onSelectMineralType,
  isDarkMode,
  onToggleDarkMode,
  onOpenSettings,
  onOpenFilterDrawer,
  onShowToast,
}: FloatingSearchBarProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter search results for live auto-complete dropdown
  const filteredResults = searchQuery.trim()
    ? minerals
        .filter(
          (m) =>
            m.mine_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            m.mineral.toLowerCase().includes(searchQuery.toLowerCase()) ||
            m.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
            m.district.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 6)
    : [];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="absolute top-4 left-4 right-4 z-40 flex flex-col items-center pointer-events-none">
      <div className="w-full max-w-4xl flex flex-col md:flex-row items-stretch md:items-center gap-3">
        {/* Main Floating Glass Search Bar */}
        <div
          ref={dropdownRef}
          className="relative flex-1 bg-background/90 dark:bg-slate-900/90 backdrop-blur-xl border border-border/80 rounded-2xl shadow-2xl transition-all duration-300 pointer-events-auto"
        >
          <div className="flex items-center px-4 h-14 gap-3">
            {/* Logo Badge */}
            <div className="flex items-center gap-2 pr-2 border-r border-border/60">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center shadow-md">
                <Sparkles className="h-5 w-5 text-white animate-pulse" />
              </div>
              <div className="hidden sm:block">
                <span className="text-sm font-bold tracking-tight bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                  INRIP
                </span>
                <span className="text-[10px] block text-muted-foreground font-medium -mt-1">
                  SaaS GIS
                </span>
              </div>
            </div>

            {/* Search Input */}
            <div className="flex-1 flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground shrink-0" />
              <Input
                type="text"
                placeholder="Search mines, minerals, states, or districts..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onFocus={() => setIsFocused(true)}
                className="border-none shadow-none focus-visible:ring-0 text-sm bg-transparent h-10 px-0 placeholder:text-muted-foreground/70"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="p-1 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Filter Drawer Toggle Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={onOpenFilterDrawer}
              className="hidden sm:flex items-center gap-1.5 rounded-xl border-border/70 hover:bg-accent/80 text-xs font-medium"
            >
              <Filter className="h-3.5 w-3.5" />
              Filters
            </Button>
          </div>

          {/* Auto-Complete Search Results Dropdown */}
          <AnimatePresence>
            {isFocused && filteredResults.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute left-0 right-0 top-full mt-2 bg-background/95 dark:bg-slate-900/95 backdrop-blur-xl border border-border/80 rounded-2xl shadow-2xl overflow-hidden divide-y divide-border/40 z-50 max-h-80 overflow-y-auto"
              >
                <div className="p-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground px-4 bg-muted/30">
                  Search Results ({filteredResults.length})
                </div>
                {filteredResults.map((mine) => (
                  <div
                    key={mine.id}
                    onClick={() => {
                      onSelectMine(mine);
                      setIsFocused(false);
                    }}
                    className="p-3 px-4 hover:bg-accent/60 cursor-pointer flex items-center justify-between transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500 dark:bg-blue-500/20">
                        <MapPin className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-foreground">
                          {mine.mine_name}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {mine.district}, {mine.state} • Owner: {mine.owner}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs rounded-lg">
                        {mine.mineral}
                      </Badge>
                      <Badge
                        variant={mine.status === 'Active' ? 'default' : 'secondary'}
                        className="text-[10px] rounded-lg"
                      >
                        {mine.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Header Action Tools */}
        <div className="flex items-center justify-end gap-2 bg-background/90 dark:bg-slate-900/90 backdrop-blur-xl border border-border/80 rounded-2xl p-1.5 shadow-2xl pointer-events-auto self-end md:self-auto shrink-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={() =>
              onShowToast('Notifications', 'You have 3 unread resource alerts.')
            }
            className="relative rounded-xl hover:bg-muted/80 h-10 w-10"
            title="Notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 animate-pulse" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleDarkMode}
            className="rounded-xl hover:bg-muted/80 h-10 w-10"
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDarkMode ? (
              <Sun className="h-4 w-4 text-amber-400" />
            ) : (
              <Moon className="h-4 w-4 text-slate-700" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={onOpenSettings}
            className="rounded-xl hover:bg-muted/80 h-10 w-10"
            title="Settings"
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Quick Mineral Filter Category Chips */}
      <div className="w-full max-w-4xl mt-2.5 flex items-center gap-2 overflow-x-auto no-scrollbar pointer-events-auto py-1 px-1">
        {POPULAR_MINERALS.map((type) => {
          const isSelected =
            type === 'All' ? selectedMineralType === null : selectedMineralType === type;
          return (
            <button
              key={type}
              onClick={() => onSelectMineralType(type === 'All' ? null : type)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 shadow-md ${
                isSelected
                  ? 'bg-primary text-primary-foreground shadow-primary/25 scale-105 font-semibold'
                  : 'bg-background/80 dark:bg-slate-900/80 backdrop-blur-md text-muted-foreground hover:text-foreground hover:bg-background/95 border border-border/60'
              }`}
            >
              {type}
            </button>
          );
        })}
      </div>
    </div>
  );
};
