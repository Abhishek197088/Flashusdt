import React, { useState, useEffect } from 'react';
import { Database, HelpCircle, RefreshCw, CheckCircle, ShieldAlert, Cpu, Terminal, ArrowRightLeft } from 'lucide-react';

export default function ResalePortal() {
  const [flashTxId, setFlashTxId] = useState('');
  const [refundWallet, setRefundWallet] = useState('');
  const [email, setEmail] = useState('');
  const [nodeType, setNodeType] = useState('premium');
  
  // Simulation states
  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState(0);
  const [success, setSuccess] = useState(false);
  const [logFeed, setLogFeed] = useState([]);

  const nodeRebates = {
    starter: { rate: 0.50, yieldVal: '4,000 Flash USDT', refundVal: '50 USDT' },
    premium: { rate: 0.70, yieldVal: '7,000 Flash USDT', refundVal: '105 USDT' },
    enterprise: { rate: 0.85, yieldVal: '18,000 Flash USDT', refundVal: '255 USDT' }
  };

  const resaleSteps = [
    "QUERYING TRANSIT MEMPOOL FOR TRANSACTION HASH...",
    "EXTRACTING SMART CONTRACT FLASH METADATA...",
    "VERIFYING TOKEN BALANCE INTEGRITY...",
    "COMMITTING TOKEN BURN CONTRACT EXECUTION...",
    "DISPATCHING REFUND ROUTE ON SELECTED MAINNET...",
    "TRADE COMPLETED. MAINNET SETTLED SUCCESS."
  ];

  useEffect(() => {
    if (loading && stage < resaleSteps.length) {
      const timer = setTimeout(() => {
        setLogFeed(prev => [...prev, resaleSteps[stage]]);
        setStage(prev => prev + 1);
      }, 1800);
      return () => clearTimeout(timer);
    } else if (loading && stage === resaleSteps.length) {
      setLoading(false);
      setSuccess(true);
    }
  }, [loading, stage]);

  const handleResaleSubmit = (e) => {
    e.preventDefault();
    if (!flashTxId.trim() || !refundWallet.trim() || !email.trim()) return;
    
    setLoading(true);
    setStage(0);
    setSuccess(false);
    setLogFeed(["INITIALIZING INTER-CHAIN RESALE CONSOLE..."]);
  };

  return (
    <section className="py-28 relative cyber-grid select-none min-h-[85svh] flex flex-col justify-center">
      <div className="cyber-grid-radial absolute inset-0 -z-10" />
      <div className="absolute top-[20%] right-[10%] w-80 h-80 bg-green-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 w-full z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-[9px] uppercase tracking-widest">
            <ArrowRightLeft size={10} />
            <span>LIQUIDITY RESALE BRIDGE</span>
          </div>
          <h2 className="text-3xl font-extrabold uppercase font-mono tracking-tight text-white">
            Simulated Flash <br/>
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent neon-text-cyan">
              USDT Resale Portal
            </span>
          </h2>
          <p className="text-zinc-400 text-xs md:text-sm leading-relaxed">
            Need to swap your unused Flash USDT nodes back? Our built-in resale engine scans the ledger, incinerates active contract keys, and issues a standard USDT rebate to your wallet.
          </p>
        </div>

        {/* Swap Panel Frame */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Inputs Form */}
          <div className="md:col-span-7 p-6 rounded-3xl glass-panel-cyan border border-cyan-500/15 flex flex-col justify-between text-left relative overflow-hidden shadow-[0_15px_35px_rgba(6,182,212,0.1)]">
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-500"></div>
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-500"></div>

            {success ? (
              /* Success Panel Screen */
              <div className="space-y-6 py-6 text-center my-auto">
                <div className="w-14 h-14 bg-cyan-500/10 border border-cyan-500/40 text-cyan-400 rounded-full flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(6,182,212,0.3)] animate-pulse">
                  <CheckCircle size={28} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-md font-bold uppercase font-mono text-cyan-400">Resale Liquidated successfully</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed max-w-sm mx-auto">
                    Validator nodes completed contract incineration. A rebate of <span className="text-white font-bold">{nodeRebates[nodeType].refundVal}</span> has been dispatched to target wallet.
                  </p>
                </div>
                <button
                  onClick={() => setSuccess(false)}
                  className="px-6 py-2.5 rounded-xl font-mono text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-black shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all cursor-pointer"
                >
                  LOAD SWAP MODULE
                </button>
              </div>
            ) : loading ? (
              /* Processing Stepper Screen */
              <div className="space-y-6 py-4 my-auto flex flex-col justify-center h-full">
                <div className="flex flex-col items-center gap-3">
                  <RefreshCw size={22} className="animate-spin text-cyan-400" />
                  <span className="text-[10px] font-mono font-bold text-white tracking-widest">EXECUTING SMART-CONTRACT CONTRACT INCINERATION</span>
                </div>
                
                <div className="bg-black/50 border border-zinc-850 p-4 rounded-xl font-mono text-[9px] text-zinc-400 space-y-1.5 max-w-md mx-auto w-full">
                  <div className="flex items-center gap-1.5 text-cyan-500/80 border-b border-zinc-850 pb-1.5 mb-1">
                    <Terminal size={10} />
                    <span>BURN_CONTRACT_INTERFACE</span>
                  </div>
                  {logFeed.map((log, i) => (
                    <div key={i} className="flex gap-1.5">
                      <span className="text-cyan-500 font-bold select-none">&gt;&gt;</span>
                      <span className={i === logFeed.length - 1 ? 'text-white font-bold' : 'text-zinc-650'}>{log}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* Actual Resale submission form */
              <form onSubmit={handleResaleSubmit} className="space-y-5">
                <div className="space-y-1">
                  <label className="block text-[8px] font-mono text-zinc-500 uppercase">NODE CLASS SELECT:</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['starter', 'premium', 'enterprise'].map((node) => (
                      <button
                        key={node}
                        type="button"
                        onClick={() => setNodeType(node)}
                        className={`py-2 rounded-xl text-[9px] font-bold font-mono uppercase border transition-all cursor-pointer
                          ${nodeType === node 
                            ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400 shadow-[inset_0_0_8px_rgba(6,182,212,0.15)] font-bold' 
                            : 'bg-zinc-950 border-zinc-850 text-zinc-500 hover:border-zinc-800'}`}
                      >
                        {node}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-[8px] font-mono text-zinc-500 uppercase">FLASH CONTRACT RECEIPT HASH:</label>
                  <input
                    type="text"
                    required
                    value={flashTxId}
                    onChange={(e) => setFlashTxId(e.target.value)}
                    placeholder="Enter Flash USDT Transaction receipt hash (e.g. f_03a88x...)"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[8px] font-mono text-zinc-500 uppercase">REFUND RECIPIENT WALLET (STANDARD USDT):</label>
                  <input
                    type="text"
                    required
                    value={refundWallet}
                    onChange={(e) => setRefundWallet(e.target.value)}
                    placeholder="Target destination address to receive rebate standard USDT"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[8px] font-mono text-zinc-500 uppercase">VERIFICATION ALERT EMAIL:</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Input registration email used during purchase"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors font-mono"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl text-xs font-bold uppercase tracking-wider bg-cyan-500 hover:bg-cyan-400 text-black shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  Initiate Resale Swap
                </button>
              </form>
            )}
          </div>

          {/* Right Pricing breakdown dashboard */}
          <div className="md:col-span-5 flex flex-col gap-4 text-left">
            <div className="p-6 rounded-3xl glass-panel border border-zinc-800 flex-1 flex flex-col justify-between">
              <div>
                <span className="block text-[8px] font-mono tracking-widest text-zinc-500 font-bold uppercase mb-2">ROUTER METRICS</span>
                <h3 className="text-md font-bold uppercase font-mono text-white mb-4">REBATE COEFFICIENT</h3>
                
                <div className="space-y-4 font-mono text-[10px]">
                  <div className="flex justify-between border-b border-zinc-850 pb-2">
                    <span className="text-zinc-500">SELECTED CLASS:</span>
                    <span className="text-white font-bold uppercase">{nodeType} NODE</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-850 pb-2">
                    <span className="text-zinc-500">MINTED YIELD:</span>
                    <span className="text-white font-bold">{nodeRebates[nodeType].yieldVal}</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-850 pb-2">
                    <span className="text-zinc-500">REBATE MULTIPLIER:</span>
                    <span className="text-cyan-400 font-bold">{(nodeRebates[nodeType].rate * 100)}% LIQUIDITY</span>
                  </div>
                  <div className="flex justify-between items-baseline pt-2">
                    <span className="text-zinc-500">STANDARD REBATE:</span>
                    <span className="text-base font-extrabold text-green-400">{nodeRebates[nodeType].refundVal}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 items-start mt-6 text-[9px] text-zinc-500 leading-relaxed border-t border-zinc-850 pt-4">
                <ShieldAlert size={14} className="text-cyan-500 shrink-0 mt-0.5" />
                <span>Reselling triggers contract incineration. Once launched, mock flash tokens bound to target receipt are burned. Refund balances are settled within 30 minutes.</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
