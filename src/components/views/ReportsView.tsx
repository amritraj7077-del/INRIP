import { FileText, Download, Eye, Sparkles, Calendar } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Mineral } from '../../types/minerals';

interface ReportsViewProps {
  minerals: Mineral[];
  onShowToast: (title: string, description?: string) => void;
}

export const ReportsView = ({ minerals, onShowToast }: ReportsViewProps) => {
  const sampleReports = [
    {
      id: 'rep-1',
      title: 'National Mineral Reserve Feasibility Audit 2026',
      type: 'Strategic Audit',
      date: 'Aug 04, 2026',
      minesCount: minerals.length || 1247,
      status: 'Generated',
    },
    {
      id: 'rep-2',
      title: 'Karnataka Iron Ore & Hematite Commercial Projections',
      type: 'Commodity Report',
      date: 'Jul 28, 2026',
      minesCount: 142,
      status: 'Verified',
    },
    {
      id: 'rep-3',
      title: 'Odisha Bauxite Hydrological Buffer Impact Assessment',
      type: 'Environmental ESG',
      date: 'Jul 15, 2026',
      minesCount: 89,
      status: 'Generated',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-foreground tracking-tight flex items-center gap-2">
            <FileText className="h-7 w-7 text-primary" />
            AI Mineral Feasibility Reports
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Export executive summaries, ESG compliance audits, and spatial economic valuations.
          </p>
        </div>
        <Button
          onClick={() => onShowToast('Generating Report', 'Creating complete nationwide resource report...')}
          className="rounded-xl font-bold shadow-lg gap-2"
        >
          <Sparkles className="h-4 w-4" />
          Generate New Feasibility Report
        </Button>
      </div>

      {/* Reports Grid */}
      <div className="space-y-4">
        {sampleReports.map((rep) => (
          <div
            key={rep.id}
            className="p-6 rounded-3xl bg-card border border-border/80 hover:border-primary/50 shadow-md hover:shadow-xl transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs font-semibold rounded-full">
                  {rep.type}
                </Badge>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {rep.date}
                </span>
              </div>
              <h3 className="text-lg font-bold text-foreground">{rep.title}</h3>
              <p className="text-xs text-muted-foreground">
                Evaluated <span className="font-semibold text-foreground">{rep.minesCount} mine leases</span> with GIS spectral overlays.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onShowToast('Report Preview', `Opening preview for ${rep.title}`)}
                className="rounded-xl text-xs font-semibold gap-1.5"
              >
                <Eye className="h-3.5 w-3.5" />
                Preview PDF
              </Button>
              <Button
                size="sm"
                onClick={() => onShowToast('Downloading PDF', `Downloading ${rep.title}...`)}
                className="rounded-xl text-xs font-semibold gap-1.5"
              >
                <Download className="h-3.5 w-3.5" />
                Download
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
