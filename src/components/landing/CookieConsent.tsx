import { motion, AnimatePresence } from 'framer-motion';
import { X, Cookie, Settings } from 'lucide-react';
import { useState, useEffect } from 'react';

export const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    setIsVisible(false);
  };

  const handleManagePreferences = () => {
    setShowPreferences(true);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 shadow-2xl"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-4 flex-1">
              <motion.div
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="flex-shrink-0"
              >
                <Cookie className="h-6 w-6 text-brand-yellow" />
              </motion.div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                  Cookie Preferences
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  We use cookies to enhance your experience. By continuing, you agree to our use of cookies.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleManagePreferences}
                className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-2"
              >
                <Settings className="h-4 w-4" />
                Preferences
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleReject}
                className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                Reject
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAccept}
                className="px-6 py-2 bg-brand-yellow hover:bg-brand-yellowHover text-slate-900 font-bold text-sm rounded-xl transition-colors"
              >
                Accept
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Preferences Modal */}
      <AnimatePresence>
        {showPreferences && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4"
            onClick={() => setShowPreferences(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Cookie Preferences
                </h3>
                <button
                  onClick={() => setShowPreferences(false)}
                  className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                >
                  <X className="h-4 w-4 text-slate-600 dark:text-slate-300" />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700 rounded-xl">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Essential Cookies</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Required for basic functionality</p>
                  </div>
                  <div className="w-12 h-6 bg-brand-yellow rounded-full relative">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow" />
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700 rounded-xl">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Analytics Cookies</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Help us improve our services</p>
                  </div>
                  <div className="w-12 h-6 bg-slate-300 dark:bg-slate-600 rounded-full relative cursor-pointer">
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow" />
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700 rounded-xl">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Marketing Cookies</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Personalized content and ads</p>
                  </div>
                  <div className="w-12 h-6 bg-slate-300 dark:bg-slate-600 rounded-full relative cursor-pointer">
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow" />
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    handleAccept();
                    setShowPreferences(false);
                  }}
                  className="flex-1 px-4 py-3 bg-brand-yellow hover:bg-brand-yellowHover text-slate-900 font-bold rounded-xl transition-colors"
                >
                  Save Preferences
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatePresence>
  );
};
