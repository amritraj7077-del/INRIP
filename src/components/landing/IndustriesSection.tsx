import { motion } from 'framer-motion';
import { Building2, Building, Zap, Factory, Leaf, GraduationCap, ArrowRight } from 'lucide-react';

export const IndustriesSection = () => {
  const industries = [
    {
      icon: Building2,
      title: 'Mining Companies',
      description: 'Streamline exploration and resource assessment with unified GIS data',
    },
    {
      icon: Building,
      title: 'Government Agencies',
      description: 'Access comprehensive mineral data for policy and planning decisions',
    },
    {
      icon: Zap,
      title: 'Renewable Energy',
      description: 'Identify optimal sites for solar, wind, and hydroelectric projects',
    },
    {
      icon: Factory,
      title: 'Infrastructure',
      description: 'Assess geological conditions for roads, railways, and construction',
    },
    {
      icon: Leaf,
      title: 'Environmental Consultants',
      description: 'Conduct rapid environmental impact assessments with AI insights',
    },
    {
      icon: GraduationCap,
      title: 'Research Institutions',
      description: 'Access rich datasets for academic research and publications',
    },
  ];

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-800">
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
            Industries We Serve
          </motion.h2>
          <motion.p
            className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Empowering diverse sectors with intelligent geospatial solutions
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8 }}
            >
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 h-full hover:shadow-xl transition-shadow">
                <motion.div
                  className="w-14 h-14 bg-brand-yellow rounded-xl flex items-center justify-center mb-4"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <industry.icon className="h-7 w-7 text-slate-900" />
                </motion.div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {industry.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                  {industry.description}
                </p>
                <motion.button
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className="text-sm font-bold text-brand-yellow flex items-center gap-1 group"
                >
                  Learn More
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
