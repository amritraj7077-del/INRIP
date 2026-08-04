import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

export const Testimonials = () => {
  const testimonials = [
    {
      name: 'Dr. Rajesh Kumar',
      role: 'Mining Consultant',
      company: 'GeoTech Solutions',
      content: 'INRIP has transformed how we approach mineral exploration. The AI-powered analysis has reduced our site assessment time by 60%.',
      rating: 5,
    },
    {
      name: 'Priya Sharma',
      role: 'Environmental Planner',
      company: 'EcoVision India',
      content: 'The integrated environmental data layers help us make better decisions while ensuring compliance with regulations.',
      rating: 5,
    },
    {
      name: 'Amit Patel',
      role: 'GIS Analyst',
      company: 'Mineral Corp',
      content: 'Finally, a platform that brings together all the data sources we need. The interface is intuitive and powerful.',
      rating: 5,
    },
    {
      name: 'Sneha Reddy',
      role: 'Government Officer',
      company: 'Ministry of Mines',
      content: 'INRIP provides valuable insights for policy planning. The data accuracy and real-time updates are impressive.',
      rating: 5,
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
            What Our Users Say
          </motion.h2>
          <motion.p
            className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Trusted by professionals across industries
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8 }}
            >
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 h-full hover:shadow-xl transition-shadow">
                <Quote className="h-8 w-8 text-brand-yellow mb-4" />
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 flex-grow">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-brand-yellow text-brand-yellow" />
                  ))}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {testimonial.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center text-xs text-slate-400 mt-8"
        >
          * Sample testimonials for demonstration purposes
        </motion.p>
      </div>
    </section>
  );
};
