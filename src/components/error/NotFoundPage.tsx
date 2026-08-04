import { motion } from 'framer-motion';
import { Home } from 'lucide-react';

interface NotFoundPageProps {
  onBackToHome: () => void;
}

export const NotFoundPage = ({ onBackToHome }: NotFoundPageProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-md"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <h1 className="text-9xl font-black text-brand-yellow mb-4">404</h1>
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-3xl font-bold text-slate-900 dark:text-white mb-4"
        >
          Page Not Found
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-slate-600 dark:text-slate-400 mb-8"
        >
          Oops! The page you're looking for doesn't exist or has been moved.
        </motion.p>
        
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 px-6 py-3 bg-brand-yellow hover:bg-brand-yellowHover text-slate-900 font-bold rounded-xl transition-colors"
        >
          <Home className="h-5 w-5" />
          Back to Home
        </motion.button>
      </motion.div>
    </div>
  );
};
