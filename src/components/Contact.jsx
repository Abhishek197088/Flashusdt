import React, { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !msg.trim()) return;
    
    // Simulate support ticket dispatch
    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setMsg('');
    }, 100);
  };

  return (
    <section className="py-24 relative select-none">
      <div className="absolute top-[10%] left-[5%] w-96 h-96 bg-green-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 font-mono text-[9px] uppercase tracking-widest">
            <span>OPERATIONS CONTACT</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold uppercase font-mono tracking-tight text-white">
            Connect With Our <br/>
            <span className="bg-gradient-to-r from-green-500 to-emerald-400 bg-clip-text text-transparent neon-text-green">
              Technical Node Desk
            </span>
          </h2>
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
            Need custom volume plans, API integrations, or node server diagnostics? Drop our technical operations center a message.
          </p>
        </div>

        {/* Form Container */}
        <div className="max-w-2xl mx-auto glass-panel rounded-3xl p-8 border border-zinc-800/80 relative overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.35)]">
          {/* Top border glowing flare */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-green-500"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-green-500"></div>

          {submitted ? (
            /* Success confirmation card */
            <div className="py-12 text-center space-y-5 animate-fade-in">
              <div className="w-14 h-14 bg-green-500/10 border border-green-500/40 text-green-400 rounded-full flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                <CheckCircle2 size={28} className="stroke-[2.5]" />
              </div>
              <div className="space-y-2">
                <h3 className="text-md font-bold uppercase font-mono text-green-400">Message Dispatched successfully</h3>
                <p className="text-xs text-zinc-400 max-w-sm mx-auto leading-relaxed font-mono">
                  Operational Ticket #TKT-{Math.floor(Math.random() * 90000 + 10000)} has been generated. Our network engineers will respond via email within 2 hours.
                </p>
              </div>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 rounded-xl font-mono text-xs font-bold bg-green-500 hover:bg-green-400 text-black shadow-[0_0_15px_rgba(34,197,94,0.35)] transition-all cursor-pointer"
              >
                OPEN CONTACT DESK
              </button>
            </div>
          ) : (
            /* Feedback Input Forms */
            <form onSubmit={handleSubmit} className="space-y-5 text-left font-mono text-[10px]">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="block text-[8px] text-zinc-500 uppercase">OPERATOR NAME:</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-green-500 transition-colors"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="block text-[8px] text-zinc-500 uppercase">CONTACT EMAIL:</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-green-500 transition-colors"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label className="block text-[8px] text-zinc-500 uppercase">TICKET DESCRIPTION:</label>
                <textarea
                  required
                  rows={4}
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  placeholder="Outline your node technical request or API volume query..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-green-500 transition-colors resize-none scrollbar-thin"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl text-xs font-bold uppercase tracking-wider bg-green-500 hover:bg-green-400 text-black shadow-[0_0_15px_rgba(34,197,94,0.3)] hover:shadow-[0_0_25px_rgba(34,197,94,0.5)] transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Dispatch Support Ticket</span>
                <Send size={12} />
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}
