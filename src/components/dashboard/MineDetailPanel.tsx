import { Mineral } from '../../types/minerals';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '../ui/sheet';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { MapPin, Navigation, Download, Brain, Building2, Copy, Check, Scale, Train, Zap, Route, FileText, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface MineDetailPanelProps {
  mine: Mineral | null;
  isOpen: boolean;
  onClose: () => void;
  onFlyToMine?: (mine: Mineral) => void;
  onShowToast?: (title: string, description?: string) => void;
}

export const MineDetailPanel = ({
  mine,
  isOpen,
  onClose,
  onFlyToMine,
  onShowToast,
}: MineDetailPanelProps) => {
  const [copied, setCopied] = useState(false);

  if (!mine) return null;

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30';
      case 'inactive':
        return 'bg-slate-500/20 text-slate-600 dark:text-slate-400 border-slate-500/30';
      case 'proposed':
        return 'bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500/30';
      default:
        return 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30';
    }
  };

  const copyCoordinates = () => {
    const coordsStr = `${mine.latitude.toFixed(4)}, ${mine.longitude.toFixed(4)}`;
    navigator.clipboard.writeText(coordsStr);
    setCopied(true);
    if (onShowToast) {
      onShowToast('Coordinates Copied', `Copied ${coordsStr} to clipboard`);
    }
    setTimeout(() => setCopied(false), 2000);
  };

  // Mock domain indicators calculated deterministically from mine ID
  const suitabilityScore = Math.floor(75 + (mine.id % 23));
  const envRisk = mine.id % 3 === 0 ? 'Low Risk' : mine.id % 3 === 1 ? 'Medium Risk' : 'High Risk';
  const reserveEstimate = `${(12.5 + (mine.id % 45)).toFixed(1)} Million Metric Tonnes (MT)`;
  const annualProduction = `${(1.2 + (mine.id % 8) * 0.4).toFixed(1)} MT / Year`;
  const railwayDist = `${(3.2 + (mine.id % 12)).toFixed(1)} km`;
  const powerPlantDist = `${(8.5 + (mine.id % 20)).toFixed(1)} km`;
  const roadConn = mine.id % 2 === 0 ? 'National Highway 44 (4-Lane)' : 'State Highway 12';

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md p-6 overflow-y-auto bg-background/95 dark:bg-slate-900/95 backdrop-blur-2xl border-l border-border/80 shadow-2xl flex flex-col justify-between"
      >
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {/* COLLAPSED / HEADER SECTION: Mine name, Mineral, AI Score */}
          <SheetHeader className="text-left border-b border-border/60 pb-4">
            <div className="flex items-center justify-between gap-2">
              <Badge variant="outline" className={`px-2.5 py-0.5 text-xs font-semibold rounded-full border ${getStatusColor(mine.status)}`}>
                {mine.status}
              </Badge>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs rounded-full font-bold px-3 py-1 bg-primary/10 text-primary">
                  {mine.mineral}
                </Badge>
                <Badge className="bg-purple-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                  AI Score: {suitabilityScore}%
                </Badge>
              </div>
            </div>
            <SheetTitle className="text-2xl font-extrabold text-foreground mt-2 tracking-tight">
              {mine.mine_name}
            </SheetTitle>
            <SheetDescription className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <MapPin className="h-3.5 w-3.5 text-red-500 shrink-0" />
              {mine.district}, {mine.state}, India
            </SheetDescription>
          </SheetHeader>

          {/* Primary Quick Button: Fly to Location */}
          <div className="grid grid-cols-2 gap-2">
            <Button
              size="sm"
              onClick={() => onFlyToMine && onFlyToMine(mine)}
              className="rounded-xl font-semibold text-xs flex items-center justify-center gap-2 py-5 shadow-md"
            >
              <Navigation className="h-4 w-4" />
              Fly to Location
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={copyCoordinates}
              className="rounded-xl font-semibold text-xs flex items-center justify-center gap-2 py-5 border-border/80"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
              {copied ? 'Copied' : 'Copy Lat/Lng'}
            </Button>
          </div>

          {/* EXPANDED SECTION 1: Ownership, Reserve & Production */}
          <Card className="rounded-2xl border-border/70 shadow-sm bg-card/60">
            <CardHeader className="py-3 px-4 border-b border-border/40">
              <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <Building2 className="h-4 w-4 text-indigo-500" />
                Ownership & Reserve Capacity
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-2.5 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground font-medium">Owner / Operator</span>
                <span className="font-semibold text-foreground">{mine.owner || 'State Mining Corp'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground font-medium">Estimated Reserve</span>
                <span className="font-semibold text-foreground">{reserveEstimate}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground font-medium">Annual Production</span>
                <span className="font-semibold text-foreground">{annualProduction}</span>
              </div>
            </CardContent>
          </Card>

          {/* EXPANDED SECTION 2: Geographic State, District, Coordinates */}
          <Card className="rounded-2xl border-border/70 shadow-sm bg-card/60">
            <CardHeader className="py-3 px-4 border-b border-border/40">
              <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <MapPin className="h-4 w-4 text-blue-500" />
                Location & Coordinates
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-2.5 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground font-medium">State</span>
                <span className="font-semibold text-foreground">{mine.state}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground font-medium">District</span>
                <span className="font-semibold text-foreground">{mine.district}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground font-medium">Coordinates</span>
                <span className="font-mono font-semibold text-foreground">
                  {mine.latitude.toFixed(4)}°N, {mine.longitude.toFixed(4)}°E
                </span>
              </div>
            </CardContent>
          </Card>

          {/* EXPANDED SECTION 3: Infrastructure (Railway, Power Plant, Road Connectivity) */}
          <Card className="rounded-2xl border-border/70 shadow-sm bg-card/60">
            <CardHeader className="py-3 px-4 border-b border-border/40">
              <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <Route className="h-4 w-4 text-emerald-500" />
                Infrastructure Proximity
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-2.5 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground font-medium flex items-center gap-1.5">
                  <Train className="h-3.5 w-3.5 text-blue-400" />
                  Nearby Railway Siding
                </span>
                <span className="font-semibold text-foreground">{railwayDist}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground font-medium flex items-center gap-1.5">
                  <Zap className="h-3.5 w-3.5 text-amber-400" />
                  Power Plant Access
                </span>
                <span className="font-semibold text-foreground">{powerPlantDist}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground font-medium flex items-center gap-1.5">
                  <Route className="h-3.5 w-3.5 text-emerald-400" />
                  Road Connectivity
                </span>
                <span className="font-semibold text-foreground">{roadConn}</span>
              </div>
            </CardContent>
          </Card>

          {/* EXPANDED SECTION 4: Environmental Risk & AI Suitability Score */}
          <Card className="rounded-2xl border-purple-500/30 bg-purple-500/5 dark:bg-purple-500/10 shadow-sm">
            <CardHeader className="py-3 px-4 border-b border-purple-500/20">
              <CardTitle className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Brain className="h-4 w-4 text-purple-500" />
                  Suitability & Environmental Risk
                </span>
                <span className="text-sm font-extrabold text-emerald-500">{suitabilityScore}%</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground font-medium">Suitability Score</span>
                  <span className="font-bold text-foreground">{suitabilityScore}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${suitabilityScore}%` }}
                    transition={{ duration: 1 }}
                    className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground font-medium">Environmental Risk Assessment</span>
                  <span className={`font-bold ${envRisk.includes('Low') ? 'text-emerald-500' : 'text-amber-500'}`}>
                    {envRisk}
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: envRisk.includes('Low') ? '30%' : '65%' }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className={`h-full rounded-full ${envRisk.includes('Low') ? 'bg-emerald-500' : 'bg-amber-500'}`}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* REQUIRED BUTTONS: Generate Report, AI Insights, Compare Site, Download Report */}
          <div className="grid grid-cols-2 gap-2 pb-4">
            <Button
              onClick={() => onShowToast && onShowToast('Generate Report', `Generating feasibility PDF for ${mine.mine_name}...`)}
              className="col-span-2 rounded-xl text-xs font-bold py-5 shadow-lg gap-2"
            >
              <FileText className="h-4 w-4" />
              Generate Feasibility Report
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onShowToast && onShowToast('AI Insights', `Running AI site simulation for ${mine.mine_name}...`)}
              className="rounded-xl text-xs font-semibold py-4 border-border/80 flex items-center justify-center gap-1.5"
            >
              <Sparkles className="h-3.5 w-3.5 text-purple-500" />
              AI Insights
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onShowToast && onShowToast('Compare Site', `${mine.mine_name} added to site comparison matrix.`)}
              className="rounded-xl text-xs font-semibold py-4 border-border/80 flex items-center justify-center gap-1.5"
            >
              <Scale className="h-3.5 w-3.5 text-amber-500" />
              Compare Site
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onShowToast && onShowToast('Download Report', `Downloading datasheet for ${mine.mine_name}...`)}
              className="col-span-2 rounded-xl text-xs font-semibold py-4 border-border/80 flex items-center justify-center gap-1.5"
            >
              <Download className="h-3.5 w-3.5 text-emerald-500" />
              Download Report
            </Button>
          </div>
        </motion.div>
      </SheetContent>
    </Sheet>
  );
};
