import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TermIcon, ShieldAlert, Play, Cpu, AlertTriangle, Network, Info } from 'lucide-react';

export default function OperatorPanel() {
  const [logs, setLogs] = useState([
    'INITIATING OPERATIONAL CONTROL PANEL...',
    'BINDING SHIELDED VPN NETWORKS... STATUS: SECURE',
    'LISTENING FOR GLOBAL LIQUIDITY REQUESTS ON TRX/TRC20 BRIDGE...',
    'NODE BROADCAST SPEED IS RUNNING AT MAX VALUE (4.2 GB/S).'
  ]);

  const [activeNodes, setActiveNodes] = useState(18);
  const [txPool, setTxPool] = useState(124);
  const [gasPrice, setGasPrice] = useState(38);
  const [sysStatus, setSysStatus] = useState('ONLINE');
  const [blockHeight, setBlockHeight] = useState(8492041);
  const [inputVal, setInputVal] = useState('');
  
  const terminalEndRef = useRef(null);

  // Auto-scrolling logger
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  // Live diagnostic counts
  useEffect(() => {
    const diagnosticInterval = setInterval(() => {
      setBlockHeight(prev => prev + 1);
      setGasPrice(prev => Math.max(30, Math.min(65, prev + Math.floor(Math.random() * 5) - 2)));
      setTxPool(prev => Math.max(80, Math.min(200, prev + Math.floor(Math.random() * 10) - 4)));
    }, 3000);

    return () => clearInterval(diagnosticInterval);
  }, []);

  // Live log tickers
  useEffect(() => {
    const randomLogs = [
      "Inbound transaction queue received 12,000 USDT mapping order.",
      "Synchronizing consensus metrics with node cluster #04...",
      "Allocating dynamic gas reserves for instant TRC20 broadcast.",
      "Clearing transaction mempool logs. Database clean completed.",
      "Shield validator #12 successfully verified contract hash signature.",
      "Network warning: High gas fee detected on ERC20 bridge. Automatically switching routing paths."
    ];

    const logTimer = setInterval(() => {
      const selectedLog = `[${new Date().toLocaleTimeString()}] ${randomLogs[Math.floor(Math.random() * randomLogs.length)]}`;
      setLogs(prev => [...prev, selectedLog]);
    }, 6000);

    return () => clearInterval(logTimer);
  }, []);

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const command = inputVal.trim().toLowerCase();
    let response = '';

    if (command === 'help') {
      response = 'AVAILABLE DAEMONS: clear | diagnostics | node-reboot | status | gas-optimize';
    } else if (command === 'clear') {
      setLogs([]);
      setInputVal('');
      return;
    } else if (command === 'diagnostics') {
      response = `DIAGNOSTIC REPORT // STATUS: ${sysStatus} | NODES: ${activeNodes}/20 | GAS: ${gasPrice} GWEI | MEMPOOL_QUEUE: ${txPool} TXS. ALL VALIDADOR CHANNELS NOMINAL.`;
    } else if (command === 'node-reboot') {
      response = 'COMMAND LOADED: REBOOTING NODE CHANNELS... STATUS: NOMINAL (20/20 ONLINE).';
      setActiveNodes(20);
    } else if (command === 'status') {
      response = `OPERATIONAL DEPLOYMENT LEVEL: v4.3.0 // SHIELD PROTOCOL BRIDGE ESTABLISHED. STATUS: SECURE.`;
    } else if (command === 'gas-optimize') {
      response = 'OPTIMIZING PATHROUTING FOR MINIMUM GAS CONTEXT... INDEX COMPLETED.';
      setGasPrice(32);
    } else {
      response = `SHELL ERROR: COMMAND NOT RECOGNIZED: "${command}". TYPE 'help' FOR LIST OF SYSTEM DAEMONS.`;
    }

    setLogs(prev => [...prev, `$ ${inputVal}`, `> ${response}`]);
    setInputVal('');
  };

  const executeQuickDaemon = (cmd) => {
    setInputVal(cmd);
    setTimeout(() => {
      const e = { preventDefault: () => {} };
      setInputVal(cmd);
    }, 50);
  };

  return (
    <section className="py-28 relative cyber-grid select-none min-h-[85svh] flex flex-col justify-center bg-black/40">
      <div className="cyber-grid-radial absolute inset-0 -z-10" />
      <div className="absolute top-[20%] left-[5%] w-96 h-96 bg-green-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 w-full z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 font-mono text-[9px] uppercase tracking-widest">
            <Cpu size={10} className="animate-spin" />
            <span>OPERATIONAL TELEMETRY PANEL</span>
          </div>
          <h2 className="text-3xl font-extrabold uppercase font-mono tracking-tight text-white">
            Simulated Operator <br/>
            <span className="bg-gradient-to-r from-green-500 to-emerald-400 bg-clip-text text-transparent neon-text-green">
              Terminal Console
            </span>
          </h2>
          <p className="text-zinc-400 text-xs md:text-sm leading-relaxed">
            Diagnose active blockchain validator paths, monitor queue loads, test system reboots, and execute custom shell terminal commands inside our mock fintech panel.
          </p>
        </div>

        {/* Console layout grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Telemetry Widgets */}
          <div className="lg:col-span-4 flex flex-col gap-4 text-left">
            
            {/* Widget 1: System Indicators */}
            <div className="p-5 rounded-2xl glass-panel-neon border border-green-500/15 font-mono space-y-4">
              <span className="block text-[8px] text-zinc-500 font-bold uppercase tracking-wider">SYSTEM DIAGNOSTICS</span>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3.5 bg-zinc-950/70 border border-zinc-850 rounded-xl space-y-1">
                  <span className="block text-[8px] text-zinc-500 uppercase">SYSTEM UNIT</span>
                  <span className="text-sm font-extrabold text-green-500 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
                    {sysStatus}
                  </span>
                </div>

                <div className="p-3.5 bg-zinc-950/70 border border-zinc-850 rounded-xl space-y-1">
                  <span className="block text-[8px] text-zinc-500 uppercase">ACTIVE NODES</span>
                  <span className="text-sm font-extrabold text-white">{activeNodes} / 20</span>
                </div>

                <div className="p-3.5 bg-zinc-950/70 border border-zinc-850 rounded-xl space-y-1">
                  <span className="block text-[8px] text-zinc-500 uppercase">GAS INDEX</span>
                  <span className="text-sm font-extrabold text-cyan-400">{gasPrice} GWEI</span>
                </div>

                <div className="p-3.5 bg-zinc-950/70 border border-zinc-850 rounded-xl space-y-1">
                  <span className="block text-[8px] text-zinc-500 uppercase">MEMPOOL QUEUE</span>
                  <span className="text-sm font-extrabold text-white">{txPool} TXS</span>
                </div>
              </div>

              <div className="p-3.5 bg-zinc-950/70 border border-zinc-850 rounded-xl space-y-1">
                <span className="block text-[8px] text-zinc-500 uppercase">CURRENT BLOCKHEIGHT</span>
                <span className="text-xs font-black text-zinc-300 break-all select-all">{blockHeight}</span>
              </div>
            </div>

            {/* Widget 2: Quick Daemon Buttons */}
            <div className="p-5 rounded-2xl glass-panel border border-zinc-800/80 font-mono space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <span className="block text-[8px] text-zinc-500 font-bold uppercase tracking-wider mb-2">QUICK DAEMONS</span>
                <p className="text-[10px] text-zinc-500 leading-normal mb-4">Click below to load predefined diagnostic commands straight to prompt.</p>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={() => executeQuickDaemon('diagnostics')}
                  className="w-full py-2.5 rounded-xl border border-zinc-800 bg-zinc-950 hover:bg-zinc-900/60 text-[10px] font-bold text-zinc-300 hover:text-white transition-colors cursor-pointer text-left px-4 flex justify-between items-center"
                >
                  <span>EXECUTE: DIAGNOSTICS</span>
                  <Play size={10} className="text-green-500" />
                </button>
                <button
                  onClick={() => executeQuickDaemon('node-reboot')}
                  className="w-full py-2.5 rounded-xl border border-zinc-800 bg-zinc-950 hover:bg-zinc-900/60 text-[10px] font-bold text-zinc-300 hover:text-white transition-colors cursor-pointer text-left px-4 flex justify-between items-center"
                >
                  <span>EXECUTE: NODE-REBOOT</span>
                  <Play size={10} className="text-green-500" />
                </button>
                <button
                  onClick={() => executeQuickDaemon('gas-optimize')}
                  className="w-full py-2.5 rounded-xl border border-zinc-800 bg-zinc-950 hover:bg-zinc-900/60 text-[10px] font-bold text-zinc-300 hover:text-white transition-colors cursor-pointer text-left px-4 flex justify-between items-center"
                >
                  <span>EXECUTE: GAS-OPTIMIZE</span>
                  <Play size={10} className="text-green-500" />
                </button>
              </div>
            </div>

          </div>

          {/* Right Shell Terminal Form */}
          <div className="lg:col-span-8 p-6 rounded-3xl glass-panel-neon border border-green-500/15 flex flex-col justify-between text-left relative overflow-hidden shadow-[0_15px_35px_rgba(34,197,94,0.1)] min-h-[380px]">
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-green-500"></div>
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-green-500"></div>

            {/* Scrollable logs */}
            <div className="bg-black/60 border border-zinc-850 p-4 rounded-xl font-mono text-[10px] text-zinc-400 space-y-2 h-72 overflow-y-auto scrollbar-thin shadow-[inset_0_0_15px_rgba(0,0,0,0.85)]">
              <div className="flex items-center gap-1.5 text-green-500/80 border-b border-zinc-850 pb-2 mb-2">
                <TermIcon size={12} />
                <span>OPERATOR_SHELL_BRIDGE // V4.3</span>
              </div>
              
              {logs.map((log, i) => (
                <div key={i} className="flex items-start gap-1">
                  {log.startsWith('$ ') ? (
                    <span className="text-zinc-500">&gt;</span>
                  ) : log.startsWith('> ') ? (
                    <span className="text-green-400 font-bold select-none">[LOG]</span>
                  ) : (
                    <span className="text-green-500 select-none">●</span>
                  )}
                  <span className={log.startsWith('$ ') ? 'text-green-400 font-bold' : log.startsWith('> ') ? 'text-zinc-300' : 'text-zinc-500'}>
                    {log.replace(/^\$ |^> /, '')}
                  </span>
                </div>
              ))}
              <div ref={terminalEndRef} />
            </div>

            {/* Input Form command submission */}
            <form onSubmit={handleCommandSubmit} className="mt-4 flex gap-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="Enter operator daemon command (type 'help' for options)..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-green-500 transition-colors font-mono"
                />
                <span className="absolute right-3.5 top-3.5 text-[8px] font-bold font-mono text-zinc-600 uppercase">SYS_CONSOLE</span>
              </div>
              <button
                type="submit"
                className="px-6 rounded-xl font-mono text-xs font-bold bg-green-500 hover:bg-green-400 text-black shadow-[0_0_15px_rgba(34,197,94,0.3)] transition-all cursor-pointer flex items-center justify-center shrink-0 uppercase tracking-wider"
              >
                RUN
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
