import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'What if my destination wallet address is entered wrong or the transfer fails?',
      answer: 'Our automated validator node bridge implements an active feedback firewall. If the target recipient wallet is invalid or the node broadcast fails, our system automatically flags the transaction, triggers an alert email to your address within 30 minutes, and rebundles your deposit USDT back to your origin wallet.'
    },
    {
      question: 'What is the standard expiration period for Flash USDT tokens?',
      answer: 'Depending on the specific node deployment package selected, our Flash USDT is calibrated with a contract signature longevity ranging from 140 to 160 days. Once the active threshold is reached, the transaction contract naturally expires from validator routing records.'
    },
    {
      question: 'Can I swap or resell my Flash USDT back to the platform?',
      answer: 'Yes! The Flasher platform features an integrated Resale Portal. If you have unused flash capacity or wish to liquidate early, you can input your purchase receipt. Our system incinerates your active contract keys and returns up to 85% of your original deposit fee in standard USDT.'
    },
    {
      question: 'How fast is a standard node transaction verified and delivered?',
      answer: 'Most standard TRC20 and BEP20 node allocations are broadcast, validated by consensus nodes, and delivered wallet-to-wallet within 10-15 minutes after your deposit hash is verified. Priority enterprise nodes operate under a dedicated high-bandwidth queue, completing in under 5 minutes.'
    },
    {
      question: 'Is the Flasher platform secure?',
      answer: 'Absolutely. We enforce state-of-the-art decentralized cryptographic protocols. Deposit pathways and user recipient addresses are shielded, and validator logs are double-signed. No private keys are requested, ensuring total customer asset security.'
    }
  ];

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 relative select-none bg-black/25">
      <div className="absolute bottom-[20%] right-[10%] w-80 h-80 bg-green-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 font-mono text-[9px] uppercase tracking-widest">
            <span>QUESTION DESK</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold uppercase font-mono tracking-tight text-white">
            Do You Have Any <br/>
            <span className="bg-gradient-to-r from-green-500 to-emerald-400 bg-clip-text text-transparent neon-text-green">
              Kind of Questions?
            </span>
          </h2>
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
            We are here to explain node speeds, contract expiration rules, and refund parameters clearly to support your blockchain testing.
          </p>
        </div>

        {/* Accordions List */}
        <div className="space-y-4 max-w-3xl mx-auto text-left">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-300 relative overflow-hidden
                  ${isOpen 
                    ? 'bg-zinc-950/65 border-green-500/30 shadow-[0_0_20px_rgba(34,197,94,0.08)]' 
                    : 'bg-zinc-950/40 border-zinc-850 hover:border-zinc-800'}`}
              >
                {/* Accordion header clicker */}
                <button
                  onClick={() => handleToggle(idx)}
                  className="w-full p-6 flex justify-between items-center gap-4 cursor-pointer text-left focus:outline-none"
                >
                  <h3 className={`text-xs md:text-sm font-bold uppercase font-mono tracking-wider transition-colors duration-300 ${isOpen ? 'text-green-400' : 'text-white'}`}>
                    {faq.question}
                  </h3>
                  <div className={`p-1.5 rounded-lg border shrink-0 transition-colors
                    ${isOpen ? 'bg-green-500/10 border-green-500/30 text-green-400' : 'bg-zinc-900 border-zinc-850 text-zinc-500'}`}>
                    {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                  </div>
                </button>

                {/* Animated accordion content body */}
                <div 
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-56 opacity-100 border-t border-zinc-850/60' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="p-6 text-zinc-400 text-xs md:text-sm leading-relaxed font-mono">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
