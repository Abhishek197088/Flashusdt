import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Smartphone, ShieldCheck, CreditCard, ArrowDownCircle, Coins, Cpu, CheckCircle, Video } from 'lucide-react';

export default function ProofSection() {
  // Mode States: 'sim' | 'video'
  const [ibetMode, setIbetMode] = useState('video'); // Default to video so they see the real screen clips first!
  const [binMode, setBinMode] = useState('video');

  // 1xBet State
  const [ibetAmount, setIbetAmount] = useState('2000');
  const [ibetBalance, setIbetBalance] = useState(12.40);
  const [ibetStatus, setIbetStatus] = useState('idle'); // 'idle' | 'running' | 'success'
  const [ibetStep, setIbetStep] = useState(0);
  const [ibetLogs, setIbetLogs] = useState([]);

  // Binance State
  const [binAmount, setBinAmount] = useState('5000');
  const [binBalance, setBinBalance] = useState(0.00);
  const [binStatus, setBinStatus] = useState('idle'); // 'idle' | 'running' | 'success'
  const [binStep, setBinStep] = useState(0);
  const [binLogs, setBinLogs] = useState([]);

  const ibetSequence = [
    "CONNECTING TO TRON VALIDATOR BROADCAST...",
    "SCANNING MEMPOOL FOR DUAL-SIGNATURE HASH...",
    "FLASH CONTRACT VERIFIED: ZERO CONFLICT DETECTED.",
    "1XBET INTERNAL API TRIGGERING BALANCE INDEX...",
    "CREDITING ACCOUNT: FLASH COINS TRANSFERRED."
  ];

  const binSequence = [
    "DETECTED INCOMING TRC20 LEDGER STREAM...",
    "COMMITTING CONVERTIBILITY SIGNATURE CHECK...",
    "DOUBLE-SPEND RESIDUAL VERIFICATION NOMINAL...",
    "DISPATCHING FUNDS TO BINANCE HOT WALLET...",
    "BINANCE APP NOTIFICATION DIALOG DISPATCHED."
  ];

  // 1xBet simulation ticker
  useEffect(() => {
    if (ibetStatus === 'running') {
      if (ibetStep < ibetSequence.length) {
        const timer = setTimeout(() => {
          setIbetLogs(prev => [...prev, ibetSequence[ibetStep]]);
          setIbetStep(prev => prev + 1);
        }, 1200);
        return () => clearTimeout(timer);
      } else {
        setIbetStatus('success');
        // Rollup balance
        let start = 12.40;
        const target = 12.40 + parseFloat(ibetAmount);
        const diff = parseFloat(ibetAmount) / 30;
        const interval = setInterval(() => {
          start += diff;
          if (start >= target) {
            setIbetBalance(target);
            clearInterval(interval);
          } else {
            setIbetBalance(parseFloat(start.toFixed(2)));
          }
        }, 30);
      }
    }
  }, [ibetStatus, ibetStep]);

  // Binance simulation ticker
  useEffect(() => {
    if (binStatus === 'running') {
      if (binStep < binSequence.length) {
        const timer = setTimeout(() => {
          setBinLogs(prev => [...prev, binSequence[binStep]]);
          setBinStep(prev => prev + 1);
        }, 1200);
        return () => clearTimeout(timer);
      } else {
        setBinStatus('success');
        // Rollup balance
        let start = 0.00;
        const target = parseFloat(binAmount);
        const diff = parseFloat(binAmount) / 30;
        const interval = setInterval(() => {
          start += diff;
          if (start >= target) {
            setBinBalance(target);
            clearInterval(interval);
          } else {
            setBinBalance(parseFloat(start.toFixed(2)));
          }
        }, 30);
      }
    }
  }, [binStatus, binStep]);

  const startIbetDemo = () => {
    if (ibetStatus === 'running') return;
    setIbetStatus('running');
    setIbetStep(0);
    setIbetLogs(["INITIALIZING INTEGRATION DEMONSTRATION..."]);
  };

  const resetIbetDemo = () => {
    setIbetStatus('idle');
    setIbetStep(0);
    setIbetLogs([]);
    setIbetBalance(12.40);
  };

  const startBinDemo = () => {
    if (binStatus === 'running') return;
    setBinStatus('running');
    setBinStep(0);
    setBinLogs(["ESTABLISHING CRYPTOGRAPHIC BRIDGE INTEGRITY..."]);
  };

  const resetBinDemo = () => {
    setBinStatus('idle');
    setBinStep(0);
    setBinLogs([]);
    setBinBalance(0.00);
  };

  return (
    <section className="py-24 relative select-none bg-black/30 overflow-hidden">
      <div className="absolute top-[30%] right-[-10%] w-[450px] h-[450px] bg-green-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-[9px] uppercase tracking-widest">
            <Cpu size={10} className="animate-spin" />
            <span>PLATFORM INTEGRATION DECK</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold uppercase font-mono tracking-tight text-white">
            Simulated Third-Party <br/>
            <span className="bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent neon-text-cyan">
              Transaction Proofs
            </span>
          </h2>
          <p className="text-zinc-400 text-xs md:text-sm leading-relaxed font-mono">
            Attract validation clients by demonstrating how our Flash USDT ledger transfers route into popular external applications like betting deposits and exchange wallets.
          </p>
        </div>

        {/* Smartphone Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto items-stretch">
          
          {/* PHONE 1: 1xBet Deposit demo */}
          <div className="flex flex-col items-center">
            <div className="mb-4 font-mono text-[10px] text-zinc-500 flex items-center gap-1.5 uppercase font-bold">
              <Coins size={12} className="text-cyan-400" />
              <span>DEMO 01: 1XBET PAYMENT INTEGRATION</span>
            </div>

            {/* Mode Selector Tab Router */}
            <div className="flex gap-1.5 p-1 rounded-xl bg-zinc-950 border border-zinc-850 w-fit mb-6 font-mono text-[9px]">
              <button
                onClick={() => setIbetMode('video')}
                className={`px-3 py-1.5 rounded-lg font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1
                  ${ibetMode === 'video' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-zinc-500'}`}
              >
                <Video size={10} />
                <span>VIDEO PROOF</span>
              </button>
              <button
                onClick={() => setIbetMode('sim')}
                className={`px-3 py-1.5 rounded-lg font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1
                  ${ibetMode === 'sim' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-zinc-500'}`}
              >
                <Smartphone size={10} />
                <span>SIMULATOR</span>
              </button>
            </div>

            {/* Smartphone Case Wrapper */}
            <div className="w-[300px] h-[580px] rounded-[42px] bg-zinc-950 border-[6px] border-zinc-800 relative overflow-hidden flex flex-col justify-between shadow-[0_15px_35px_rgba(6,182,212,0.15)]">
              {/* Speaker Notch */}
              <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-20 h-4 bg-zinc-800 rounded-full z-20 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-950 absolute left-2.5" />
              </div>

              {/* Inside Mobile Content */}
              <div className="flex-1 bg-[#090b16] pt-10 px-4 flex flex-col justify-between text-left font-mono relative overflow-hidden">
                {ibetMode === 'video' ? (
                  /* Embed video proof */
                  <div className="w-full h-full flex flex-col justify-between py-2.5">
                    <div className="flex justify-between items-center border-b border-zinc-850 pb-2 mb-2">
                      <span className="text-[10px] font-black text-cyan-400">1XBET SCREEN RECORD</span>
                      <span className="text-[8px] text-zinc-500 uppercase">PROOF PLAYBACK</span>
                    </div>

                    <div className="flex-1 rounded-2xl overflow-hidden border border-zinc-850 bg-black flex items-center justify-center relative">
                      <video
                        src="/1xbet.mp4"
                        controls
                        className="w-full h-full object-cover rounded-xl"
                        playsInline
                        preload="auto"
                      />
                    </div>

                    <div className="text-[8px] text-zinc-500 leading-normal text-center mt-3">
                      Watch our live demonstration showing standard TRC20 Flash USDT arriving into 1xBet.
                    </div>
                  </div>
                ) : (
                  /* Interactive Simulator View */
                  <div className="flex flex-col justify-between h-full py-1">
                    {/* 1xBet Style Navigation Bar */}
                    <div className="flex justify-between items-center border-b border-zinc-850 pb-2.5">
                      <span className="text-[11px] font-black text-cyan-400 tracking-wider">1XBET GATEWAY</span>
                      <span className="text-[9px] px-2 py-0.5 rounded bg-zinc-900 border border-zinc-850 text-zinc-400">TRC20 ACCPT</span>
                    </div>

                    {/* Simulated profile balance widget */}
                    <div className="py-4 px-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-850 mt-4 space-y-1">
                      <span className="block text-[8px] text-zinc-500 uppercase">PROFILE ACCOUNT BALANCE:</span>
                      <div className="flex justify-between items-baseline">
                        <span className={`text-lg font-black transition-all duration-300 ${ibetStatus === 'success' ? 'text-green-400 neon-text-green font-black scale-105' : 'text-white'}`}>
                          ${ibetBalance.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                        </span>
                        <span className="text-[8px] text-zinc-400">USD CURRENCY</span>
                      </div>
                    </div>

                    {/* Main Action area */}
                    <div className="my-auto space-y-4">
                      {ibetStatus === 'idle' && (
                        <div className="space-y-4">
                          <div className="space-y-1.5">
                            <label className="block text-[8px] text-zinc-500 uppercase">INPUT TRANSFER QUANTITY:</label>
                            <div className="relative">
                              <input
                                type="number"
                                value={ibetAmount}
                                onChange={(e) => setIbetAmount(e.target.value)}
                                placeholder="Enter amount to simulate"
                                className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors font-mono"
                              />
                              <span className="absolute right-3 top-2.5 text-[8px] text-zinc-500 uppercase">USDT</span>
                            </div>
                          </div>

                          <button
                            onClick={startIbetDemo}
                            className="w-full py-3.5 rounded-xl text-[10px] font-black uppercase tracking-wider bg-gradient-to-r from-cyan-500 to-blue-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_22px_rgba(6,182,212,0.45)] transition-all cursor-pointer flex items-center justify-center gap-1.5"
                          >
                            <Play size={12} className="fill-current" />
                            <span>DEPOSIT FLASH USDT</span>
                          </button>
                        </div>
                      )}

                      {ibetStatus === 'running' && (
                        <div className="bg-black/80 border border-zinc-850 p-3 rounded-xl text-[8px] text-zinc-500 space-y-1.5 h-44 overflow-y-auto scrollbar-thin">
                          <div className="flex items-center gap-1 text-cyan-500/80 border-b border-zinc-900 pb-1 mb-1 font-bold">
                            <Cpu size={9} className="animate-spin" />
                            <span>VALIDATOR_BRIDGE_INDEXER</span>
                          </div>
                          {ibetLogs.map((log, i) => (
                            <div key={i} className="flex gap-1">
                              <span className="text-cyan-500 font-bold select-none">&gt;&gt;</span>
                              <span className={i === ibetLogs.length - 1 ? 'text-white font-bold animate-pulse' : 'text-zinc-650'}>{log}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {ibetStatus === 'success' && (
                        <div className="bg-green-500/5 border border-green-500/30 p-4 rounded-2xl text-center space-y-3 animate-fade-in relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-8 h-[1.5px] bg-gradient-to-r from-transparent to-green-500/40" />
                          <div className="w-8 h-8 rounded-full bg-green-500/10 border border-green-500/35 text-green-400 flex items-center justify-center mx-auto shadow-[0_0_10px_rgba(34,197,94,0.3)]">
                            <CheckCircle size={16} />
                          </div>
                          <div className="space-y-1">
                            <h4 className="text-[10px] font-bold text-green-400 uppercase">TRANSFER CONFIRMED</h4>
                            <p className="text-[8px] text-zinc-400 leading-normal">
                              Ledger successfully synchronized. Flash USDT successfully credited to 1xBet balance.
                            </p>
                          </div>
                          <button
                            onClick={resetIbetDemo}
                            className="px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-950 hover:bg-zinc-900 text-[8px] text-zinc-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1 mx-auto"
                          >
                            <RotateCcw size={8} />
                            <span>RESTART DEMO</span>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Footer simulation notice */}
                    <div className="border-t border-zinc-850 py-3 text-[7px] text-zinc-600 leading-normal text-center mt-auto">
                      Disclaimer: This simulator demonstrates internal API synchronization and database crediting. All transactions are local sandbox mockups.
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* PHONE 2: Binance Wallet Withdrawal demo */}
          <div className="flex flex-col items-center">
            <div className="mb-4 font-mono text-[10px] text-zinc-500 flex items-center gap-1.5 uppercase font-bold">
              <CreditCard size={12} className="text-green-400" />
              <span>DEMO 02: BINANCE DEPOSIT CONFIRMATION</span>
            </div>

            {/* Mode Selector Tab Router */}
            <div className="flex gap-1.5 p-1 rounded-xl bg-zinc-950 border border-zinc-850 w-fit mb-6 font-mono text-[9px]">
              <button
                onClick={() => setBinMode('video')}
                className={`px-3 py-1.5 rounded-lg font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1
                  ${binMode === 'video' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'text-zinc-500'}`}
              >
                <Video size={10} />
                <span>VIDEO PROOF</span>
              </button>
              <button
                onClick={() => setBinMode('sim')}
                className={`px-3 py-1.5 rounded-lg font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1
                  ${binMode === 'sim' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'text-zinc-500'}`}
              >
                <Smartphone size={10} />
                <span>SIMULATOR</span>
              </button>
            </div>

            {/* Smartphone Case Wrapper */}
            <div className="w-[300px] h-[580px] rounded-[42px] bg-zinc-950 border-[6px] border-zinc-800 relative overflow-hidden flex flex-col justify-between shadow-[0_15px_35px_rgba(34,197,94,0.15)]">
              {/* Speaker Notch */}
              <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-20 h-4 bg-zinc-800 rounded-full z-20 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-950 absolute left-2.5" />
              </div>

              {/* Inside Mobile Content */}
              <div className="flex-1 bg-[#0b0c10] pt-10 px-4 flex flex-col justify-between text-left font-mono relative overflow-hidden">
                {binMode === 'video' ? (
                  /* Embed video proof */
                  <div className="w-full h-full flex flex-col justify-between py-2.5">
                    <div className="flex justify-between items-center border-b border-zinc-850 pb-2 mb-2">
                      <span className="text-[10px] font-black text-yellow-500 font-bold">BINANCE DEPOSIT PROOF</span>
                      <span className="text-[8px] text-zinc-500 uppercase">LIVE RECORDING</span>
                    </div>

                    <div className="flex-1 rounded-2xl overflow-hidden border border-zinc-850 bg-black flex items-center justify-center relative">
                      <video
                        src="/binance.mp4"
                        controls
                        className="w-full h-full object-cover rounded-xl"
                        playsInline
                        preload="auto"
                      />
                    </div>

                    <div className="text-[8px] text-zinc-500 leading-normal text-center mt-3">
                      Watch our live demonstration showing multi-signature verification converting Flash USDT to Binance.
                    </div>
                  </div>
                ) : (
                  /* Interactive Simulator View */
                  <div className="flex flex-col justify-between h-full py-1">
                    {/* Binance Look Header */}
                    <div className="flex justify-between items-center border-b border-zinc-850 pb-2.5">
                      <span className="text-[11px] font-black text-yellow-500 tracking-wider">BINANCE APP</span>
                      <span className="text-[9px] px-2 py-0.5 rounded bg-zinc-900 border border-zinc-850 text-zinc-400">USDT SPOT</span>
                    </div>

                    {/* Spot Wallet balance */}
                    <div className="py-4 px-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-850 mt-4 space-y-1">
                      <span className="block text-[8px] text-zinc-500 uppercase">SPOT WALLET BALANCE:</span>
                      <div className="flex justify-between items-baseline">
                        <span className={`text-lg font-black transition-all duration-300 ${binStatus === 'success' ? 'text-green-400 neon-text-green font-black scale-105' : 'text-white'}`}>
                          {binBalance.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} USDT
                        </span>
                        <span className="text-[8px] text-zinc-400">USDT TOKEN</span>
                      </div>
                    </div>

                    {/* Main Action area */}
                    <div className="my-auto space-y-4">
                      {binStatus === 'idle' && (
                        <div className="space-y-4">
                          <div className="space-y-1.5">
                            <label className="block text-[8px] text-zinc-500 uppercase">INPUT WITHDRAWAL QUANTITY:</label>
                            <div className="relative">
                              <input
                                type="number"
                                value={binAmount}
                                onChange={(e) => setBinAmount(e.target.value)}
                                placeholder="Enter amount to simulate"
                                className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-green-500 transition-colors font-mono"
                              />
                              <span className="absolute right-3 top-2.5 text-[8px] text-zinc-500 uppercase">USDT</span>
                            </div>
                          </div>

                          <button
                            onClick={startBinDemo}
                            className="w-full py-3.5 rounded-xl text-[10px] font-black uppercase tracking-wider bg-gradient-to-r from-green-500 to-emerald-500 text-black shadow-[0_0_15px_rgba(34,197,94,0.3)] hover:shadow-[0_0_22px_rgba(34,197,94,0.45)] transition-all cursor-pointer flex items-center justify-center gap-1.5"
                          >
                            <Play size={12} className="fill-current" />
                            <span>SIMULATE BINANCE SWAP</span>
                          </button>
                        </div>
                      )}

                      {binStatus === 'running' && (
                        <div className="bg-black/80 border border-zinc-850 p-3 rounded-xl text-[8px] text-zinc-500 space-y-1.5 h-44 overflow-y-auto scrollbar-thin">
                          <div className="flex items-center gap-1 text-green-500/80 border-b border-zinc-900 pb-1 mb-1 font-bold">
                            <Cpu size={9} className="animate-spin" />
                            <span>EXCHANGE_LEDGER_MONITOR</span>
                          </div>
                          {binLogs.map((log, i) => (
                            <div key={i} className="flex gap-1">
                              <span className="text-green-500 font-bold select-none">&gt;&gt;</span>
                              <span className={i === binLogs.length - 1 ? 'text-white font-bold animate-pulse' : 'text-zinc-650'}>{log}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {binStatus === 'success' && (
                        <div className="bg-green-500/5 border border-green-500/30 p-4 rounded-2xl text-center space-y-3 animate-fade-in relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-8 h-[1.5px] bg-gradient-to-r from-transparent to-green-500/40" />
                          <div className="w-8 h-8 rounded-full bg-green-500/10 border border-green-500/35 text-green-400 flex items-center justify-center mx-auto shadow-[0_0_10px_rgba(34,197,94,0.3)]">
                            <CheckCircle size={16} />
                          </div>
                          <div className="space-y-1">
                            <h4 className="text-[10px] font-bold text-green-400 uppercase">SWAP COMPLETED</h4>
                            <p className="text-[8px] text-zinc-400 leading-normal">
                              USDT deposit successfully settled. Multi-signature consensus verified and conversion unlocked.
                            </p>
                          </div>
                          <button
                            onClick={resetBinDemo}
                            className="px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-950 hover:bg-zinc-900 text-[8px] text-zinc-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1 mx-auto"
                          >
                            <RotateCcw size={8} />
                            <span>RESTART DEMO</span>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Footer simulation notice */}
                    <div className="border-t border-zinc-850 py-3 text-[7px] text-zinc-600 leading-normal text-center mt-auto">
                      Disclaimer: This simulator demonstrates conversion pathways and consensus checks. All exchange layers are sandbox mockup configurations.
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
