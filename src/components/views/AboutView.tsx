import { Sparkles, Globe2, ShieldCheck } from 'lucide-react';
import { Card } from '../ui/card';

export const AboutView = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 text-blue-500 text-xs font-bold border border-blue-500/20">
          <Sparkles className="h-3.5 w-3.5" />
          About INRIP Platform
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
          Indian Natural Resource Intelligence Platform
        </h1>
        <p className="text-base text-muted-foreground max-w-2xl mx-auto">
          Empowering geological surveys, commercial exploration, and ESG risk assessment with real-time geospatial vector data and AI analytics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="rounded-3xl border-border/80 p-6 space-y-3">
          <Globe2 className="h-8 w-8 text-blue-500" />
          <h3 className="text-lg font-bold text-foreground">Geospatial Vector Engine</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Built on top of MapLibre GL and MapTiler high-resolution vector tiles. Supports smooth clustering, bounding box rendering, and dynamic GIS layers across all 28 Indian states.
          </p>
        </Card>

        <Card className="rounded-3xl border-border/80 p-6 space-y-3">
          <ShieldCheck className="h-8 w-8 text-emerald-500" />
          <h3 className="text-lg font-bold text-foreground">ESG & Environmental Compliance</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Integrated buffer algorithms evaluate ecological reserve proximity, forest clearance statuses, and hydrological vulnerabilities automatically.
          </p>
        </Card>
      </div>
    </div>
  );
};
