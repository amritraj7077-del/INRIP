import { Filter, RotateCcw, Check } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '../ui/sheet';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedMineralType: string | null;
  onSelectMineralType: (type: string | null) => void;
  selectedState: string | null;
  onSelectState: (state: string | null) => void;
  selectedStatus: string | null;
  onSelectStatus: (status: string | null) => void;
  allMinerals: string[];
  allStates: string[];
  allStatuses: string[];
  onResetFilters: () => void;
  totalFilteredCount: number;
}

export const FilterDrawer = ({
  isOpen,
  onClose,
  selectedMineralType,
  onSelectMineralType,
  selectedState,
  onSelectState,
  selectedStatus,
  onSelectStatus,
  allMinerals,
  allStates,
  allStatuses,
  onResetFilters,
  totalFilteredCount,
}: FilterDrawerProps) => {
  const activeFiltersCount =
    (selectedMineralType ? 1 : 0) + (selectedState ? 1 : 0) + (selectedStatus ? 1 : 0);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-md p-6 overflow-y-auto flex flex-col justify-between">
        <div className="space-y-6">
          <SheetHeader className="text-left border-b border-border/60 pb-4">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-xl font-bold flex items-center gap-2">
                <Filter className="h-5 w-5 text-primary" />
                Filter Mines & Minerals
              </SheetTitle>
              {activeFiltersCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onResetFilters}
                  className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Reset All
                </Button>
              )}
            </div>
            <SheetDescription className="text-xs text-muted-foreground mt-1">
              Refine map pins by mineral commodity, geographic state, or operation status.
            </SheetDescription>
          </SheetHeader>

          {/* Section 1: Mineral Types */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-foreground">Mineral Commodity</h4>
              {selectedMineralType && (
                <button
                  onClick={() => onSelectMineralType(null)}
                  className="text-xs text-primary font-medium hover:underline"
                >
                  Clear
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {allMinerals.map((mineral) => {
                const isSelected = selectedMineralType === mineral;
                return (
                  <Badge
                    key={mineral}
                    variant={isSelected ? 'default' : 'outline'}
                    onClick={() => onSelectMineralType(isSelected ? null : mineral)}
                    className={`cursor-pointer px-3 py-1.5 rounded-xl text-xs transition-all ${
                      isSelected
                        ? 'bg-primary text-primary-foreground shadow-md font-semibold'
                        : 'hover:bg-accent/80 hover:border-primary/50'
                    }`}
                  >
                    {mineral}
                    {isSelected && <Check className="h-3 w-3 ml-1" />}
                  </Badge>
                );
              })}
            </div>
          </div>

          <Separator />

          {/* Section 2: Geographic States */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-foreground">State / Region</h4>
              {selectedState && (
                <button
                  onClick={() => onSelectState(null)}
                  className="text-xs text-primary font-medium hover:underline"
                >
                  Clear
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {allStates.map((st) => {
                const isSelected = selectedState === st;
                return (
                  <Badge
                    key={st}
                    variant={isSelected ? 'default' : 'outline'}
                    onClick={() => onSelectState(isSelected ? null : st)}
                    className={`cursor-pointer px-3 py-1.5 rounded-xl text-xs transition-all ${
                      isSelected
                        ? 'bg-primary text-primary-foreground shadow-md font-semibold'
                        : 'hover:bg-accent/80 hover:border-primary/50'
                    }`}
                  >
                    {st}
                    {isSelected && <Check className="h-3 w-3 ml-1" />}
                  </Badge>
                );
              })}
            </div>
          </div>

          <Separator />

          {/* Section 3: Status */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-foreground">Operational Status</h4>
              {selectedStatus && (
                <button
                  onClick={() => onSelectStatus(null)}
                  className="text-xs text-primary font-medium hover:underline"
                >
                  Clear
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {allStatuses.map((st) => {
                const isSelected = selectedStatus === st;
                return (
                  <Badge
                    key={st}
                    variant={isSelected ? 'default' : 'outline'}
                    onClick={() => onSelectStatus(isSelected ? null : st)}
                    className={`cursor-pointer px-3.5 py-1.5 rounded-xl text-xs transition-all ${
                      isSelected
                        ? 'bg-primary text-primary-foreground shadow-md font-semibold'
                        : 'hover:bg-accent/80 hover:border-primary/50'
                    }`}
                  >
                    {st}
                    {isSelected && <Check className="h-3 w-3 ml-1" />}
                  </Badge>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-6 border-t border-border/60 space-y-3 mt-6">
          <Button onClick={onClose} className="w-full rounded-xl py-5 font-semibold text-sm shadow-lg">
            Show {totalFilteredCount} Mines
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
