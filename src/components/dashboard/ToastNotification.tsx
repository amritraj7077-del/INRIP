import { motion, AnimatePresence } from 'framer-motion';
import { Info, CheckCircle2, AlertCircle, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: 'info' | 'success' | 'warning';
}

interface ToastNotificationProps {
  toast: ToastMessage | null;
  onClose: () => void;
}

export const ToastNotification = ({ toast, onClose }: ToastNotificationProps) => {
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed top-20 right-6 z-[100] max-w-sm w-full"
        >
          <div className="bg-slate-900/95 text-slate-100 dark:bg-slate-900/95 dark:text-slate-100 border border-slate-700/80 rounded-xl p-4 shadow-2xl backdrop-blur-md flex items-start gap-3">
            {toast.type === 'success' ? (
              <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
            ) : toast.type === 'warning' ? (
              <AlertCircle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
            ) : (
              <Info className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
            )}
            <div className="flex-1">
              <h4 className="font-medium text-sm text-white">{toast.title}</h4>
              {toast.description && (
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">{toast.description}</p>
              )}
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-slate-800"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
