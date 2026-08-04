import { useState, useEffect, useRef } from 'react';
import { Search, X, History, TrendingUp, MapPin, Building2, CornerDownLeft } from 'lucide-react';
import { Dialog, DialogContent } from '../ui/dialog';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Mineral } from '../../types/minerals';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  minerals: Mineral[];
  onSelectMine: (mine: Mineral) => void;
}

const RECENT_SEARCHES = [
  'Kudremukh Iron Ore',
  'Karnataka Copper Mines',
  'Bauxite Deposits Odisha',
  'Hutti Gold Mine',
];

const TRENDING_MINERALS = ['Iron Ore', 'Gold', 'Copper', 'Bauxite', 'Coal'];

const POPULAR_MINES = [
  { name: 'Kudremukh Mine', location: 'Chikkamagaluru, Karnataka', mineral: 'Iron Ore' },
  { name: 'Bailadila Iron Ore', location: 'Dantewada, Chhattisgarh', mineral: 'Iron Ore' },
  { name: 'Malanjkhand Copper', location: 'Balaghat, Madhya Pradesh', mineral: 'Copper' },
  { name: 'Hutti Gold Mines', location: 'Raichur, Karnataka', mineral: 'Gold' },
  { name: 'Sukinda Chromite', location: 'Jajpur, Odisha', mineral: 'Chromite' },
];

const SUGGESTED_LOCATIONS = ['Karnataka', 'Odisha', 'Jharkhand', 'Chhattisgarh', 'Goa'];

export const SearchModal = ({
  isOpen,
  onClose,
  minerals,
  onSelectMine,
}: SearchModalProps) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Live filter matching mines
  const filteredMines = query.trim()
    ? minerals.filter(
        (m) =>
          m.mine_name.toLowerCase().includes(query.toLowerCase()) ||
          m.mineral.toLowerCase().includes(query.toLowerCase()) ||
          m.state.toLowerCase().includes(query.toLowerCase()) ||
          m.district.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  // Reset index when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Keyboard navigation handler (Up, Down, Enter, Escape)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (filteredMines.length > 0) {
        setSelectedIndex((prev) => (prev + 1) % filteredMines.length);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (filteredMines.length > 0) {
        setSelectedIndex((prev) => (prev - 1 + filteredMines.length) % filteredMines.length);
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredMines.length > 0 && filteredMines[selectedIndex]) {
        onSelectMine(filteredMines[selectedIndex]);
        onClose();
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        onKeyDown={handleKeyDown}
        className="sm:max-w-3xl p-0 gap-0 bg-background/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-border/80 rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* Search Header Input */}
        <div className="p-4 px-6 border-b border-border/60 flex items-center gap-3">
          <Search className="h-5 w-5 text-primary shrink-0" />
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search mine, mineral, district or state... (Press Esc to close)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border-none shadow-none focus-visible:ring-0 text-base font-medium h-12 bg-transparent px-0"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-block px-2 py-1 text-[10px] font-mono bg-muted rounded border border-border text-muted-foreground">
              ESC
            </kbd>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[65vh] overflow-y-auto space-y-6">
          {query.trim() ? (
            /* Live Search Results */
            <div>
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 px-1">
                <span>Matching Mine Results ({filteredMines.length})</span>
                <span className="text-[10px] text-muted-foreground font-normal">Use ↑↓ arrows + Enter</span>
              </div>

              {filteredMines.length === 0 ? (
                <div className="text-center py-10 text-muted-foreground text-sm">
                  No mine or mineral matching "{query}".
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredMines.map((mine, idx) => {
                    const isSelected = idx === selectedIndex;
                    return (
                      <div
                        key={mine.id}
                        onClick={() => {
                          onSelectMine(mine);
                          onClose();
                        }}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={`p-3.5 px-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-primary/10 border-primary shadow-md font-semibold'
                            : 'border-border/60 hover:bg-accent/60'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500">
                            <MapPin className="h-4 w-4" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-foreground">{mine.mine_name}</h4>
                            <p className="text-xs text-muted-foreground">
                              {mine.district}, {mine.state} • Owner: {mine.owner}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className="text-xs rounded-lg">
                            {mine.mineral}
                          </Badge>
                          <Badge variant={mine.status === 'Active' ? 'default' : 'secondary'} className="text-[10px] rounded-lg">
                            {mine.status}
                          </Badge>
                          {isSelected && <CornerDownLeft className="h-4 w-4 text-primary shrink-0" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            /* Default Search Discovery Items */
            <div className="space-y-6">
              {/* Recent Searches */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 px-1 flex items-center gap-1.5">
                  <History className="h-3.5 w-3.5 text-primary" />
                  Recent Searches
                </h4>
                <div className="flex flex-wrap gap-2">
                  {RECENT_SEARCHES.map((item) => (
                    <button
                      key={item}
                      onClick={() => setQuery(item.split(' ')[0])}
                      className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-muted/60 hover:bg-accent border border-border/60 transition-colors flex items-center gap-1.5"
                    >
                      <span>{item}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Trending Minerals */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 px-1 flex items-center gap-1.5">
                  <TrendingUp className="h-3.5 w-3.5 text-amber-500" />
                  Trending Minerals
                </h4>
                <div className="flex flex-wrap gap-2">
                  {TRENDING_MINERALS.map((min) => (
                    <button
                      key={min}
                      onClick={() => setQuery(min)}
                      className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
                    >
                      {min}
                    </button>
                  ))}
                </div>
              </div>

              {/* Popular Mines */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 px-1 flex items-center gap-1.5">
                  <Building2 className="h-3.5 w-3.5 text-blue-500" />
                  Popular Mines in India
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {POPULAR_MINES.map((pm) => (
                    <div
                      key={pm.name}
                      onClick={() => setQuery(pm.name.split(' ')[0])}
                      className="p-3 rounded-2xl border border-border/60 hover:bg-accent/60 cursor-pointer flex items-center justify-between transition-colors"
                    >
                      <div>
                        <span className="text-xs font-bold text-foreground block">{pm.name}</span>
                        <span className="text-[11px] text-muted-foreground">{pm.location}</span>
                      </div>
                      <Badge variant="outline" className="text-[10px]">
                        {pm.mineral}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Suggested Locations */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 px-1 flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-emerald-500" />
                  Suggested Mining Hubs
                </h4>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTED_LOCATIONS.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => setQuery(loc)}
                      className="px-3 py-1.5 rounded-xl text-xs font-medium border border-border/70 hover:bg-accent transition-colors"
                    >
                      {loc} State
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
