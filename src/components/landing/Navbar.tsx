import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface NavbarProps {
  onNavigate: (section: string) => void;
  onLogin: () => void;
  onRegister: () => void;
}

export const Navbar = ({ onNavigate, onLogin, onRegister }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { label: 'Home', section: 'hero' },
    { label: 'Features', section: 'features' },
    { label: 'Solutions', section: 'solutions' },
    { label: 'Pricing', section: 'pricing' },
    { label: 'About', section: 'about' },
    { label: 'Contact', section: 'contact' },
  ];

  const handleNavClick = (section: string) => {
    onNavigate(section);
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800" role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="flex items-center justify-between h-16"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Logo */}
          <motion.button
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => handleNavClick('hero')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            aria-label="INRIP Home"
            tabIndex={0}
          >
            <div className="w-9 h-9 bg-black dark:bg-white text-white dark:text-black font-bold rounded-lg flex items-center justify-center text-sm tracking-wider">
              IN
            </div>
            <div>
              <h1 className="font-bold text-slate-900 dark:text-white leading-tight text-base">INRIP</h1>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Natural Resource Intelligence</p>
            </div>
          </motion.button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8" role="menubar">
            {navItems.map((item, index) => (
              <motion.button
                key={item.section}
                onClick={() => handleNavClick(item.section)}
                className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-brand-yellow dark:hover:text-brand-yellow transition-colors"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                whileHover={{ y: -2 }}
                role="menuitem"
                tabIndex={0}
                aria-label={`Navigate to ${item.label}`}
              >
                {item.label}
              </motion.button>
            ))}
          </div>

          {/* Desktop Auth Buttons & Theme Toggle */}
          <div className="hidden md:flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              tabIndex={0}
            >
              {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </motion.button>
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={onLogin}
              className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
              aria-label="Login to your account"
              tabIndex={0}
            >
              Login
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={onRegister}
              className="px-4 py-2 bg-brand-yellow hover:bg-brand-yellowHover text-slate-900 font-bold text-sm rounded-xl transition-colors"
              aria-label="Create a new account"
              tabIndex={0}
            >
              Sign Up
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              tabIndex={0}
            >
              {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              tabIndex={0}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800"
            role="menu"
          >
            <div className="px-4 py-4 space-y-3">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.section}
                  onClick={() => handleNavClick(item.section)}
                  className="block w-full text-left px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  whileHover={{ x: 5 }}
                  role="menuitem"
                  tabIndex={0}
                  aria-label={`Navigate to ${item.label}`}
                >
                  {item.label}
                </motion.button>
              ))}
              <motion.div 
                className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <motion.button
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onLogin}
                  className="block w-full px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                  role="menuitem"
                  tabIndex={0}
                  aria-label="Login to your account"
                >
                  Login
                </motion.button>
                <motion.button
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onRegister}
                  className="block w-full px-3 py-2 bg-brand-yellow hover:bg-brand-yellowHover text-slate-900 font-bold text-sm rounded-lg transition-colors"
                  role="menuitem"
                  tabIndex={0}
                  aria-label="Create a new account"
                >
                  Sign Up
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
