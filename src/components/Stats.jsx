import React, { useState, useEffect } from 'react';
import { Users, RefreshCw, Activity, Calendar } from 'lucide-react';

export default function Stats() {
  const [usersCount, setUsersCount] = useState(0);
  const [txCount, setTxCount] = useState(0);
  const [uptime, setUptime] = useState(0);

  useEffect(() => {
    // Animate users count from 0 to 1,000,000
    let usersStart = 0;
    const usersEnd = 1000000;
    const usersDuration = 2000;
    const usersStep = Math.floor(usersEnd / (usersDuration / 50));
    
    const usersTimer = setInterval(() => {
      usersStart += usersStep;
      if (usersStart >= usersEnd) {
        setUsersCount(usersEnd);
        clearInterval(usersTimer);
      } else {
        setUsersCount(usersStart);
      }
    }, 50);

    // Animate transactions from 0 to 70,000
    let txStart = 0;
    const txEnd = 70000;
    const txDuration = 2000;
    const txStep = Math.floor(txEnd / (txDuration / 50));

    const txTimer = setInterval(() => {
      txStart += txStep;
      if (txStart >= txEnd) {
        setTxCount(txEnd);
        clearInterval(txTimer);
      } else {
        setTxCount(txStart);
      }
    }, 50);

    // Animate uptime to 99.9%
    let uptimeStart = 0.0;
    const uptimeEnd = 99.9;
    const uptimeTimer = setInterval(() => {
      uptimeStart += 2.5;
      if (uptimeStart >= uptimeEnd) {
        setUptime(uptimeEnd);
        clearInterval(uptimeTimer);
      } else {
        setUptime(parseFloat(uptimeStart.toFixed(1)));
      }
    }, 50);

    return () => {
      clearInterval(usersTimer);
      clearInterval(txTimer);
      clearInterval(uptimeTimer);
    };
  }, []);

  const statsList = [
    {
      id: 1,
      label: 'ACTIVE WALLETS',
      value: usersCount.toLocaleString() + '+',
      icon: <Users size={18} className="text-green-400" />,
      tagline: 'Global satisfy users'
    },
    {
      id: 2,
      label: 'DAILY TRANSACTIONS',
      value: txCount.toLocaleString() + '+',
      icon: <RefreshCw size={18} className="text-cyan-400" />,
      tagline: 'Flash volume settling daily'
    },
    {
      id: 3,
      label: 'VALIDATOR UPTIME',
      value: uptime + '%',
      icon: <Activity size={18} className="text-green-500" />,
      tagline: 'Dual node synchronization'
    }
  ];

  return (
    <section className="py-20 relative select-none bg-zinc-950/20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {statsList.map((stat) => (
            <div
              key={stat.id}
              className="glass-panel rounded-3xl p-6 border border-zinc-800/80 hover:border-zinc-700/80 transition-all duration-300 flex items-center gap-6 text-left relative overflow-hidden shadow-[0_10px_20px_rgba(0,0,0,0.15)] group"
            >
              {/* Outer decorative neon tag */}
              <div className="absolute top-0 right-0 w-16 h-[2px] bg-gradient-to-r from-transparent to-green-500/30" />
              
              {/* Glowing Icon */}
              <div className="w-12 h-12 rounded-2xl bg-zinc-950 border border-zinc-850 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                {stat.icon}
              </div>

              {/* Copy data */}
              <div className="space-y-1 font-mono">
                <span className="block text-[8px] text-zinc-500 font-bold tracking-widest uppercase">{stat.label}</span>
                <span className="block text-2xl font-black text-white tracking-tight">{stat.value}</span>
                <span className="block text-[9px] text-zinc-500 font-bold tracking-wide uppercase">{stat.tagline}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
