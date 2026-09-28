import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, MessageCircleQuestion, PhoneCall } from 'lucide-react';
import { FAQ_DATA, TOURNAMENT_INFO } from '../data/tournamentData';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section id="faq" className="py-20 bg-[#020a17] relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs sm:text-sm font-bold tracking-widest uppercase">
            <HelpCircle className="w-4 h-4 text-amber-400" />
            <span>QUICK ANSWERS</span>
          </div>

          <h2 className="font-heading font-black text-4xl sm:text-5xl text-white uppercase tracking-tight">
            FREQUENTLY ASKED <span className="text-amber-400">QUESTIONS</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base font-medium">
            Have questions regarding match rules, age verification, player rosters or tournament prizes?
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3.5">
          {FAQ_DATA.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-slate-900/90 border-amber-400/50 shadow-lg shadow-amber-400/5'
                    : 'bg-slate-900/50 border-white/10 hover:border-white/20'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="font-heading font-bold text-lg sm:text-xl text-white uppercase tracking-wide">
                    {faq.q}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                    isOpen ? 'bg-amber-400 text-slate-950' : 'bg-white/5 text-slate-400'
                  }`}>
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 text-sm text-slate-300 leading-relaxed border-t border-white/5 pt-3 animate-fadeIn">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <div className="mt-10 p-5 rounded-2xl bg-gradient-to-r from-red-950/40 via-slate-900 to-amber-950/40 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-heading font-black text-lg text-white uppercase">
                STILL HAVE QUESTIONS?
              </h4>
              <p className="text-xs text-slate-400">
                Contact our tournament helpdesk directly: {TOURNAMENT_INFO.contactNumbers.join(' / ')}
              </p>
            </div>
          </div>

          <a
            href={`tel:${TOURNAMENT_INFO.contactNumbers[0].replace(/\s/g, '')}`}
            className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-heading font-bold text-xs uppercase tracking-wider transition-all shadow-md shrink-0"
          >
            Call Helpdesk Now
          </a>
        </div>

      </div>
    </section>
  );
}
