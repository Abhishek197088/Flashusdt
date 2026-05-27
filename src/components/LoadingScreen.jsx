import React, { useState, useEffect } from 'react';
import { Terminal, Shield, Cpu, RefreshCw } from 'lucide-react';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState([]);
  const [isReady, setIsReady] = useState(false);

  const startupLogs = [
    "BOOTING QUANTUM CRYPTO PROTOCOL v4.3.0...",
    "ESTABLISHING DECENTRALIZED NODE BRIDGE...",
    "SYNCING WITH SOLANA & TRON BLOCKCHAINS...",
    "INITIALIZING HIGH-SPEED TRANSACTION CHANNELS...",
    "OBTAINING SECURE MULTI-SIG LIQUIDITY KEYS...",
    "CONNECTING TO SHIELDED IP OVERLAYS...",
    "PRE-LOADING METADATA SCHEMAS...",
    "SYSTEM STATUS: SECURE & OPERATIONAL."
  ];

  useEffect(() => {
    // Progress increment timer
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsReady(true);
          return 100;
        }
        const increment = Math.floor(Math.random() * 8) + 4;
        return Math.min(prev + increment, 100);
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Add logs dynamically as progress goes
    const logIndex = Math.min(Math.floor((progress / 100) * startupLogs.length), startupLogs.length - 1);
    if (startupLogs[logIndex] && !logs.includes(startupLogs[logIndex])) {
      setLogs((prev) => [...prev, startupLogs[logIndex]]);
    }
  }, [progress]);

  const handleEnter = () => {
    if (onComplete) onComplete();
  };

  return (
    <div className="fixed inset-0 bg-[#08080c] z-50 flex flex-col items-center justify-center p-6 scanline select-none">
      {/* Background neon glows */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-green-500/10 rounded-full blur-[120px] animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-[120px] animate-pulse-slow"></div>

      <div className="max-w-lg w-full p-8 rounded-2xl glass-panel-neon relative overflow-hidden shadow-[0_0_50px_rgba(34,197,94,0.15)]">
        {/* Decorative corner borders */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-green-500"></div>
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-green-500"></div>
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-green-500"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-green-500"></div>

        {/* Logo and Head */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-green-500/10 rounded-xl border border-green-500/30 text-green-500 animate-pulse">
            <Cpu size={28} />
          </div>
          <div>
            <h1 className="text-xl font-bold uppercase tracking-wider text-white flex items-center gap-2">
              FLASHER <span className="text-green-500 text-xs px-2 py-0.5 rounded bg-green-500/10 border border-green-500/20">V4.3</span>
            </h1>
            <p className="text-[10px] text-zinc-500 tracking-widest font-mono">SECURE TRANSFER SYSTEM</p>
          </div>
        </div>

        {/* Terminal Logs */}
        <div className="bg-black/40 rounded-xl p-4 border border-zinc-800/80 mb-6 h-48 overflow-y-auto font-mono text-[11px] text-zinc-400 flex flex-col gap-2 scrollbar-thin">
          <div className="flex items-center gap-1.5 text-green-500/80 font-bold border-b border-zinc-800 pb-1.5 mb-1">
            <Terminal size={12} />
            <span>BOOTLOG_TERMINAL</span>
          </div>
          {logs.map((log, i) => (
            <div key={i} className="flex items-start gap-1">
              <span className="text-green-500 select-none">&gt;</span>
              <span className={i === logs.length - 1 ? "text-green-400 font-bold" : ""}>{log}</span>
            </div>
          ))}
          {progress < 100 && (
            <div className="flex items-center gap-1 text-zinc-500">
              <RefreshCw size={10} className="animate-spin" />
              <span>Fetching network status...</span>
            </div>
          )}
        </div>

        {/* Progress Bar Container */}
        <div className="space-y-3 font-mono">
          <div className="flex justify-between text-xs text-zinc-400">
            <span className="flex items-center gap-1.5">
              <Shield size={12} className="text-green-500" />
              SECURE DEPLOYMENT
            </span>
            <span className="text-green-500 font-bold">{progress}%</span>
          </div>
          
          <div className="h-2 w-full bg-zinc-950 rounded-full border border-zinc-800 overflow-hidden p-[1px]">
            <div 
              className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full transition-all duration-100 ease-out shadow-[0_0_10px_rgba(34,197,94,0.5)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-8 transition-all duration-300">
          <button
            onClick={handleEnter}
            disabled={!isReady}
            className={`w-full py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs border transition-all duration-500 flex items-center justify-center gap-2 cursor-pointer
              ${isReady 
                ? 'bg-gradient-to-r from-green-500 to-emerald-600 border-green-400 text-black hover:shadow-[0_0_30px_rgba(34,197,94,0.6)] shadow-[0_0_15px_rgba(34,197,94,0.3)] transform hover:-translate-y-0.5' 
                : 'bg-zinc-950/40 border-zinc-800 text-zinc-600 cursor-not-allowed'}`}
          >
            {isReady ? 'Initialize Console' : 'Analyzing Blockchain Channels...'}
          </button>
        </div>
      </div>
    </div>
  );
}
