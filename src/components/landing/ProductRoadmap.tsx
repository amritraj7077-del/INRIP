import { motion } from 'framer-motion';
import { ChevronDown, CheckCircle2, Circle } from 'lucide-react';

export const ProductRoadmap = () => {
  const phases = [
    {
      phase: 'Phase 1',
      title: 'MVP',
      description: 'Interactive GIS Dashboard',
      status: 'completed',
    },
    {
      phase: 'Phase 2',
      title: 'Mineral Database',
      description: 'Real-time spatial intelligence',
      status: 'completed',
    },
    {
      phase: 'Phase 3',
      title: 'AI Reports',
      description: 'Automated feasibility analysis',
      status: 'in-progress',
    },
    {
      phase: 'Phase 4',
      title: 'Predictive Analytics',
      description: 'Forecasting and optimization',
      status: 'upcoming',
    },
    {
      phase: 'Phase 5',
      title: 'Enterprise Platform',
      description: 'API integration, collaboration, enterprise security',
      status: 'upcoming',
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-slate-900 overflow-hidden">
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
            Product Roadmap
          </motion.h2>
          <motion.p
            className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Our journey to revolutionize mineral exploration
          </motion.p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-slate-200 dark:bg-slate-700 -translate-y-1/2" />

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            {phases.map((phase, index) => (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                {/* Phase Card */}
                <div
                  className={`relative bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 border-2 ${
                    phase.status === 'completed'
                      ? 'border-emerald-500'
                      : phase.status === 'in-progress'
                      ? 'border-brand-yellow'
                      : 'border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {/* Status Icon */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    {phase.status === 'completed' ? (
                      <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                        <CheckCircle2 className="h-5 w-5 text-white" />
                      </div>
                    ) : phase.status === 'in-progress' ? (
                      <div className="w-8 h-8 bg-brand-yellow rounded-full flex items-center justify-center shadow-lg animate-pulse">
                        <Circle className="h-5 w-5 text-slate-900 fill-current" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 bg-slate-300 dark:bg-slate-600 rounded-full flex items-center justify-center shadow-lg">
                        <Circle className="h-5 w-5 text-white" />
                      </div>
                    )}
                  </div>

                  <div className="pt-4 text-center">
                    <span
                      className={`text-xs font-bold uppercase tracking-wider ${
                        phase.status === 'completed'
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : phase.status === 'in-progress'
                          ? 'text-brand-yellow'
                          : 'text-slate-500'
                      }`}
                    >
                      {phase.phase}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-2 mb-1">
                      {phase.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {phase.description}
                    </p>
                  </div>
                </div>

                {/* Arrow for desktop */}
                {index < phases.length - 1 && (
                  <motion.div
                    className="hidden lg:flex absolute top-1/2 -right-4 -translate-y-1/2 z-10"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                  >
                    <ChevronDown className="h-6 w-6 text-slate-400 rotate-90" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
