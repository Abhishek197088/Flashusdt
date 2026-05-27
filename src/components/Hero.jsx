import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Shield, Zap, TrendingUp, Cpu } from 'lucide-react';

export default function Hero({ onGetStarted, onLearnMore }) {
  const canvasRef = useRef(null);
  const [terminalText, setTerminalText] = useState("");
  const fullTerminalText = "system_node_init --protocol=quantum_transfer --secure-bridge=active --speed=max";
  
  // Simulated transactions ticker feed
  const [tickerTxs, setTickerTxs] = useState([
    { id: 'tx_98x1f', wallet: 'TYh9s...kLq91', amount: '15,000 USDT', time: 'Just now', status: 'SUCCESS' },
    { id: 'tx_32p8a', wallet: '0x8fC...4a9dB', amount: '50,000 USDT', time: '1m ago', status: 'SUCCESS' },
    { id: 'tx_07d4b', wallet: 'TJx2p...mNj88', amount: '100,000 USDT', time: '3m ago', status: 'SUCCESS' },
    { id: 'tx_61y9c', wallet: '0x1ea...Ea471', amount: '5,000 USDT', time: '4m ago', status: 'SUCCESS' }
  ]);

  // Canvas particle network background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const particles = [];
    const particleCount = Math.min(Math.floor((width * height) / 15000), 75);

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 1.5 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx = -this.vx;
        if (this.y < 0 || this.y > height) this.vy = -this.vy;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(34, 197, 94, 0.45)';
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const drawLines = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(34, 197, 94, ${0.18 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      drawLines();
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Dynamic terminal typing simulation
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTerminalText((prev) => prev + fullTerminalText.charAt(index));
      index++;
      if (index >= fullTerminalText.length) {
        clearInterval(interval);
      }
    }, 40);

    return () => clearInterval(interval);
  }, []);

  // Update transaction logs randomly
  useEffect(() => {
    const addresses = ['TAy88...mLk21', '0x9aC...64d2B', 'TXo99...nRt84', '0x15f...eEA78', 'TPh9x...cKp09', '0xeEd...12f8E'];
    const amounts = ['10,000 USDT', '25,000 USDT', '65,000 USDT', '8,000 USDT', '120,000 USDT', '45,000 USDT'];
    const prefixes = ['tx_a8', 'tx_d4', 'tx_7e', 'tx_99', 'tx_c2', 'tx_b1'];

    const txInterval = setInterval(() => {
      const newTx = {
        id: prefixes[Math.floor(Math.random() * prefixes.length)] + Math.floor(Math.random() * 90 + 10),
        wallet: addresses[Math.floor(Math.random() * addresses.length)],
        amount: amounts[Math.floor(Math.random() * amounts.length)],
        time: 'Just now',
        status: 'SUCCESS'
      };

      setTickerTxs((prev) => {
        const updated = prev.map((tx) => ({
          ...tx,
          time: tx.time === 'Just now' ? '1m ago' : tx.time === '1m ago' ? '3m ago' : tx.time === '3m ago' ? '5m ago' : '10m ago'
        }));
        return [newTx, ...updated.slice(0, 3)];
      });
    }, 4500);

    return () => clearInterval(txInterval);
  }, []);

  return (
    <section id="hero" className="relative min-h-[92svh] flex flex-col justify-center pt-24 pb-12 overflow-hidden cyber-grid select-none">
      <div className="cyber-grid-radial absolute inset-0 -z-10" />
      
      {/* Interactive canvas background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full -z-10 pointer-events-none" />

      {/* Main Grid Hero container */}
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
        
        {/* Left Copy Panel */}
        <div className="lg:col-span-7 flex flex-col space-y-6 text-left">
          
          {/* Tagline */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 font-mono text-[10px] uppercase tracking-widest w-fit animate-pulse">
            <Cpu size={12} />
            <span>NODE BLOCKBRIDGE IS ACTIVE</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight uppercase font-mono">
            Fast Crypto <br/>
            <span className="bg-gradient-to-r from-green-500 to-emerald-400 bg-clip-text text-transparent neon-text-green">
              Transfers
            </span> <br/>
            Worldwide
          </h1>

          {/* Subheadline */}
          <p className="text-zinc-400 text-sm md:text-base max-w-xl leading-relaxed">
            Secure, instant, and reliable digital asset solutions. We bridge network protocols seamlessly, ensuring standard confirmations under 10 minutes.
          </p>

          {/* Typing terminal panel */}
          <div className="bg-black/60 p-3.5 rounded-xl border border-zinc-800/80 font-mono text-xs text-green-500 max-w-lg shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
            <div className="flex items-center gap-1.5 mb-2 border-b border-zinc-800/60 pb-1.5 text-zinc-500 text-[10px]">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/30"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/30"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/30"></span>
              <span className="ml-1 tracking-widest">SHELL_NODE // TRANSFER_INIT</span>
            </div>
            <div className="flex gap-1">
              <span className="text-zinc-500">$</span>
              <span>{terminalText}</span>
              <span className="animate-pulse">_</span>
            </div>
          </div>

          {/* Dual Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onGetStarted}
              className="px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-green-500 to-emerald-500 text-black shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:shadow-[0_0_35px_rgba(34,197,94,0.6)] transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-2 group"
            >
              <span>Get Started</span>
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </button>
            <button
              onClick={onLearnMore}
              className="px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-zinc-950/80 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-white transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
            >
              Learn More
            </button>
          </div>
        </div>

        {/* Right 3D Visual Hologram panel */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
          
          {/* Futuristic Floating Shield Graphic */}
          <div className="relative w-72 h-72 md:w-80 md:h-80 flex items-center justify-center bg-zinc-950/20 rounded-full border border-green-500/10 shadow-[0_0_60px_rgba(34,197,94,0.06)] animate-float">
            
            {/* Pulsing neon rings */}
            <div className="absolute inset-4 rounded-full border border-dashed border-green-500/20 animate-spin" style={{ animationDuration: '30s' }} />
            <div className="absolute inset-8 rounded-full border border-green-500/5 shadow-[0_0_20px_rgba(34,197,94,0.1)]" />
            
            {/* Center Hologram Shield */}
            <div className="p-8 rounded-3xl bg-[#111116]/80 border border-green-500/30 text-green-500 shadow-[0_0_40px_rgba(34,197,94,0.2)] scale-110 relative z-10 animate-glow-pulse">
              <Shield size={64} className="stroke-[1.5]" />
            </div>

            {/* Glowing floating tokens */}
            <div className="absolute -top-4 -right-2 p-3.5 rounded-2xl bg-zinc-900/90 border border-cyan-500/30 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.2)] font-black text-xs font-mono select-none">
              USDT
            </div>
            <div className="absolute bottom-6 -left-4 p-3 rounded-2xl bg-zinc-900/90 border border-green-500/30 text-green-400 shadow-[0_0_20px_rgba(34,197,94,0.2)] font-black text-xs font-mono select-none">
              TRX
            </div>
            <div className="absolute top-1/2 -left-8 transform -translate-y-1/2 p-2.5 rounded-full bg-zinc-900/90 border border-yellow-500/30 text-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.15)] select-none">
              ₿
            </div>
          </div>

          {/* Real-time Ledger overlay feed */}
          <div className="w-full mt-8 max-w-sm glass-panel rounded-2xl p-4 border border-zinc-800/80 font-mono text-[10px] space-y-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.5)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-[#08080c]/50 to-transparent pointer-events-none"></div>
            
            <div className="flex items-center justify-between border-b border-zinc-850 pb-2 text-zinc-500">
              <span className="flex items-center gap-1"><Zap size={10} className="text-green-500" /> LIVE_TRANSFER_LEDGER</span>
              <span className="text-green-500 font-bold animate-pulse">● SECURE_FEED</span>
            </div>

            <div className="space-y-1.5 max-h-[110px] overflow-hidden">
              {tickerTxs.map((tx) => (
                <div key={tx.id} className="flex justify-between items-center py-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-zinc-600">{tx.id}</span>
                    <span className="text-zinc-400">{tx.wallet}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-white font-bold">{tx.amount}</span>
                    <span className="px-1.5 py-0.2 rounded bg-green-500/10 text-green-400 border border-green-500/20 text-[8px] font-bold">
                      {tx.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
