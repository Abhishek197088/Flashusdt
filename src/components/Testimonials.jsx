import React from 'react';
import { Star, Quote, Shield } from 'lucide-react';

export default function Testimonials() {
  const reviews = [
    {
      id: 1,
      name: 'Alex K.',
      role: 'Beta Load Tester',
      review: 'I used the Premium Node to test TRC20 mempools. The delivery arrived in my TrustWallet exactly 11 minutes after deposit hash signature. Flasher is super reliable for staging!',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80',
      rating: 5
    },
    {
      id: 2,
      name: 'Sarah M.',
      role: 'Integration Specialist',
      review: 'Incredible speed. The automated timeline guide checked and executed the node contract seamlessly. When I had a wallet binding query, their support email resolved it inside 20 minutes.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
      rating: 5
    },
    {
      id: 3,
      name: 'Devon W.',
      role: 'Smart Contract Auditor',
      review: 'Solid platform with robust API integration options. The built-in Resale bridge guarantees double-spend safety. I have executed over 40 transfers with zero consensus failures.',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=100&q=80',
      rating: 5
    }
  ];

  return (
    <section className="py-24 relative select-none">
      <div className="absolute top-[30%] left-[10%] w-72 h-72 bg-green-500/5 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 font-mono text-[9px] uppercase tracking-widest">
            <span>CLIENT VERIFICATIONS</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold uppercase font-mono tracking-tight text-white">
            Trusted By Digital <br/>
            <span className="bg-gradient-to-r from-green-500 to-emerald-400 bg-clip-text text-transparent neon-text-green">
              Asset Developers
            </span>
          </h2>
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
            Read comments from global developers, system staging teams, and node validators who use our secure transaction channels.
          </p>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="glass-panel rounded-3xl p-8 border border-zinc-800/80 hover:border-zinc-700/80 transition-all duration-300 hover:-translate-y-1 relative group flex flex-col justify-between"
            >
              {/* Decorative Corner Quotes Icon */}
              <Quote className="absolute top-6 right-8 w-10 h-10 text-zinc-800/40 select-none group-hover:text-green-500/10 transition-colors" />

              <div>
                {/* Stars Rating bar */}
                <div className="flex gap-1.5 mb-6 text-green-500">
                  {Array.from({ length: rev.rating }).map((_, idx) => (
                    <Star key={idx} size={14} className="fill-current" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-zinc-400 text-xs md:text-sm leading-relaxed mb-8 italic">
                  "{rev.review}"
                </p>
              </div>

              {/* User Bio Footer */}
              <div className="flex items-center gap-3 border-t border-zinc-850 pt-4 mt-auto">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-10 h-10 rounded-full border border-zinc-800 shrink-0 select-none"
                />
                <div className="text-left font-mono">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">{rev.name}</h4>
                  <span className="block text-[8px] text-zinc-500 font-bold uppercase tracking-widest">{rev.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
