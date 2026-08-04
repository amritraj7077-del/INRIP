import { motion } from 'framer-motion';
import { X, Mail, Globe, ExternalLink, Share2 } from 'lucide-react';

export const Footer = () => {
  const footerLinks = {
    Product: ['Features', 'Pricing', 'API', 'Integrations'],
    Company: ['About', 'Blog', 'Careers', 'Contact'],
    Resources: ['Documentation', 'Help Center', 'Privacy', 'Terms'],
  };

  return (
    <footer className="bg-slate-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-brand-yellow text-slate-900 font-bold rounded-lg flex items-center justify-center text-sm tracking-wider">
                IN
              </div>
              <div>
                <h3 className="font-bold text-white leading-tight text-base">INRIP</h3>
                <p className="text-[10px] text-slate-400 font-medium">Natural Resource Intelligence</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm">
              India's AI-powered platform for mineral exploration and analysis.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-brand-yellow rounded-lg flex items-center justify-center transition-colors group">
                <Globe className="h-5 w-5 text-slate-400 group-hover:text-slate-900" />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-brand-yellow rounded-lg flex items-center justify-center transition-colors group">
                <X className="h-5 w-5 text-slate-400 group-hover:text-slate-900" />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-brand-yellow rounded-lg flex items-center justify-center transition-colors group">
                <Share2 className="h-5 w-5 text-slate-400 group-hover:text-slate-900" />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-brand-yellow rounded-lg flex items-center justify-center transition-colors group">
                <ExternalLink className="h-5 w-5 text-slate-400 group-hover:text-slate-900" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-bold text-white mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-slate-400 hover:text-brand-yellow transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-white mb-4">Stay Updated</h4>
            <p className="text-slate-400 text-sm mb-4">
              Subscribe to our newsletter for updates and insights.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-yellow text-sm"
              />
              <button className="px-4 py-2 bg-brand-yellow hover:bg-brand-yellowHover text-slate-900 font-bold rounded-lg transition-colors">
                <Mail className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm">
            © 2024 INRIP. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-slate-400 hover:text-brand-yellow transition-colors text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-slate-400 hover:text-brand-yellow transition-colors text-sm">
              Terms of Service
            </a>
            <a href="#" className="text-slate-400 hover:text-brand-yellow transition-colors text-sm">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
