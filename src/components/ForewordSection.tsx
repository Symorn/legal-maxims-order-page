import React from 'react';
import { Award, Quote, CheckCircle, BookOpen, ExternalLink } from 'lucide-react';
import { BOOK_INFO } from '../data/bookData';

interface ForewordSectionProps {
  onOpenSample: () => void;
}

export const ForewordSection: React.FC<ForewordSectionProps> = ({ onOpenSample }) => {
  return (
    <section id="foreword" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto scroll-mt-20">
      <div className="bg-gradient-to-br from-[#161722] via-[#12131b] to-[#1a1410] border border-orange-500/30 rounded-3xl p-6 sm:p-10 md:p-14 relative overflow-hidden shadow-2xl">
        
        {/* Glow ambient background */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Left: Distinguished Foreword Author Card (4 cols) */}
          <div className="lg:col-span-4 flex flex-col items-center text-center p-6 bg-black/40 rounded-2xl border border-zinc-800 backdrop-blur-xs">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-600 via-orange-500 to-amber-400 p-1 shadow-xl mb-4">
              <div className="w-full h-full rounded-full bg-[#121319] flex items-center justify-center font-cinzel text-2xl font-bold text-amber-300">
                PMA
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-mono uppercase tracking-wider mb-2">
              <Award className="w-3.5 h-3.5" />
              <span>Foreword Contributor</span>
            </div>

            <h3 className="font-cinzel text-lg sm:text-xl font-bold text-white leading-tight">
              Professor the Rt Hon
              <br />
              Mojeed Olujinmi A. Alabi
            </h3>

            <p className="text-xs text-orange-400 font-sans-ui font-semibold mt-1">
              PhD Political Science, PhD Law, BL
            </p>

            <p className="text-xs text-zinc-300 font-lora mt-2">
              Professor & Provost, College of Law,
              <br />
              Osun State University
            </p>

            <div className="mt-5 pt-4 border-t border-zinc-800 text-[11px] text-zinc-400 text-left space-y-1.5 w-full">
              <p className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Distinguished Legal Jurisprudent</span>
              </p>
              <p className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Former Speaker, Osun State House of Assembly</span>
              </p>
              <p className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Former Member, House of Representatives</span>
              </p>
            </div>
          </div>

          {/* Right: The Foreword Text & Commendation (8 cols) */}
          <div className="lg:col-span-8 space-y-5">
            <div className="flex items-center gap-3 text-orange-400">
              <Quote className="w-8 h-8 opacity-80" />
              <span className="font-cinzel text-sm sm:text-base font-bold tracking-widest uppercase">
                From The Official Foreword
              </span>
            </div>

            <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-white leading-tight">
              &ldquo;A companion worth the price for law students, teachers, lawyers and curious minds alike.&rdquo;
            </h3>

            <div className="space-y-4 font-lora text-zinc-300 text-sm sm:text-base leading-relaxed">
              <p>
                &ldquo;One area of the Law as a profession, which the legally-trained and the layman alike find intriguing, instilling both fears and admiration in those seeking to know more about the subject matter, is the ease with which the vocabulary of teaching and learning is replete with what are often termed legalese or legal jargons...&rdquo;
              </p>

              <p>
                &ldquo;For the professionals of the Law, the attraction of legal maxims, mostly expressed in Latin, lies in the ability to use simple phrases or a combination of them to express ideas that could take sentences to articulate... They have become part and parcel of the language of the Law.&rdquo;
              </p>

              <p className="bg-[#181924] p-4 rounded-xl border-l-2 border-orange-500 text-zinc-200 italic">
                &ldquo;This is where this book becomes relevant and important. The author does a good job of the self-imposed assignment by not only embarking on an extensive compilation of these legal maxims but also goes further to give their meanings and how they could be used to reveal the import of what they stand for with examples.&rdquo;
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onOpenSample}
                className="px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white text-xs font-semibold flex items-center gap-2 border border-zinc-700 transition"
              >
                <BookOpen className="w-3.5 h-3.5 text-orange-400" />
                <span>Read Complete Foreword (Pages vi - viii)</span>
              </button>

              <a
                href="#order-section"
                className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold transition shadow-md"
              >
                Order Recommended Copy
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
