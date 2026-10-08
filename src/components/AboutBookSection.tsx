import React, { useState } from 'react';
import { BookOpen, Check, Target, Compass, Sparkles, Layers, GraduationCap, Briefcase, Award } from 'lucide-react';
import { BOOK_INFO } from '../data/bookData';

export const AboutBookSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'why' | 'structure' | 'subjects'>('why');

  const subjectBreakdown = [
    { title: "Civil Procedure & Court Practice", count: "58 Maxims", desc: "Writs, jurisdiction, res judicata, court powers, standing" },
    { title: "Natural Justice & Jurisprudence", count: "40 Maxims", desc: "Audi alteram partem, impartiality, rule of law, equity" },
    { title: "Contract Law", count: "38 Maxims", desc: "Offer & acceptance, consensus ad idem, pacta sunt servanda, void ab initio" },
    { title: "Constitutional & Public Law", count: "30 Maxims", desc: "Sovereignty, delegated powers, habeas corpus, mandamus, public interest" },
    { title: "Criminal Law", count: "30 Maxims", desc: "Actus reus & mens rea, innocence presumption, alibi, double jeopardy" },
    { title: "Law of Evidence", count: "27 Maxims", desc: "Burden of proof, dying declarations, res gestae, witness credibility" },
    { title: "Equity and Trusts", count: "27 Maxims", desc: "Clean hands, ubi jus ibi remedium, equitable maxims & remedies" },
    { title: "Property Law", count: "23 Maxims", desc: "Nemo dat quod non habet, fixtures, possession, ownership, easements" },
    { title: "Law of Succession & Wills", count: "18 Maxims", desc: "Testamentary freedom, heirship, per stirpes, per capita distribution" },
    { title: "Statutory Interpretation", count: "10 Maxims", desc: "Ejusdem generis, expressio unius, purposive construction" },
  ];

  return (
    <section id="about-book" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto scroll-mt-20">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-orange-500/30 text-orange-400 text-xs font-semibold mb-4">
          <BookOpen className="w-4 h-4" />
          <span>Inside The 343 Pages</span>
        </div>
        <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-wide">
          Why This Book Was Written
        </h2>
        <p className="mt-4 font-lora text-base sm:text-lg text-zinc-300 leading-relaxed">
          The guiding philosophy of this work is simple: <em>Law should not be distant or confusing; it should be accessible and practical.</em>
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex p-1 rounded-2xl bg-zinc-900 border border-zinc-800 gap-1">
          <button
            type="button"
            onClick={() => setActiveTab('why')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition ${
              activeTab === 'why'
                ? 'bg-orange-600 text-white shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            The Big Problem & Solution
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('structure')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition ${
              activeTab === 'structure'
                ? 'bg-orange-600 text-white shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            4-Part Anatomy of Each Entry
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('subjects')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition ${
              activeTab === 'subjects'
                ? 'bg-orange-600 text-white shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Subject Coverage (10 Areas)
          </button>
        </div>
      </div>

      {/* TAB 1: WHY THIS BOOK WAS WRITTEN */}
      {activeTab === 'why' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-300">
          <div className="bg-[#13141c] border border-zinc-800 p-6 rounded-2xl relative overflow-hidden group hover:border-orange-500/40 transition">
            <div className="w-12 h-12 rounded-xl bg-orange-600/10 text-orange-400 flex items-center justify-center mb-4 border border-orange-500/20">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="font-cinzel text-lg font-bold text-white mb-2">
              Beyond Blind Memorization
            </h3>
            <p className="font-lora text-sm text-zinc-300 leading-relaxed">
              In most legal texts, maxims are listed but not explained. Students memorize them frantically because they &ldquo;might come out&rdquo; in exams, without ever understanding what they mean or how they apply in reality.
            </p>
          </div>

          <div className="bg-[#13141c] border border-zinc-800 p-6 rounded-2xl relative overflow-hidden group hover:border-orange-500/40 transition">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4 border border-amber-500/20">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="font-cinzel text-lg font-bold text-white mb-2">
              Everyday Nigerian Context
            </h3>
            <p className="font-lora text-sm text-zinc-300 leading-relaxed">
              Every single maxim is paired with a relatable scenario—from landlord-tenant squabbles in Lagos and land boundary disputes in Ibadan to commercial transactions in Kano and administrative proceedings before tribunals.
            </p>
          </div>

          <div className="bg-[#13141c] border border-zinc-800 p-6 rounded-2xl relative overflow-hidden group hover:border-orange-500/40 transition">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4 border border-emerald-500/20">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-cinzel text-lg font-bold text-white mb-2">
              Sharpen Courtroom Submissions
            </h3>
            <p className="font-lora text-sm text-zinc-300 leading-relaxed">
              For practitioners, maxims offer the precise philosophical pivot that persuades judges and sharpens appellate briefs. This book acts as a quick-reference desk companion for the busy litigator.
            </p>
          </div>
        </div>
      )}

      {/* TAB 2: 4-PART ENTRY ANATOMY */}
      {activeTab === 'structure' && (
        <div className="bg-[#13141c] border border-zinc-800 rounded-3xl p-6 sm:p-10 animate-in fade-in duration-300">
          <div className="max-w-3xl mx-auto">
            <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white text-center mb-8">
              Every Maxim in the Book Follows This Clear Pedagogical Architecture:
            </h3>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#181a24] border border-zinc-800 flex items-start gap-4">
                <span className="font-mono text-lg font-bold text-orange-400 w-8 h-8 rounded-lg bg-orange-950/60 flex items-center justify-center shrink-0 border border-orange-500/30">
                  1
                </span>
                <div>
                  <h4 className="font-bold text-white text-sm">The Latin Maxim</h4>
                  <p className="text-xs text-zinc-400 mt-0.5 font-lora">
                    Presented in its traditional, authoritative Latin phrasing as cited in centuries of law reports and judicial opinions.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#181a24] border border-zinc-800 flex items-start gap-4">
                <span className="font-mono text-lg font-bold text-amber-400 w-8 h-8 rounded-lg bg-amber-950/60 flex items-center justify-center shrink-0 border border-amber-500/30">
                  2
                </span>
                <div>
                  <h4 className="font-bold text-white text-sm">Literal Translation</h4>
                  <p className="text-xs text-zinc-400 mt-0.5 font-lora">
                    A direct, word-for-word plain English translation to instantly unlock the original Latin meaning without mystery.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#181a24] border border-zinc-800 flex items-start gap-4">
                <span className="font-mono text-lg font-bold text-sky-400 w-8 h-8 rounded-lg bg-sky-950/60 flex items-center justify-center shrink-0 border border-sky-500/30">
                  3
                </span>
                <div>
                  <h4 className="font-bold text-white text-sm">Clear Explanation</h4>
                  <p className="text-xs text-zinc-400 mt-0.5 font-lora">
                    An in-depth explanation of the underlying legal doctrine, its rationale, statutory boundaries, and exceptions in modern jurisprudence.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#181a24] border border-zinc-800 flex items-start gap-4">
                <span className="font-mono text-lg font-bold text-emerald-400 w-8 h-8 rounded-lg bg-emerald-950/60 flex items-center justify-center shrink-0 border border-emerald-500/30">
                  4
                </span>
                <div>
                  <h4 className="font-bold text-white text-sm">Relatable Case Illustration</h4>
                  <p className="text-xs text-zinc-400 mt-0.5 font-lora">
                    A concrete real-world story featuring everyday transactions, disputes, businesses, and court cases that make the maxim instantly unforgettable.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SUBJECTS */}
      {activeTab === 'subjects' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-in fade-in duration-300">
          {subjectBreakdown.map((item, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-[#13141c] border border-zinc-800 hover:border-zinc-700 transition">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-white text-sm">{item.title}</h4>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-orange-950/70 text-orange-400 border border-orange-500/30 font-bold">
                  {item.count}
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-lora">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
