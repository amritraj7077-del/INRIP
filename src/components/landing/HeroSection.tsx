import { motion } from 'framer-motion';
import { Map, Sparkles, ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  onLaunchDashboard: () => void;
  onRequestDemo: () => void;
}

export const HeroSection = ({ onLaunchDashboard, onRequestDemo }: HeroSectionProps) => {
  const stats = [
    { value: '1200+', label: 'Mine Sites' },
    { value: '24+', label: 'Minerals' },
    { value: '28', label: 'States' },
    { value: '98%', label: 'AI Accuracy' },
    { value: '10+', label: 'GIS Layers' },
  ];

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-16 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.h1 
                className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                India's AI Powered
                <motion.span 
                  className="block text-brand-yellow"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  Natural Resource Intelligence
                </motion.span>
                <motion.span 
                  className="block text-3xl sm:text-4xl lg:text-5xl"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  Platform
                </motion.span>
              </motion.h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl"
            >
              Unify satellite imagery, geological data, mining datasets and AI into one intelligent GIS platform for exploration and feasibility analysis.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={onLaunchDashboard}
                className="px-8 py-4 bg-brand-yellow hover:bg-brand-yellowHover text-slate-900 font-bold text-base rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
              >
                <Map className="h-5 w-5" />
                Launch GIS Dashboard
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={onRequestDemo}
                className="px-8 py-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 hover:border-brand-yellow text-slate-700 dark:text-slate-300 font-bold text-base rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="h-5 w-5 text-brand-yellow" />
                Request Demo
              </motion.button>
            </motion.div>

            {/* Statistics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-3 sm:grid-cols-5 gap-4 pt-8"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  transition={{ duration: 0.4, delay: 1 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="text-center cursor-default"
                >
                  <motion.div 
                    className="text-2xl sm:text-3xl font-black text-brand-yellow"
                    whileHover={{ color: '#F59E0B' }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Background gradient */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-brand-yellow/20 to-amber-600/20 rounded-3xl blur-3xl"
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              
              {/* Main card */}
              <motion.div 
                className="relative bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 p-8 h-full flex flex-col items-center justify-center"
                whileHover={{ scale: 1.02, rotateY: 5 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-32 h-32 bg-gradient-to-br from-brand-yellow to-amber-600 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-xl cursor-pointer"
                >
                  <span className="text-white font-black text-4xl font-bold">IN</span>
                </motion.div>
                
                <div className="text-center space-y-2">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">INRIP</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Natural Resource Intelligence</p>
                </div>

                {/* Floating elements */}
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  className="absolute top-10 right-10 w-16 h-16 bg-gradient-to-br from-sky-400 to-sky-600 rounded-2xl flex items-center justify-center shadow-lg cursor-pointer"
                >
                  <Map className="h-8 w-8 text-white" />
                </motion.div>

                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  whileHover={{ scale: 1.2, rotate: -10 }}
                  className="absolute bottom-10 left-10 w-14 h-14 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg cursor-pointer"
                >
                  <Sparkles className="h-7 w-7 text-white" />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
