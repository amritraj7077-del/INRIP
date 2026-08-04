import { motion } from 'framer-motion';
import { Check, Zap, Shield, Crown } from 'lucide-react';

export const PricingSection = () => {
  const plans = [
    {
      name: 'Starter',
      icon: Zap,
      price: 'Free',
      description: 'Perfect for individual researchers',
      features: [
        'Basic GIS Dashboard',
        '500 Mine Sites',
        'Standard Layers',
        'Email Support',
      ],
      popular: false,
    },
    {
      name: 'Professional',
      icon: Shield,
      price: '$49',
      period: '/month',
      description: 'For small to medium teams',
      features: [
        'Advanced GIS Dashboard',
        'All Mine Sites',
        'Premium Layers',
        'AI Site Screening',
        'Report Generation',
        'Priority Support',
      ],
      popular: true,
    },
    {
      name: 'Enterprise',
      icon: Crown,
      price: 'Custom',
      description: 'For large organizations',
      features: [
        'Full GIS Platform',
        'Unlimited Mine Sites',
        'Custom Layers',
        'AI Site Screening',
        'Report Generation',
        'API Access',
        'Dedicated Support',
        'Custom Integration',
      ],
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-white dark:bg-slate-900">
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
            Simple, Transparent Pricing
          </motion.h2>
          <motion.p 
            className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Choose the plan that fits your needs
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -10, scale: plan.popular ? 1.05 : 1.02 }}
              className={`relative rounded-3xl p-8 ${
                plan.popular
                  ? 'bg-gradient-to-b from-brand-yellow to-amber-500 shadow-2xl scale-105'
                  : 'bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {plan.popular && (
                <motion.div 
                  className="absolute -top-4 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-4 py-1 rounded-full text-sm font-bold"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  Most Popular
                </motion.div>
              )}

              <div className="flex items-center justify-center gap-3 mb-6">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  plan.popular ? 'bg-white/20' : 'bg-white dark:bg-slate-700'
                }`}>
                  <plan.icon className={`h-6 w-6 ${plan.popular ? 'text-slate-900' : 'text-brand-yellow'}`} />
                </div>
                <h3 className={`text-2xl font-bold ${plan.popular ? 'text-slate-900' : 'text-slate-900 dark:text-white'}`}>
                  {plan.name}
                </h3>
              </div>

              <div className="text-center mb-6">
                <div className={`text-4xl font-black ${plan.popular ? 'text-slate-900' : 'text-slate-900 dark:text-white'}`}>
                  {plan.price}
                </div>
                {plan.period && (
                  <div className={`text-sm ${plan.popular ? 'text-slate-800' : 'text-slate-600 dark:text-slate-400'}`}>
                    {plan.period}
                  </div>
                )}
                <p className={`text-sm mt-2 ${plan.popular ? 'text-slate-800' : 'text-slate-600 dark:text-slate-400'}`}>
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check className={`h-5 w-5 ${plan.popular ? 'text-slate-900' : 'text-brand-yellow'}`} />
                    <span className={`text-sm ${plan.popular ? 'text-slate-900' : 'text-slate-600 dark:text-slate-400'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-3 rounded-xl font-bold transition-all ${
                  plan.popular
                    ? 'bg-slate-900 text-white hover:bg-slate-800'
                    : 'bg-brand-yellow text-slate-900 hover:bg-brand-yellowHover'
                }`}
              >
                Get Started
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
