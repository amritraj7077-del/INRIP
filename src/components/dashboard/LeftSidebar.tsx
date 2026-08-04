import { useState } from 'react';
import { Search, Layers, Filter, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { motion, AnimatePresence } from 'framer-motion';

export const LeftSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [expandedSections, setExpandedSections] = useState({
    search: true,
    filters: true,
    layers: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <motion.aside
      initial={{ width: isExpanded ? 320 : 60 }}
      animate={{ width: isExpanded ? 320 : 60 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="h-full border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 overflow-hidden"
    >
      <div className="flex flex-col h-full">
        {/* Toggle Button */}
        <div className="p-2 border-b">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full"
          >
            {isExpanded ? <ChevronRight className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>

        <AnimatePresence mode="wait">
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 overflow-y-auto"
            >
              {/* Search Section */}
              <div className="p-4 border-b">
                <Button
                  variant="ghost"
                  onClick={() => toggleSection('search')}
                  className="w-full justify-between mb-3"
                >
                  <span className="flex items-center gap-2">
                    <Search className="h-4 w-4" />
                    <span className="font-medium">Search</span>
                  </span>
                  {expandedSections.search ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </Button>
                <AnimatePresence>
                  {expandedSections.search && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                    >
                      <Input placeholder="Search mines..." className="mb-2" />
                      <Input placeholder="Search minerals..." />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Filters Section */}
              <div className="p-4 border-b">
                <Button
                  variant="ghost"
                  onClick={() => toggleSection('filters')}
                  className="w-full justify-between mb-3"
                >
                  <span className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <span className="font-medium">Filters</span>
                  </span>
                  {expandedSections.filters ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </Button>
                <AnimatePresence>
                  {expandedSections.filters && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="space-y-3"
                    >
                      <div>
                        <label className="text-sm font-medium mb-2 block">Mineral Type</label>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary" className="cursor-pointer hover:bg-primary/20">Iron Ore</Badge>
                          <Badge variant="secondary" className="cursor-pointer hover:bg-primary/20">Copper</Badge>
                          <Badge variant="secondary" className="cursor-pointer hover:bg-primary/20">Gold</Badge>
                          <Badge variant="secondary" className="cursor-pointer hover:bg-primary/20">Bauxite</Badge>
                        </div>
                      </div>
                      <Separator />
                      <div>
                        <label className="text-sm font-medium mb-2 block">State</label>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary" className="cursor-pointer hover:bg-primary/20">Karnataka</Badge>
                          <Badge variant="secondary" className="cursor-pointer hover:bg-primary/20">Odisha</Badge>
                          <Badge variant="secondary" className="cursor-pointer hover:bg-primary/20">Jharkhand</Badge>
                          <Badge variant="secondary" className="cursor-pointer hover:bg-primary/20">Chhattisgarh</Badge>
                        </div>
                      </div>
                      <Separator />
                      <div>
                        <label className="text-sm font-medium mb-2 block">Status</label>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="default" className="cursor-pointer">Active</Badge>
                          <Badge variant="outline" className="cursor-pointer">Inactive</Badge>
                          <Badge variant="outline" className="cursor-pointer">Proposed</Badge>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Layers Section */}
              <div className="p-4">
                <Button
                  variant="ghost"
                  onClick={() => toggleSection('layers')}
                  className="w-full justify-between mb-3"
                >
                  <span className="flex items-center gap-2">
                    <Layers className="h-4 w-4" />
                    <span className="font-medium">Map Layers</span>
                  </span>
                  {expandedSections.layers ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </Button>
                <AnimatePresence>
                  {expandedSections.layers && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="space-y-2"
                    >
                      <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50 cursor-pointer">
                        <span className="text-sm">Satellite</span>
                        <div className="h-4 w-4 rounded border-2 border-primary bg-primary" />
                      </div>
                      <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50 cursor-pointer">
                        <span className="text-sm">Terrain</span>
                        <div className="h-4 w-4 rounded border-2 border-border" />
                      </div>
                      <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50 cursor-pointer">
                        <span className="text-sm">Streets</span>
                        <div className="h-4 w-4 rounded border-2 border-border" />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50 cursor-pointer">
                        <span className="text-sm">Mining Zones</span>
                        <div className="h-4 w-4 rounded border-2 border-primary bg-primary" />
                      </div>
                      <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50 cursor-pointer">
                        <span className="text-sm">Environmental</span>
                        <div className="h-4 w-4 rounded border-2 border-border" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.aside>
  );
};
