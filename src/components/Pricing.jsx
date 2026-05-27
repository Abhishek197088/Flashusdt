import React from 'react';
import { Check, Cpu, Sparkles, Shield, Zap } from 'lucide-react';

export default function Pricing({ onSelectPackage }) {
  const packages = [
    {
      id: 'starter',
      name: 'Starter Node',
      price: '$100',
      payAmount: 100,
      yieldAmount: '4,000',
      expiry: '140 Days Expiry',
      color: 'green',
      icon: <Cpu size={20} />,
      isPopular: false,
      badge: 'TESTING LIMITS',
      features: [
        '4,000 Flash USDT Yield',
        '140 Days Expiry Period',
        'Wallet-to-Wallet Transfers (Max 60)',
        'Resell Back Guarantee (50% value)',
        'Standard Validation Speed (15m)',
        'TRC20 & BEP20 Support'
      ]
    },
    {
      id: 'premium',
      name: 'Premium Node',
      price: '$150',
      payAmount: 150,
      yieldAmount: '7,000',
      expiry: '150 Days Expiry',
      color: 'cyan',
      icon: <Sparkles size={20} />,
      isPopular: true,
      badge: 'MOST POPULAR',
      features: [
        '7,000 Flash USDT Yield',
        '150 Days Expiry Period',
        'Unlimited Wallet Transfers',
        'Resell Back Guarantee (70% value)',
        'High-Speed Node Priority (10m)',
        'TRC20, ERC20 & BEP20 Support',
        'Priority Technical Support'
      ]
    },
    {
      id: 'enterprise',
      name: 'Enterprise Node',
      price: '$300',
      payAmount: 300,
      yieldAmount: '18,000',
      expiry: '160 Days Expiry',
      color: 'emerald',
      icon: <Shield size={20} />,
      isPopular: false,
      badge: 'HIGH VOLUME',
      features: [
        '18,000 Flash USDT Yield',
        '160 Days Expiry Period',
        'Unlimited Wallet Transfers',
        'Full Resell Back Guarantee (85% value)',
        'Instant Network Broadcast (<5m)',
        'All Major Networks Supported',
        '24/7 Dedicated Node Engineer',
        'API Integration Rights'
      ]
    }
  ];

  return (
    <section id="pricing" className="py-24 relative select-none">
      {/* Background visual circles */}
      <div className="absolute top-[20%] left-[-10%] w-96 h-96 bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[450px] h-[450px] bg-green-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 font-mono text-[9px] uppercase tracking-widest">
            <span>TRANSACTION PACKAGES</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold uppercase font-mono tracking-tight text-white">
            Select Your USDT <br/>
            <span className="bg-gradient-to-r from-green-500 to-emerald-400 bg-clip-text text-transparent neon-text-green">
              Flash Node Package
            </span>
          </h2>
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
            Review our active operational nodes below. Purchase a standard package to initiate an automated, secure crypto-transfer bridge straight to your wallet.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {packages.map((pkg) => {
            const glowClass = pkg.isPopular 
              ? 'shadow-[0_0_35px_rgba(6,182,212,0.18)] border-cyan-500/30' 
              : 'border-zinc-800/80 hover:border-zinc-700/80';
            
            const btnColor = pkg.isPopular
              ? 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 shadow-[0_0_20px_rgba(6,182,212,0.35)]'
              : pkg.id === 'enterprise'
                ? 'bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-400 hover:to-green-400 shadow-[0_0_20px_rgba(16,185,129,0.35)]'
                : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 shadow-[0_0_15px_rgba(34,197,94,0.3)]';

            return (
              <div
                key={pkg.id}
                className={`glass-panel rounded-3xl p-8 flex flex-col justify-between transition-all duration-500 relative overflow-hidden ${
                  pkg.isPopular ? 'scale-105 z-10 lg:-translate-y-2' : ''
                } ${glowClass}`}
              >
                {/* Popular card neon badge/flare */}
                {pkg.isPopular && (
                  <div className="absolute top-0 right-0 left-0 h-[2px] bg-gradient-to-r from-cyan-500 to-blue-500" />
                )}

                <div>
                  {/* Card Header & Badge */}
                  <div className="flex justify-between items-center mb-6">
                    <span className={`px-3 py-1 rounded bg-zinc-950 font-mono text-[8px] font-bold tracking-widest uppercase border 
                      ${pkg.isPopular ? 'text-cyan-400 border-cyan-500/20' : 'text-zinc-500 border-zinc-800'}`}>
                      {pkg.badge}
                    </span>
                    <div className={`p-2.5 rounded-xl border ${pkg.isPopular ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20 animate-pulse' : 'bg-zinc-950 text-zinc-400 border-zinc-850'}`}>
                      {pkg.icon}
                    </div>
                  </div>

                  {/* Title & Yield */}
                  <h3 className="text-xl font-bold font-mono uppercase text-white tracking-wide mb-1">
                    {pkg.name}
                  </h3>
                  <div className="flex items-baseline gap-1.5 mb-2">
                    <span className="text-4xl font-extrabold text-white tracking-tight font-mono">{pkg.price}</span>
                    <span className="text-xs text-zinc-500 font-bold uppercase font-mono">USDT COST</span>
                  </div>
                  <div className="py-2.5 px-4 rounded-xl bg-zinc-950/70 border border-zinc-850 flex items-center justify-between mb-8">
                    <span className="text-xs font-mono text-zinc-400">YIELD TRANSFER:</span>
                    <span className={`text-base font-extrabold font-mono flex items-center gap-1.5 
                      ${pkg.isPopular ? 'text-cyan-400' : pkg.id === 'enterprise' ? 'text-emerald-400' : 'text-green-400'}`}>
                      <Zap size={14} className="fill-current" />
                      {pkg.yieldAmount} USDT
                    </span>
                  </div>

                  {/* Features list */}
                  <ul className="space-y-3.5 mb-8 text-left">
                    {pkg.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-zinc-400">
                        <Check size={14} className={`stroke-[2.5] shrink-0 mt-0.5 ${pkg.isPopular ? 'text-cyan-400' : 'text-green-500'}`} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Buy Button */}
                <button
                  onClick={() => onSelectPackage(pkg)}
                  className={`w-full py-4 rounded-2xl font-bold uppercase tracking-wider text-xs text-black transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-1.5 ${btnColor}`}
                >
                  Deploy Node Order
                </button>
              </div>
            );
          })}
        </div>

        {/* Operational Footer Disclaimer */}
        <div className="mt-16 text-center text-[10px] text-zinc-500 max-w-lg mx-auto leading-relaxed border-t border-zinc-850/80 pt-6">
          Prices and yields are calibrated daily based on blockchain gas configurations and validator node bandwidths. Order settlements are permanent and broadcast globally.
        </div>

      </div>
    </section>
  );
}
