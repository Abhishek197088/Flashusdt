import React from 'react';
import { Cpu, MessageCircle, HelpCircle, Shield } from 'lucide-react';

export default function Footer({ setActivePortal, onPurchaseClick }) {
  const handleLinkClick = (target) => {
    if (target === 'resale' || target === 'operator') {
      setActivePortal(target);
    } else {
      setActivePortal('landing');
      setTimeout(() => {
        const element = document.getElementById(target);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    }
  };

  return (
    <footer className="bg-black/50 border-t border-zinc-850 pt-16 pb-8 text-left select-none relative font-mono text-[10px]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          
          {/* Logo & Bio Info Column */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5 cursor-pointer w-fit" onClick={() => handleLinkClick('hero')}>
              <div className="p-2 bg-green-500/10 rounded-lg border border-green-500/30 text-green-400">
                <Cpu size={16} />
              </div>
              <span className="text-sm font-black tracking-wider text-white uppercase uppercase-gradient font-mono">
                FLASHER<span className="text-green-500">.</span>
              </span>
            </div>
            
            <p className="text-zinc-500 max-w-sm leading-relaxed text-[9px]">
              Next-generation decentralized validator nodes routing secure, instant, and double-spend protected digital flash ledger assets worldwide. Operational since 2024.
            </p>

            {/* Social Icons Bar */}
            <div className="flex gap-2.5">
              <a href="#" className="p-2 rounded-lg bg-zinc-950 border border-zinc-850 text-zinc-500 hover:text-white hover:border-zinc-700 transition-colors">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="#" className="p-2 rounded-lg bg-zinc-950 border border-zinc-850 text-zinc-500 hover:text-white hover:border-zinc-700 transition-colors">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
              </a>
              <a href="#" className="p-2 rounded-lg bg-zinc-950 border border-zinc-850 text-zinc-500 hover:text-white hover:border-zinc-700 transition-colors">
                <MessageCircle size={14} />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-2 space-y-3">
            <span className="block text-[8px] text-zinc-500 font-bold uppercase tracking-widest">NAVIGATION</span>
            <ul className="space-y-2">
              {['features', 'roadmap', 'pricing'].map((link) => (
                <li key={link}>
                  <button
                    onClick={() => handleLinkClick(link)}
                    className="text-zinc-400 hover:text-green-400 uppercase tracking-wider text-[9px] cursor-pointer hover:underline focus:outline-none"
                  >
                    {link.replace('-', ' ')}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools Portals Column */}
          <div className="md:col-span-2 space-y-3">
            <span className="block text-[8px] text-zinc-500 font-bold uppercase tracking-widest">PORTAL CONSOLE</span>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleLinkClick('resale')}
                  className="text-zinc-400 hover:text-cyan-400 uppercase tracking-wider text-[9px] cursor-pointer hover:underline focus:outline-none"
                >
                  Resale Portal
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('operator')}
                  className="text-zinc-400 hover:text-green-400 uppercase tracking-wider text-[9px] cursor-pointer hover:underline focus:outline-none"
                >
                  Operator Console
                </button>
              </li>
              <li>
                <button
                  onClick={onPurchaseClick}
                  className="text-zinc-400 hover:text-green-400 uppercase tracking-wider text-[9px] cursor-pointer hover:underline focus:outline-none"
                >
                  Node Wizard
                </button>
              </li>
            </ul>
          </div>

          {/* Warnings & Sim Disclaimer Column */}
          <div className="md:col-span-4 space-y-3 bg-zinc-950/40 p-4 border border-zinc-850 rounded-2xl">
            <span className="block text-[8px] text-zinc-500 font-bold uppercase tracking-widest flex items-center gap-1.5 text-yellow-500">
              <Shield size={10} />
              SYSTEM COMPLIANCE NOTICE
            </span>
            <p className="text-zinc-500 leading-normal text-[8px]">
              This interface constitutes a premium educational simulation sandbox. The "Flash USDT" tokens and node allocations demonstrate ledger transmissions, mempool diagnostics, and multi-signature validation loops. Always verify transaction types before deploying.
            </p>
          </div>

        </div>

        {/* Bottom Copyright Row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-zinc-850 text-zinc-600 text-[8px]">
          <div>
            Copyright © 2026 <span className="text-zinc-500 font-bold uppercase">Flasher Node System.</span> All rights reserved.
          </div>
          
          <div className="flex gap-4">
            <a href="#" className="hover:underline hover:text-zinc-400">TERMS & CONDITIONS</a>
            <a href="#" className="hover:underline hover:text-zinc-400">PRIVACY POLICY</a>
            <a href="#" className="hover:underline hover:text-zinc-400">SECURITY FIREWALL</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
