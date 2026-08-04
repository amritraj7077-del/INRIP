import { motion } from 'framer-motion';
import { Lock, Home } from 'lucide-react';

interface UnauthorizedPageProps {
  onBackToHome: () => void;
}

export const UnauthorizedPage = ({ onBackToHome }: UnauthorizedPageProps) => {
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
          <div className="w-24 h-24 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="h-12 w-12 text-red-600 dark:text-red-400" />
          </div>
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-3xl font-bold text-slate-900 dark:text-white mb-4"
        >
          Access Denied
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-slate-600 dark:text-slate-400 mb-8"
        >
          You don't have permission to access this page. Please log in to continue.
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
