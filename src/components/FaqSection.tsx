import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Phone, MessageSquare } from 'lucide-react';
import { FAQS, BOOK_INFO } from '../data/bookData';

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 max-w-5xl mx-auto scroll-mt-20">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-orange-500/30 text-orange-400 text-xs font-semibold mb-4">
          <HelpCircle className="w-4 h-4" />
          <span>Need Answers?</span>
        </div>
        <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white tracking-wide">
          Frequently Asked Questions
        </h2>
        <p className="mt-4 font-lora text-base text-zinc-300 leading-relaxed">
          Everything you need to know about purchasing, shipping timelines across Nigeria, eBooks, and law faculty discounts.
        </p>
      </div>

      <div className="space-y-3.5">
        {FAQS.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all overflow-hidden ${
                isOpen ? 'bg-[#151722] border-orange-500/50 shadow-md' : 'bg-[#12131a] border-zinc-800'
              }`}
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="w-full py-4 px-6 text-left flex items-center justify-between gap-4 font-sans-ui text-sm sm:text-base font-semibold text-white cursor-pointer"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-orange-400 transition-transform duration-200 shrink-0 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-6 pb-5 pt-1 text-xs sm:text-sm font-lora text-zinc-300 leading-relaxed border-t border-zinc-800/60">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Still Have Questions Box */}
      <div className="mt-12 bg-gradient-to-r from-orange-950/30 via-zinc-900 to-amber-950/30 border border-zinc-800 p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <h4 className="font-cinzel text-base font-bold text-white">Have a special enquiry or faculty order?</h4>
          <p className="text-xs text-zinc-400 font-lora mt-0.5">
            Reach out directly to author Sharon Olaniyi on WhatsApp or telephone.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={`https://wa.me/${BOOK_INFO.authorWhatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 transition shadow-md"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Chat on WhatsApp</span>
          </a>

          <a
            href={`tel:${BOOK_INFO.authorPhone}`}
            className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold flex items-center gap-2 border border-zinc-700 transition"
          >
            <Phone className="w-3.5 h-3.5 text-orange-400" />
            <span>Call Author</span>
          </a>
        </div>
      </div>
    </section>
  );
};
