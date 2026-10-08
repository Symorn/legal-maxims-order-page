import React from 'react';
import { Star, MessageSquareQuote, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS } from '../data/bookData';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto scroll-mt-20">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-orange-500/30 text-orange-400 text-xs font-semibold mb-4">
          <MessageSquareQuote className="w-4 h-4" />
          <span>Reader & Faculty Endorsements</span>
        </div>
        <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-wide">
          Praise From The Bench & Bar
        </h2>
        <p className="mt-4 font-lora text-base sm:text-lg text-zinc-300 leading-relaxed">
          From legal practitioners to university lecturers and undergraduate moot court competitors, see how <em>Legal Maxims Simplified</em> is transforming legal comprehension.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {TESTIMONIALS.map((t, idx) => (
          <div
            key={idx}
            className="bg-[#13141c] border border-zinc-800 hover:border-zinc-700 p-6 sm:p-7 rounded-2xl flex flex-col justify-between shadow-lg transition"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/20 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Verified Legal Reader
                </span>
              </div>

              <p className="font-lora text-sm sm:text-base text-zinc-200 leading-relaxed italic">
                &ldquo;{t.comment}&rdquo;
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-zinc-800 text-orange-400 font-cinzel font-bold flex items-center justify-center text-sm border border-zinc-700">
                {t.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
              </div>
              <div>
                <h4 className="font-bold text-white text-sm font-sans-ui">{t.name}</h4>
                <p className="text-xs text-orange-400">{t.role}</p>
                <p className="text-[11px] text-zinc-500">{t.institution}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
