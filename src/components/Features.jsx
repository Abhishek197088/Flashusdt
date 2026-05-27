import React from 'react';
import { Zap, ShieldCheck, Headphones, ArrowRight } from 'lucide-react';

export default function Features({ onPricingScroll }) {
  const featuresList = [
    {
      id: 1,
      icon: <Zap size={28} className="stroke-[1.75]" />,
      title: 'Instant Transfers',
      description: 'Our proprietary multi-node bridge processes and completes digital token deliveries worldwide in 10-15 minutes flat, fully confirmed.',
      color: 'green',
      shadow: 'shadow-[0_0_30px_rgba(34,197,94,0.15)]',
      borderHover: 'hover:border-green-500/40',
      iconBg: 'bg-green-500/10 border-green-500/30 text-green-400'
    },
    {
      id: 2,
      icon: <ShieldCheck size={28} className="stroke-[1.75]" />,
      title: 'Secure Transactions',
      description: 'Protected by top-tier cryptographic protocols, decentralized validator networks, and double-spend firewalls. Your transaction is ironclad.',
      color: 'cyan',
      shadow: 'shadow-[0_0_30px_rgba(6,182,212,0.15)]',
      borderHover: 'hover:border-cyan-500/40',
      iconBg: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
    },
    {
      id: 3,
      icon: <Headphones size={28} className="stroke-[1.75]" />,
      title: '24/7 Support Desk',
      description: 'Receive assistance from our active operations team around the clock. Got questions on wallet nodes or transactions? We resolve them immediately.',
      color: 'emerald',
      shadow: 'shadow-[0_0_30px_rgba(16,185,129,0.15)]',
      borderHover: 'hover:border-emerald-500/40',
      iconBg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
    }
  ];

  return (
    <section id="features" className="py-24 relative select-none">
      {/* Visual background details */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-green-500/5 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header section */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 font-mono text-[9px] uppercase tracking-widest">
            <span>CORE FEATURES</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold uppercase font-mono tracking-tight text-white">
            Why Choose Our <br/>
            <span className="bg-gradient-to-r from-green-500 to-emerald-400 bg-clip-text text-transparent neon-text-green">
              Flasher Platform
            </span>
          </h2>
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
            We provide next-generation decentralized node routing and digital ledger transfers that stand out in speed, security, and customer care.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuresList.map((feat) => (
            <div
              key={feat.id}
              className={`glass-panel rounded-3xl p-8 text-left border border-zinc-800/80 hover:border-zinc-700/80 ${feat.borderHover} transition-all duration-500 hover:-translate-y-1.5 group flex flex-col justify-between hover:${feat.shadow} relative overflow-hidden`}
            >
              {/* Card top flare */}
              <div className="absolute top-0 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-green-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div>
                {/* Glowing Icon holder */}
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border mb-6 ${feat.iconBg} group-hover:scale-110 transition-transform duration-500`}>
                  {feat.icon}
                </div>

                {/* Card Title */}
                <h3 className="text-lg font-bold text-white uppercase font-mono mb-3 tracking-wide group-hover:text-green-400 transition-colors duration-300">
                  {feat.title}
                </h3>

                {/* Card Description */}
                <p className="text-zinc-400 text-xs md:text-sm leading-relaxed mb-8">
                  {feat.description}
                </p>
              </div>

              {/* Action Link */}
              <button 
                onClick={onPricingScroll}
                className="mt-auto flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-green-500 hover:text-green-400 transition-colors duration-300 group/link cursor-pointer w-fit"
              >
                <span>Access Feature</span>
                <ArrowRight size={12} className="group-hover/link:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          ))}
        </div>

        {/* Informational Sub-Panel */}
        <div className="mt-16 p-8 rounded-3xl glass-panel-neon border border-green-500/10 flex flex-col md:flex-row items-center justify-between gap-6 text-left relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-green-500/5 to-transparent pointer-events-none" />
          
          <div className="space-y-2 max-w-3xl">
            <h4 className="text-sm font-bold uppercase font-mono text-white tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-ping"></span>
              Flasher Node Routing Operations
            </h4>
            <p className="text-zinc-400 text-xs md:text-sm leading-relaxed">
              We compile and structure Flash USDT in heavy volumes backed by highly reliable cross-chain liquidity paths. Once your purchase orders are logged on our dashboard, our secure transaction routers fulfill transfers inside 15 minutes.
            </p>
          </div>

          <button 
            onClick={onPricingScroll}
            className="w-full md:w-auto px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-green-500 hover:bg-green-400 text-black shadow-[0_0_15px_rgba(34,197,94,0.3)] hover:shadow-[0_0_25px_rgba(34,197,94,0.5)] transition-all duration-300 shrink-0 cursor-pointer"
          >
            Deploy Node Order
          </button>
        </div>

      </div>
    </section>
  );
}
