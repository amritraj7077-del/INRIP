import { motion } from 'framer-motion';
import { Database, Globe, Map, Layers, Building, CheckCircle } from 'lucide-react';

export const TrustedDataSources = () => {
  const dataSources = [
    {
      name: 'Indian Bureau of Mines',
      icon: Building,
      description: 'Official mineral production and consumption data',
      official: true,
    },
    {
      name: 'Geological Survey of India',
      icon: Layers,
      description: 'Geological maps and mineral resource assessments',
      official: true,
    },
    {
      name: 'National Geoscience Data Repository',
      icon: Database,
      description: 'Comprehensive geoscience data and publications',
      official: true,
    },
    {
      name: 'ISRO Bhuvan',
      icon: Globe,
      description: 'Satellite imagery and remote sensing data',
      official: true,
    },
    {
      name: 'India-WRIS',
      icon: Map,
      description: 'Water resources information system data',
      official: true,
    },
    {
      name: 'Ministry of Coal',
      icon: Building,
      description: 'Coal production and distribution statistics',
      official: true,
    },
    {
      name: 'OpenStreetMap',
      icon: Map,
      description: 'Open-source mapping and geographic data',
      official: false,
    },
    {
      name: 'MapTiler',
      icon: Globe,
      description: 'High-quality map tiles and geospatial services',
      official: false,
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white dark:from-slate-800 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Trusted Data Sources
          </motion.h2>
          <motion.p
            className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Powered by authoritative government databases and leading geospatial platforms
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dataSources.map((source, index) => (
            <motion.div
              key={source.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative"
            >
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 h-full hover:shadow-xl transition-shadow">
                {source.official && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.08 }}
                    className="absolute -top-3 -right-3 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1"
                  >
                    <CheckCircle className="h-3 w-3" />
                    Official
                  </motion.div>
                )}
                <motion.div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${
                    source.official
                      ? 'bg-brand-yellow'
                      : 'bg-slate-100 dark:bg-slate-700'
                  }`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <source.icon
                    className={`h-7 w-7 ${
                      source.official ? 'text-slate-900' : 'text-slate-600 dark:text-slate-300'
                    }`}
                  />
                </motion.div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {source.name}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {source.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
