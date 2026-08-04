import { motion } from 'framer-motion';
import { Target, Eye, Code } from 'lucide-react';

export const AboutSection = () => {
  const techStack = [
    'React',
    'TypeScript',
    'MapLibre GL',
    'MapTiler',
    'Supabase',
    'Tailwind CSS',
    'Framer Motion',
    'Node.js',
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
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
            About INRIP
          </motion.h2>
          <motion.p 
            className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Transforming mineral exploration with AI-powered intelligence
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -5 }}
          >
            <motion.div 
              className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl border border-slate-200 dark:border-slate-700"
              whileHover={{ boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
            >
              <motion.div 
                className="w-14 h-14 bg-gradient-to-br from-brand-yellow to-amber-500 rounded-xl flex items-center justify-center mb-6"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Target className="h-7 w-7 text-white" />
              </motion.div>
              <motion.h3 
                className="text-2xl font-bold text-slate-900 dark:text-white mb-4"
                whileHover={{ x: 3 }}
              >
                Our Mission
              </motion.h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                To democratize access to mineral exploration intelligence by providing AI-powered tools that help researchers, companies, and governments make data-driven decisions about mining sites and resource allocation.
              </p>
            </motion.div>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -5 }}
          >
            <motion.div 
              className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl border border-slate-200 dark:border-slate-700"
              whileHover={{ boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
            >
              <motion.div 
                className="w-14 h-14 bg-gradient-to-br from-sky-500 to-sky-600 rounded-xl flex items-center justify-center mb-6"
                whileHover={{ scale: 1.1, rotate: -5 }}
              >
                <Eye className="h-7 w-7 text-white" />
              </motion.div>
              <motion.h3 
                className="text-2xl font-bold text-slate-900 dark:text-white mb-4"
                whileHover={{ x: 3 }}
              >
                Our Vision
              </motion.h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                To become the world's leading platform for natural resource intelligence, enabling sustainable and efficient mineral exploration through cutting-edge AI and GIS technology.
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Technology Stack */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div 
            className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl border border-slate-200 dark:border-slate-700"
            whileHover={{ boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
          >
            <div className="flex items-center gap-3 mb-6">
              <motion.div 
                className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 10 }}
              >
                <Code className="h-7 w-7 text-white" />
              </motion.div>
              <motion.h3 
                className="text-2xl font-bold text-slate-900 dark:text-white"
                whileHover={{ x: 3 }}
              >
                Technology Stack
              </motion.h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {techStack.map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                  whileHover={{ scale: 1.1, y: -3 }}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-sm font-medium hover:bg-brand-yellow hover:text-slate-900 transition-colors cursor-default"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
