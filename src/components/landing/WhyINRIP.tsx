import { motion } from 'framer-motion';
import { AlertTriangle, MapPin, Clock, Zap } from 'lucide-react';

export const WhyINRIP = () => {
  const problems = [
    {
      icon: AlertTriangle,
      title: 'Fragmented Resource Data',
      description: 'Government datasets are spread across multiple portals, making exploration slow and inefficient.',
    },
    {
      icon: MapPin,
      title: 'Manual GIS Analysis',
      description: 'Engineers manually combine satellite imagery, geological layers, and infrastructure data.',
    },
    {
      icon: Clock,
      title: 'Slow Decision Making',
      description: 'Site feasibility assessments can take days or weeks, delaying critical projects.',
    },
    {
      icon: Zap,
      title: 'AI-Powered Intelligence',
      description: 'INRIP combines GIS layers with AI to deliver faster, data-driven recommendations.',
      highlight: true,
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-slate-900">
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
            Why INRIP?
          </motion.h2>
          <motion.p
            className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Transforming mineral exploration with unified data and intelligent analysis
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div
                className={`h-full rounded-2xl p-6 border ${
                  problem.highlight
                    ? 'bg-gradient-to-br from-brand-yellow to-amber-500 border-brand-yellow shadow-xl'
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl'
                }`}
              >
                <motion.div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${
                    problem.highlight
                      ? 'bg-white/20'
                      : 'bg-slate-200 dark:bg-slate-700'
                  }`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <problem.icon
                    className={`h-7 w-7 ${
                      problem.highlight ? 'text-slate-900' : 'text-slate-600 dark:text-slate-300'
                    }`}
                  />
                </motion.div>
                <h3
                  className={`text-lg font-bold mb-2 ${
                    problem.highlight ? 'text-slate-900' : 'text-slate-900 dark:text-white'
                  }`}
                >
                  {problem.title}
                </h3>
                <p
                  className={`text-sm ${
                    problem.highlight ? 'text-slate-800' : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {problem.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
