import { Bookmark, Compass, Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Mineral } from '../../types/minerals';

interface SavedProjectsViewProps {
  minerals: Mineral[];
  onSelectMine: (mine: Mineral) => void;
  onExploreDashboard: () => void;
}

export const SavedProjectsView = ({ minerals, onSelectMine, onExploreDashboard }: SavedProjectsViewProps) => {
  const sampleProjects = [
    {
      id: 'proj-1',
      name: 'Karnataka Iron & Steel Corridor Study',
      updated: '2 days ago',
      mineCount: 18,
      mineral: 'Iron Ore',
    },
    {
      id: 'proj-2',
      name: 'Odisha Bauxite Expansion Initiative',
      updated: '5 days ago',
      mineCount: 12,
      mineral: 'Bauxite',
    },
    {
      id: 'proj-3',
      name: 'Hutti Gold Deposit Prospecting',
      updated: '1 week ago',
      mineCount: 5,
      mineral: 'Gold',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-foreground tracking-tight flex items-center gap-2">
            <Bookmark className="h-7 w-7 text-indigo-500" />
            Saved Exploration Projects
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage bookmarked mining sites, custom GIS workspace layers, and saved criteria.
          </p>
        </div>
        <Button onClick={onExploreDashboard} className="rounded-xl font-bold shadow-lg gap-2">
          <Plus className="h-4 w-4" />
          Create New Exploration Workspace
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sampleProjects.map((proj) => (
          <div
            key={proj.id}
            className="p-6 rounded-3xl bg-card border border-border/80 hover:border-primary/50 shadow-md hover:shadow-xl transition-all space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs font-semibold rounded-full">
                  {proj.mineral}
                </Badge>
                <span className="text-[11px] text-muted-foreground">{proj.updated}</span>
              </div>
              <h3 className="text-lg font-bold text-foreground">{proj.name}</h3>
              <p className="text-xs text-muted-foreground">
                Contains <span className="font-semibold text-foreground">{proj.mineCount} mine sites</span> with custom environmental layer filters.
              </p>
            </div>

            <Button
              onClick={() => {
                if (minerals.length > 0) onSelectMine(minerals[0]);
                onExploreDashboard();
              }}
              variant="outline"
              size="sm"
              className="w-full rounded-xl text-xs font-semibold gap-1.5"
            >
              <Compass className="h-3.5 w-3.5" />
              Open In GIS Dashboard
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
