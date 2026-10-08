import React from 'react';
import { ShoppingBag, BookOpen, Star, CheckCircle, Award, Sparkles, ArrowRight } from 'lucide-react';
import { BookCover } from './BookCover';
import { BOOK_INFO } from '../data/bookData';

interface HeroProps {
  onOpenSample: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenSample }) => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-4 sm:px-6 max-w-7xl mx-auto overflow-hidden">
      {/* Background ambient lighting orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-orange-600/15 via-amber-500/10 to-transparent rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-orange-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Left Column: Headline & Value Proposition (7 cols) */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left relative z-10">
          
          {/* Top category / prestige pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-orange-500/40 shadow-lg shadow-orange-950/20">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
            <span className="text-xs font-semibold text-zinc-200">
              New 2026 Legal Reference Handbook
            </span>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-orange-500/20 text-orange-400 font-bold">
              Available Now
            </span>
          </div>

          {/* Book Title with High-Contrast Legal Styling */}
          <div>
            <h1 className="font-cinzel text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.08]">
              LEGAL MAXIMS
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-amber-400">
                SIMPLIFIED
              </span>
            </h1>

            <p className="font-lora text-lg sm:text-xl md:text-2xl italic text-zinc-300 mt-2 font-medium">
              A Practical Guide For Everyone
            </p>
          </div>

          {/* Author & Foreword Credits */}
          <div className="p-4 rounded-2xl bg-[#13141d]/90 border border-zinc-800/80 backdrop-blur-sm max-w-xl mx-auto lg:mx-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-[11px] font-sans-ui text-zinc-400 uppercase tracking-widest">
                Authored by
              </p>
              <p className="font-cinzel text-base font-bold text-white mt-0.5">
                SHARON O. OLANIYI
              </p>
              <p className="text-xs text-orange-400 font-medium">
                Founder, LEX Mentors • Osun State University Alumna
              </p>
            </div>

            <div className="sm:border-l sm:border-zinc-800 sm:pl-4">
              <p className="text-[11px] font-sans-ui text-zinc-400 uppercase tracking-widest">
                Foreword by
              </p>
              <p className="font-cinzel text-sm sm:text-[15px] font-bold text-amber-300 mt-0.5">
                Prof. Mojeed Olujinmi Alabi
              </p>
              <p className="text-[11px] text-zinc-400 font-lora italic">
                Provost, College of Law, Osun State University
              </p>
            </div>
          </div>

          {/* Brief Description */}
          <p className="font-lora text-base sm:text-lg text-zinc-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
            Centuries of Latin jurisprudence distilled into plain English. 
            No more rote memorization without context: understand the principle, see the Nigerian courtroom application, and argue with confidence.
          </p>

          {/* Key Metric Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 max-w-xl mx-auto lg:mx-0">
            <div className="bg-[#12131a] p-3 rounded-xl border border-zinc-800 text-center">
              <p className="font-mono text-xl font-bold text-orange-400">{BOOK_INFO.maximsCount}</p>
              <p className="text-[10px] text-zinc-400 uppercase tracking-wider mt-0.5">Latin Maxims</p>
            </div>
            <div className="bg-[#12131a] p-3 rounded-xl border border-zinc-800 text-center">
              <p className="font-mono text-xl font-bold text-amber-400">{BOOK_INFO.pagesCount}</p>
              <p className="text-[10px] text-zinc-400 uppercase tracking-wider mt-0.5">Pages of Law</p>
            </div>
            <div className="bg-[#12131a] p-3 rounded-xl border border-zinc-800 text-center">
              <p className="font-mono text-xl font-bold text-emerald-400">10+</p>
              <p className="text-[10px] text-zinc-400 uppercase tracking-wider mt-0.5">Subject Areas</p>
            </div>
            <div className="bg-[#12131a] p-3 rounded-xl border border-zinc-800 text-center">
              <p className="font-mono text-xl font-bold text-sky-400">100%</p>
              <p className="text-[10px] text-zinc-400 uppercase tracking-wider mt-0.5">Relatable Cases</p>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
            <a
              href="#order-section"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold text-base shadow-xl shadow-orange-600/25 flex items-center justify-center gap-2.5 transition transform active:scale-95"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Order Now (From ₦5,000)</span>
            </a>

            <button
              type="button"
              onClick={onOpenSample}
              className="w-full sm:w-auto px-6 py-4 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 hover:text-white font-semibold text-sm border border-zinc-700/80 flex items-center justify-center gap-2 transition"
            >
              <BookOpen className="w-4 h-4 text-orange-400" />
              <span>Read Free Sample Pages</span>
            </button>
          </div>

          {/* Rating and Trust Proof */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 text-xs text-zinc-400">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <span>5.0 Star Rating by Law Students, Lecturers & Practitioners</span>
          </div>
        </div>

        {/* Right Column: 3D Interactive Book Presentation (5 cols) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
          <BookCover onOpenSample={onOpenSample} interactive={true} />
        </div>
      </div>

      {/* Foreword Spotlight Teaser Banner */}
      <div className="mt-16 bg-gradient-to-r from-zinc-900/90 via-[#181924]/90 to-zinc-900/90 border border-zinc-800 rounded-2xl p-6 sm:p-7 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 shrink-0 border border-amber-500/20">
              <Award className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-semibold">
                Official Foreword Commendation
              </span>
              <p className="font-lora text-sm sm:text-base text-zinc-200 italic leading-relaxed">
                &ldquo;It is written in simple and plain English as a practical guide for law students, law teachers, lawyers and other persons that are interested in knowing the law... a companion worth the price.&rdquo;
              </p>
              <p className="text-xs text-zinc-400 font-sans-ui pt-1">
                — <span className="font-semibold text-white">Professor the Rt Hon Mojeed Olujinmi A. Alabi</span> (PhD Political Science, PhD Law, BL), Provost, College of Law, Osun State University
              </p>
            </div>
          </div>

          <a
            href="#foreword"
            className="shrink-0 px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-300 hover:text-white border border-zinc-700 flex items-center gap-1.5 transition"
          >
            <span>Read Full Foreword</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
