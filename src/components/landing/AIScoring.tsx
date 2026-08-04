import { motion } from 'framer-motion';
import { Check, Info } from 'lucide-react';
import { useState } from 'react';

export const AIScoring = () => {
  const [hoveredScore, setHoveredScore] = useState<string | null>(null);

  const scores = [
    { name: 'Geological Suitability', value: 95, description: 'Based on rock composition and mineral richness' },
    { name: 'Infrastructure Access', value: 88, description: 'Proximity to roads, railways, and power' },
    { name: 'Mineral Potential', value: 92, description: 'Estimated resource quantity and quality' },
    { name: 'Environmental Risk', value: 85, description: 'Impact on local ecosystem and biodiversity' },
    { name: 'ESG Compliance', value: 90, description: 'Environmental, Social, and Governance factors' },
    { name: 'Investment Attractiveness', value: 87, description: 'ROI potential and market conditions' },
  ];

  const overallScore = Math.round(scores.reduce((acc, s) => acc + s.value, 0) / scores.length);

  return (
    <section className="py-20 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
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
            AI Suitability Scoring
          </motion.h2>
          <motion.p
            className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Comprehensive AI-powered analysis for informed decision making
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Overall Score */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center justify-center"
          >
            <div className="relative">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="w-48 h-48 rounded-full bg-gradient-to-br from-brand-yellow to-amber-500 flex items-center justify-center shadow-2xl"
              >
                <div className="text-center">
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="text-6xl font-black text-slate-900"
                  >
                    {overallScore}
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="text-sm font-bold text-slate-800"
                  >
                    / 100
                  </motion.div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white dark:bg-slate-800 px-6 py-2 rounded-full shadow-lg border border-slate-200 dark:border-slate-700"
              >
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  Overall AI Score
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* Score Breakdown */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            {scores.map((score, index) => (
              <motion.div
                key={score.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.08 }}
                className="relative"
                onMouseEnter={() => setHoveredScore(score.name)}
                onMouseLeave={() => setHoveredScore(null)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-500" />
                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                      {score.name}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-brand-yellow">{score.value}%</span>
                </div>
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${score.value}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full bg-gradient-to-r from-brand-yellow to-amber-500 rounded-full"
                  />
                </div>
                {hoveredScore === score.name && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full left-0 mt-2 bg-slate-900 text-white text-xs px-3 py-2 rounded-lg shadow-lg z-10 max-w-xs"
                  >
                    <div className="flex items-start gap-2">
                      <Info className="h-3 w-3 mt-0.5 flex-shrink-0" />
                      <p>{score.description}</p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
