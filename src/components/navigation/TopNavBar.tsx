import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export type ActiveView = 'landing' | 'dashboard' | 'reports' | 'projects' | 'about' | 'contact' | 'profile';

interface TopNavBarProps {
  activeView: ActiveView;
  onSelectView: (view: ActiveView) => void;
  onOpenSearch: () => void;
  onExploreDashboard: () => void;
  onShowToast: (title: string, description?: string) => void;
}

export const TopNavBar = ({
  activeView,
  onSelectView,
  onExploreDashboard,
}: TopNavBarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string, label: string) => {
    setActiveSection(label);
    if (activeView !== 'landing') {
      onSelectView('landing');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { label: 'Home', sectionId: 'hero' },
    { label: 'Features', sectionId: 'platform-features' },
    { label: 'Solutions', sectionId: 'solutions' },
    { label: 'Pricing', sectionId: 'pricing' },
    { label: 'About', sectionId: 'why-inrip' },
    { label: 'Contact', sectionId: 'contact' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full h-[72px] bg-[#FFFFFF] border-b border-[#ECECEC] transition-shadow duration-300 ${
        isScrolled ? 'shadow-sm' : ''
      }`}
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        
        {/* Left Side: Logo & Menu Wrapper */}
        <div className="flex items-center">
          {/* Logo */}
          <div
            onClick={() => scrollToSection('hero', 'Home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            {/* 42px Logo Mark */}
            <div className="h-[42px] w-[42px] rounded-xl bg-[#111827] flex items-center justify-center shadow-sm">
              <span className="text-[#FFD54A] font-black text-xl">IN</span>
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-bold text-[20px] text-[#222222] leading-none tracking-tight mb-[2px]">
                INRIP
              </span>
              <span className="text-[10px] text-[#6B7280] font-medium leading-none tracking-wide">
                Natural Resource Intelligence
              </span>
            </div>
          </div>

          {/* Center Navigation (Hidden on small, visible on Desktop/Tablet) */}
          <nav className="hidden md:flex items-center ml-[80px] gap-[40px] h-[72px]">
            {navLinks.map((link) => {
              const isActive = activeSection === link.label;
              return (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.sectionId, link.label)}
                  className={`relative h-full flex items-center text-[16px] transition-colors duration-300 ${
                    isActive ? 'font-bold text-[#222222]' : 'font-medium text-[#222222] hover:text-[#FFD54A]'
                  }`}
                >
                  {link.label}
                  {/* Yellow Underline Animation */}
                  <span
                    className={`absolute bottom-[-1px] left-0 w-full h-[3px] bg-[#FFD54A] rounded-t-full transition-all duration-300 transform origin-left ${
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right Side: Buttons */}
        <div className="hidden md:flex items-center gap-[16px]">
          {/* Primary Button */}
          <button
            onClick={onExploreDashboard}
            className="h-[48px] px-[28px] rounded-[14px] bg-[#FFD54A] text-black font-semibold text-[16px] hover:-translate-y-[2px] hover:shadow-md transition-all duration-300"
          >
            Launch GIS Dashboard
          </button>
        </div>

        {/* Mobile Hamburger Trigger */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 text-[#222222] hover:text-[#FFD54A] transition-colors"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Slide-in Menu */}
      <div
        className={`fixed inset-0 z-[60] bg-black/20 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div
          className={`absolute top-0 right-0 h-full w-[280px] bg-[#FFFFFF] shadow-2xl transition-transform duration-300 ease-in-out transform ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 flex items-center justify-between border-b border-[#ECECEC]">
            <span className="font-bold text-[18px] text-[#222222]">Menu</span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-[#6B7280] hover:text-[#222222] transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="p-6 flex flex-col gap-6">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => {
                const isActive = activeSection === link.label;
                return (
                  <button
                    key={link.label}
                    onClick={() => scrollToSection(link.sectionId, link.label)}
                    className={`text-left text-[16px] transition-colors duration-300 ${
                      isActive ? 'font-bold text-[#FFD54A]' : 'font-medium text-[#222222]'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </nav>

            <div className="h-[1px] w-full bg-[#ECECEC]" />

            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  onExploreDashboard();
                  setMobileMenuOpen(false);
                }}
                className="h-[48px] w-full rounded-[14px] bg-[#FFD54A] text-black font-semibold text-[16px] shadow-sm"
              >
                Launch GIS Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
