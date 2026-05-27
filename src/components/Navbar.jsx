import React, { useState, useEffect } from 'react';
import { Menu, X, Cpu, ShieldAlert, Database, ChevronRight } from 'lucide-react';

export default function Navbar({ activePortal, setActivePortal, onPurchaseClick }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', type: 'scroll', target: 'hero' },
    { name: 'Features', type: 'scroll', target: 'features' },
    { name: 'How It Works', type: 'scroll', target: 'roadmap' },
    { name: 'Pricing', type: 'scroll', target: 'pricing' },
    { name: 'Resale Portal', type: 'portal', target: 'resale' },
    { name: 'Operator Console', type: 'portal', target: 'operator' },
  ];

  const handleLinkClick = (link) => {
    setIsMobileMenuOpen(false);
    
    if (link.type === 'portal') {
      setActivePortal(link.target);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setActivePortal('landing');
      setTimeout(() => {
        const element = document.getElementById(link.target);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 50);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'py-3.5 bg-[#08080c]/85 backdrop-blur-md border-b border-zinc-800/80 shadow-[0_4px_30px_rgba(0,0,0,0.4)]'
          : 'py-5 bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => handleLinkClick({ type: 'portal', target: 'landing' })}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="p-2 bg-green-500/10 rounded-lg border border-green-500/30 text-green-500 group-hover:shadow-[0_0_15px_rgba(34,197,94,0.4)] transition-all duration-300">
            <Cpu size={20} className="group-hover:rotate-90 transition-transform duration-500" />
          </div>
          <div>
            <span className="text-lg font-black tracking-wider text-white uppercase flex items-center gap-1.5 font-mono">
              FLASHER<span className="text-green-500">.</span>
            </span>
            <span className="block text-[8px] text-zinc-500 tracking-widest uppercase -mt-0.5">Crypto Transfer Node</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-1.5 p-1 rounded-full bg-zinc-950/40 border border-zinc-850/60 backdrop-blur-sm">
          {navLinks.map((link) => {
            const isSelected = 
              (link.target === 'landing' && activePortal === 'landing') || 
              (link.type === 'portal' && activePortal === link.target) ||
              (link.type === 'scroll' && activePortal === 'landing');

            return (
              <button
                key={link.name}
                onClick={() => handleLinkClick(link)}
                className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide uppercase transition-all duration-300 cursor-pointer
                  ${isSelected
                    ? 'bg-green-500/10 text-green-400 border border-green-500/20 shadow-[inset_0_0_8px_rgba(34,197,94,0.15)] font-bold'
                    : 'text-zinc-400 hover:text-white border border-transparent'
                  }`}
              >
                {link.name}
              </button>
            );
          })}
        </div>

        {/* Launch Node App Button */}
        <div className="hidden lg:flex items-center gap-4">
          <button
            onClick={onPurchaseClick}
            className="px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-black shadow-[0_0_15px_rgba(34,197,94,0.3)] hover:shadow-[0_0_25px_rgba(34,197,94,0.5)] transition-all duration-300 cursor-pointer transform hover:-translate-y-0.5"
          >
            Launch app
          </button>
        </div>

        {/* Mobile Hamburger toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-[#08080c] border-b border-zinc-800 shadow-2xl p-6 flex flex-col gap-4 animate-fade-in scanline">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isSelected = 
                (link.type === 'portal' && activePortal === link.target) ||
                (link.type === 'scroll' && activePortal === 'landing');

              return (
                <button
                  key={link.name}
                  onClick={() => handleLinkClick(link)}
                  className={`w-full text-left px-5 py-3 rounded-xl text-sm font-medium tracking-wide uppercase transition-all duration-300 flex items-center justify-between cursor-pointer
                    ${isSelected
                      ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                      : 'text-zinc-400 hover:bg-zinc-900/40 hover:text-white'
                    }`}
                >
                  <span>{link.name}</span>
                  <ChevronRight size={14} className={isSelected ? 'text-green-400' : 'text-zinc-600'} />
                </button>
              );
            })}
          </div>

          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onPurchaseClick();
            }}
            className="w-full mt-2 py-3 rounded-xl font-bold uppercase tracking-wider text-xs bg-gradient-to-r from-green-500 to-emerald-500 text-black text-center shadow-[0_0_15px_rgba(34,197,94,0.2)]"
          >
            Launch App
          </button>
        </div>
      )}
    </nav>
  );
}
