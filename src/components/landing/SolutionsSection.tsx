import { motion } from 'framer-motion';
import { Search, Brain, Sparkles, FileText, ChevronDown } from 'lucide-react';

export const SolutionsSection = () => {
  const steps = [
    {
      icon: Search,
      title: 'Search',
      description: 'Search and filter mine locations by mineral type, state, district, and more.',
    },
    {
      icon: Brain,
      title: 'Analyze',
      description: 'AI-powered analysis of site suitability, environmental impact, and commercial viability.',
    },
    {
      icon: Sparkles,
      title: 'AI Recommendation',
      description: 'Get intelligent recommendations for optimal site selection based on comprehensive data analysis.',
    },
    {
      icon: FileText,
      title: 'Generate Report',
      description: 'Generate comprehensive reports with AI recommendations and actionable insights.',
    },
  ];

  return (
    <section id="solutions" className="py-20 bg-gradient-to-b from-slate-50 to-white dark:from-slate-800 dark:to-slate-900">
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
            How It Works
          </motion.h2>
          <motion.p 
            className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Simple, intelligent workflow for mineral exploration
          </motion.p>
        </motion.div>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-brand-yellow via-sky-500 to-emerald-500 transform -translate-y-1/2 z-0" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -10 }}
                className="relative"
              >
                <motion.div 
                  className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl border border-slate-200 dark:border-slate-700 hover:shadow-2xl transition-shadow"
                  whileHover={{ borderColor: '#FFD54A', boxShadow: "0 25px 50px rgba(0,0,0,0.15)" }}
                >
                  {/* Step Number */}
                  <motion.div 
                    className="absolute -top-4 -left-4 w-12 h-12 bg-brand-yellow rounded-full flex items-center justify-center text-slate-900 font-black text-xl shadow-lg"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                  >
                    {index + 1}
                  </motion.div>

                  {/* Icon */}
                  <motion.div 
                    className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 rounded-2xl flex items-center justify-center mb-6 mx-auto"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <step.icon className="h-8 w-8 text-brand-yellow" />
                  </motion.div>

                  <motion.h3 
                    className="text-2xl font-bold text-slate-900 dark:text-white mb-3 text-center"
                    whileHover={{ x: 3 }}
                  >
                    {step.title}
                  </motion.h3>
                  <motion.p 
                    className="text-slate-600 dark:text-slate-400 text-center"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {step.description}
                  </motion.p>
                </motion.div>

                {/* Arrow Down for Mobile */}
                {index < steps.length - 1 && (
                  <motion.div 
                    className="lg:hidden flex justify-center py-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ChevronDown className="h-8 w-8 text-brand-yellow" />
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
