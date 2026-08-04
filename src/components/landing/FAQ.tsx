import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'What is INRIP?',
      answer: 'INRIP (India Natural Resource Intelligence Platform) is an AI-powered GIS platform that unifies satellite imagery, geological data, mining datasets, and infrastructure information into one intelligent system for mineral exploration and feasibility analysis.',
    },
    {
      question: 'Which datasets are supported?',
      answer: 'INRIP integrates data from authoritative sources including the Indian Bureau of Mines, Geological Survey of India, National Geoscience Data Repository, ISRO Bhuvan, India-WRIS, Ministry of Coal, OpenStreetMap, and MapTiler.',
    },
    {
      question: 'How accurate are AI recommendations?',
      answer: 'Our AI models are trained on extensive geological and mining data, providing highly accurate suitability scores. However, recommendations should be used as decision support alongside expert analysis and field verification.',
    },
    {
      question: 'Can reports be exported?',
      answer: 'Yes, INRIP allows you to generate comprehensive feasibility reports with AI recommendations, data visualizations, and actionable insights. Reports can be exported in multiple formats including PDF and Excel.',
    },
    {
      question: 'Which organizations can use INRIP?',
      answer: 'INRIP serves mining companies, government agencies, renewable energy developers, infrastructure projects, environmental consultants, and research institutions requiring geospatial intelligence.',
    },
    {
      question: 'How secure is the platform?',
      answer: 'INRIP employs enterprise-grade security including data encryption, secure authentication, role-based access control, and compliance with data protection regulations. Your data remains confidential and secure.',
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            className="text-lg text-slate-600 dark:text-slate-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Everything you need to know about INRIP
          </motion.p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.question}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 hover:border-brand-yellow transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-base font-bold text-slate-900 dark:text-white pr-8">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    {openIndex === index ? (
                      <ChevronUp className="h-5 w-5 text-brand-yellow" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-slate-400" />
                    )}
                  </motion.div>
                </div>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700"
                    >
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
