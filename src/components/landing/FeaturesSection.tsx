import { motion } from 'framer-motion';
import { Map, Sparkles, Layers, Globe, Database, FileText, Search, BarChart3, Zap, Download } from 'lucide-react';

export const FeaturesSection = () => {
  const features = [
    {
      icon: Map,
      title: 'Interactive GIS Dashboard',
      description: 'Explore mine locations with an intuitive, real-time GIS dashboard.',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Sparkles,
      title: 'AI Site Screening',
      description: 'AI-powered site screening for optimal mine location selection.',
      color: 'from-amber-500 to-amber-600',
    },
    {
      icon: Globe,
      title: 'Satellite Analysis',
      description: 'Integrate satellite imagery for comprehensive land analysis.',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: Layers,
      title: 'Multi Layer GIS',
      description: 'Overlay multiple GIS layers for advanced spatial analysis.',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: Database,
      title: 'Mineral Intelligence',
      description: 'Access comprehensive mineral data and geological information.',
      color: 'from-red-500 to-red-600',
    },
    {
      icon: BarChart3,
      title: 'Heatmaps',
      description: 'Visualize mineral distribution with interactive heatmaps.',
      color: 'from-orange-500 to-orange-600',
    },
    {
      icon: FileText,
      title: 'AI Report Generation',
      description: 'Generate detailed feasibility reports with AI assistance.',
      color: 'from-cyan-500 to-cyan-600',
    },
    {
      icon: Search,
      title: 'Search & Filtering',
      description: 'Advanced search and filtering for quick data access.',
      color: 'from-indigo-500 to-indigo-600',
    },
    {
      icon: Zap,
      title: 'Real Time Analytics',
      description: 'Monitor real-time data with live analytics dashboards.',
      color: 'from-yellow-500 to-yellow-600',
    },
    {
      icon: Download,
      title: 'PDF Export',
      description: 'Export reports and data in multiple formats including PDF.',
      color: 'from-pink-500 to-pink-600',
    },
  ];

  return (
    <section id="features" className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
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
            Powerful Features
          </motion.h2>
          <motion.p 
            className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Everything you need to revolutionize mineral exploration and analysis
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group"
            >
              <motion.div 
                className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 h-full border border-slate-200 dark:border-slate-700 hover:border-brand-yellow dark:hover:border-brand-yellow transition-all hover:shadow-xl"
                whileHover={{ boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
              >
                <motion.div 
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  whileHover={{ rotate: 5 }}
                >
                  <feature.icon className="h-7 w-7 text-white" />
                </motion.div>
                <motion.h3 
                  className="text-xl font-bold text-slate-900 dark:text-white mb-2"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  {feature.title}
                </motion.h3>
                <motion.p 
                  className="text-slate-600 dark:text-slate-400"
                  initial={{ opacity: 0.7 }}
                  whileHover={{ opacity: 1 }}
                >
                  {feature.description}
                </motion.p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
