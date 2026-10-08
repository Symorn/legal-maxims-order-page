import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, BookOpen, Download, Share2, Check } from 'lucide-react';
import { BOOK_INFO } from '../data/bookData';

interface SampleReaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoToOrder: () => void;
}

interface PageContent {
  pageNumber: string;
  title: string;
  subtitle?: string;
  type: 'cover' | 'copyright' | 'dedication' | 'foreword' | 'preface' | 'content' | 'index';
  body: React.ReactNode;
}

export const SampleReaderModal: React.FC<SampleReaderModalProps> = ({
  isOpen,
  onClose,
  onGoToOrder,
}) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  const samplePages: PageContent[] = [
    {
      pageNumber: "Cover",
      title: "Front Cover",
      type: "cover",
      body: (
        <div className="flex flex-col items-center justify-center text-center p-6 bg-[#0a0b0e] text-white rounded-lg border border-zinc-800">
          <div className="w-16 h-16 mb-4 text-orange-400">
            <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" className="w-full h-full">
              <circle cx="50" cy="14" r="5" strokeWidth="2.5" />
              <line x1="50" y1="19" x2="50" y2="84" strokeWidth="3" />
              <path d="M22 34 L78 34" strokeWidth="2.8" strokeLinecap="round" />
              <circle cx="50" cy="34" r="3" fill="currentColor" />
              <line x1="22" y1="34" x2="10" y2="58" strokeWidth="1.5" />
              <line x1="22" y1="34" x2="34" y2="58" strokeWidth="1.5" />
              <path d="M8 58 Q22 66 36 58 Z" strokeWidth="2" fill="currentColor" fillOpacity="0.15" />
              <line x1="78" y1="34" x2="66" y2="58" strokeWidth="1.5" />
              <line x1="78" y1="34" x2="90" y2="58" strokeWidth="1.5" />
              <path d="M64 58 Q78 66 92 58 Z" strokeWidth="2" fill="currentColor" fillOpacity="0.15" />
              <path d="M36 84 L64 84" strokeWidth="3.5" strokeLinecap="round" />
            </svg>
          </div>
          <h2 className="font-cinzel text-3xl font-bold tracking-widest text-white mb-2">
            LEGAL MAXIMS
          </h2>
          <div className="bg-orange-600 text-white font-cinzel text-xs font-black tracking-widest px-4 py-1 rounded-full mb-3">
            ■ SIMPLIFIED ■
          </div>
          <p className="font-lora italic text-sm text-zinc-300 border border-zinc-700 rounded-full px-4 py-0.5 mb-8">
            A Practical Guide For Everyone
          </p>
          <div className="bg-white text-zinc-950 w-full py-3 px-4 rounded mt-auto">
            <p className="font-cinzel text-sm font-bold tracking-widest uppercase">
              SHARON O. OLANIYI
            </p>
            <p className="font-lora text-xs text-zinc-600 italic mt-0.5">
              Foreword by Professor Mojeed Olujinmi Alabi
            </p>
          </div>
        </div>
      )
    },
    {
      pageNumber: "Page iv",
      title: "PREFACE",
      subtitle: "The Need for Practical Clarity",
      type: "preface",
      body: (
        <div className="space-y-4 font-lora text-zinc-300 leading-relaxed text-sm">
          <p className="first-letter:text-3xl first-letter:font-bold first-letter:text-orange-400 first-letter:float-left first-letter:mr-2">
            Latin legal maxims are the distilled wisdom of centuries of jurisprudence. They are brief, memorable statements that capture fundamental principles of law, often expressed in a few words but carrying profound weight.
          </p>
          <p>
            Judges cite them in courtrooms, lawyers rely on them in arguments, and teachers use them to explain doctrines.
          </p>
          <p>
            Yet, for many students and even young practitioners, legal maxims are intimidating. They appear as unfamiliar Latin phrases, often memorized for exams but forgotten soon after. Without context, they remain abstract, detached from the real world of law and practice.
          </p>
          <p className="bg-zinc-900/80 border-l-2 border-orange-500 p-3 italic text-zinc-200">
            &ldquo;This book was written to address that gap. It seeks to demystify legal maxims by presenting them in a clear, practical, and student-friendly format. Each maxim is explained in plain language and illustrated with relatable examples.&rdquo;
          </p>
          <p>
            The guiding philosophy of this work is simple: <em>law should not be distant or confusing; it should be accessible and practical.</em> If this book helps one student understand a maxim better, one young lawyer strengthens an argument, or one lecturer explain a principle more clearly, then it will have served its purpose.
          </p>
        </div>
      )
    },
    {
      pageNumber: "Page vi - viii",
      title: "FOREWORD",
      subtitle: "By Professor the Rt Hon Mojeed Olujinmi A. Alabi",
      type: "foreword",
      body: (
        <div className="space-y-4 font-lora text-zinc-300 leading-relaxed text-sm">
          <p>
            One area of the Law as a profession, which the legally-trained and the layman alike find intriguing, instilling both fears and admiration in those seeking to know more about the subject matter... is the ease with which the vocabulary of teaching and learning is replete with what are often termed legalese or legal jargons.
          </p>
          <p>
            For the professionals of the Law, the attraction of legal maxims, mostly expressed in Latin, lies in the ability to use simple phrases or a combination of them to express ideas that could take sentences to articulate.
          </p>
          <p>
            While some of the legal maxims have become so commonplace that Lawyers and non-Lawyers alike use them with ease on a daily basis, there are many others that are not easily used or easy to comprehend and therefore require specialised knowledge...
          </p>
          <div className="p-3 bg-orange-950/30 border border-orange-500/30 rounded-lg text-orange-200">
            <p className="font-semibold text-white mb-1">From the Provost&apos;s Desk:</p>
            <p className="italic">
              &ldquo;The author does a good job of the self-imposed assignment by not only embarking on an extensive compilation of these legal maxims but also goes further to give their meanings and how they could be used to reveal the import of what they stand for with examples. It is written in simple and plain English as a practical guide... The book is rich, and a broad spectrum of legal practitioners, law teachers, law students and everyone interested in understanding the law in context will find it handy as a companion worth the price.&rdquo;
            </p>
          </div>
          <div className="pt-2 text-right">
            <p className="font-cinzel text-xs font-bold text-white">Professor the Rt Hon Mojeed Olujinmi A. Alabi</p>
            <p className="text-[11px] text-zinc-400 font-sans-ui">PhD Political Science, PhD Law, BL</p>
            <p className="text-[11px] text-orange-400 font-sans-ui">Professor & Provost, College of Law, Osun State University</p>
          </div>
        </div>
      )
    },
    {
      pageNumber: "Page ix - xi",
      title: "WHO NEEDS THIS BOOK?",
      subtitle: "And How to Use It",
      type: "content",
      body: (
        <div className="space-y-3 font-sans-ui text-zinc-300 text-sm">
          <div className="bg-zinc-900 p-3 rounded-lg border border-zinc-800">
            <h4 className="font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500"></span>
              Law Students
            </h4>
            <p className="text-xs text-zinc-400 mt-1 font-lora">
              Move beyond memorization into real understanding. Supports university examinations, Nigerian Law School preparation, moot court practice, and lecture discussions.
            </p>
          </div>

          <div className="bg-zinc-900 p-3 rounded-lg border border-zinc-800">
            <h4 className="font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500"></span>
              Practitioners & Litigators
            </h4>
            <p className="text-xs text-zinc-400 mt-1 font-lora">
              Whether drafting briefs, written submissions, or oral arguments in court, maxims provide the precise turn of phrase that sharpens legal reasoning.
            </p>
          </div>

          <div className="bg-zinc-900 p-3 rounded-lg border border-zinc-800">
            <h4 className="font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500"></span>
              Lecturers & Mentors
            </h4>
            <p className="text-xs text-zinc-400 mt-1 font-lora">
              A comprehensive teaching aid. The plain explanations and everyday Nigerian illustrations bring abstract doctrines to life for mentees and pupils.
            </p>
          </div>

          <div className="bg-zinc-900 p-3 rounded-lg border border-zinc-800">
            <h4 className="font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500"></span>
              4-Step Structure in Every Entry
            </h4>
            <div className="grid grid-cols-2 gap-2 mt-2 text-xs font-mono">
              <span className="bg-black/60 p-1.5 rounded text-orange-300 border border-zinc-800">1. The Latin Maxim</span>
              <span className="bg-black/60 p-1.5 rounded text-zinc-300 border border-zinc-800">2. Literal Translation</span>
              <span className="bg-black/60 p-1.5 rounded text-zinc-300 border border-zinc-800">3. Plain Explanation</span>
              <span className="bg-black/60 p-1.5 rounded text-emerald-300 border border-zinc-800">4. Real-life Scenario</span>
            </div>
          </div>
        </div>
      )
    },
    {
      pageNumber: "Page 19",
      title: "SAMPLE ENTRY: 'A'",
      subtitle: "Ab Initio & Ab Invito",
      type: "content",
      body: (
        <div className="space-y-4">
          {/* Maxim 1 */}
          <div className="bg-zinc-900/90 p-3.5 rounded-lg border border-zinc-800">
            <div className="flex items-baseline justify-between mb-1">
              <h4 className="font-serif font-bold text-base text-orange-400 italic">Ab initio</h4>
              <span className="text-[10px] font-sans-ui bg-orange-500/10 text-orange-400 px-2 py-0.5 rounded">Contract Law</span>
            </div>
            <p className="text-xs text-zinc-400 font-sans-ui mb-2">
              <span className="font-semibold text-zinc-300">Literal Translation:</span> From the beginning.
            </p>
            <p className="text-xs text-zinc-300 font-lora mb-2 leading-relaxed">
              <strong>Explanation:</strong> This maxim means something is void right from the start, not just later on. If an agreement or act is illegal or fundamentally wrong, the law treats it as if it never existed.
            </p>
            <div className="bg-black/50 p-2 rounded text-xs text-emerald-300 font-lora border-l-2 border-emerald-500">
              <span className="font-bold text-white">Illustration:</span> If someone makes a contract to sell stolen goods, that contract is void <em>ab initio</em>—it was never valid from the beginning.
            </div>
          </div>

          {/* Maxim 2 */}
          <div className="bg-zinc-900/90 p-3.5 rounded-lg border border-zinc-800">
            <div className="flex items-baseline justify-between mb-1">
              <h4 className="font-serif font-bold text-base text-orange-400 italic">Ab invito</h4>
              <span className="text-[10px] font-sans-ui bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded">Contract Law</span>
            </div>
            <p className="text-xs text-zinc-400 font-sans-ui mb-2">
              <span className="font-semibold text-zinc-300">Literal Translation:</span> Against one&apos;s will.
            </p>
            <p className="text-xs text-zinc-300 font-lora mb-2 leading-relaxed">
              <strong>Explanation:</strong> Used when something is done to a person without their consent. The law generally protects individuals from being forced into actions or obligations they never agreed to.
            </p>
            <div className="bg-black/50 p-2 rounded text-xs text-emerald-300 font-lora border-l-2 border-emerald-500">
              <span className="font-bold text-white">Illustration:</span> If someone is dragged into signing a contract at gunpoint, it was made <em>ab invito</em>—against their will and the court will not enforce it.
            </div>
          </div>
        </div>
      )
    },
    {
      pageNumber: "Page 22",
      title: "SAMPLE ENTRY: CRIMINAL LAW",
      subtitle: "Actus non facit reum nisi mens sit rea",
      type: "content",
      body: (
        <div className="space-y-4">
          <div className="bg-zinc-900/90 p-4 rounded-lg border border-zinc-800">
            <div className="flex items-baseline justify-between mb-1">
              <h4 className="font-serif font-bold text-lg text-orange-400 italic">Actus non facit reum nisi mens sit rea</h4>
              <span className="text-[10px] font-sans-ui bg-red-500/10 text-red-400 px-2 py-0.5 rounded">Criminal Law</span>
            </div>
            <p className="text-xs text-zinc-400 font-sans-ui mb-2">
              <span className="font-semibold text-zinc-300">Translation:</span> The act is not culpable unless the mind is guilty.
            </p>
            <p className="text-xs text-zinc-300 font-lora mb-3 leading-relaxed">
              <strong>Explanation:</strong> A person is not criminally liable unless there is both a wrongful act (<em>actus reus</em>) and a guilty mind (<em>mens rea</em>). Both elements must be present concurrently for most crimes.
            </p>
            <div className="bg-black/50 p-3 rounded text-xs text-emerald-300 font-lora border-l-2 border-emerald-500">
              <span className="font-bold text-white">Illustration:</span> If someone accidentally takes another person&apos;s umbrella or laptop thinking it is their own, there is no crime of theft, since there was no guilty mind—<em>actus non facit reum nisi mens sit rea</em>.
            </div>
          </div>

          <div className="bg-zinc-900/90 p-4 rounded-lg border border-zinc-800">
            <div className="flex items-baseline justify-between mb-1">
              <h4 className="font-serif font-bold text-lg text-orange-400 italic">Ad infinitum</h4>
              <span className="text-[10px] font-sans-ui bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded">General Terms</span>
            </div>
            <p className="text-xs text-zinc-400 font-sans-ui mb-2">
              <span className="font-semibold text-zinc-300">Translation:</span> To infinity.
            </p>
            <p className="text-xs text-zinc-300 font-lora mb-3 leading-relaxed">
              <strong>Explanation:</strong> Continues endlessly or without limit. In law, it refers to clauses, obligations, or covenants that run perpetually unless otherwise specified.
            </p>
            <div className="bg-black/50 p-2.5 rounded text-xs text-emerald-300 font-lora border-l-2 border-emerald-500">
              <span className="font-bold text-white">Illustration:</span> A tenancy agreement that automatically renews each year without end continues <em>ad infinitum</em> until one party serves a notice of termination.
            </div>
          </div>
        </div>
      )
    },
    {
      pageNumber: "Page 343",
      title: "ABOUT THE AUTHOR",
      subtitle: "Sharon O. Olaniyi & LEX Mentors",
      type: "copyright",
      body: (
        <div className="space-y-4 font-lora text-zinc-300 text-sm leading-relaxed">
          <div className="flex items-center gap-4 bg-zinc-900 p-3.5 rounded-lg border border-zinc-800">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-amber-700 flex items-center justify-center font-cinzel text-xl font-bold text-white shrink-0 shadow-md">
              SO
            </div>
            <div>
              <h4 className="font-cinzel text-base font-bold text-white">Sharon O. Olaniyi</h4>
              <p className="text-xs text-orange-400 font-sans-ui">Legal Scholar • Educator • Founder, LEX Mentors</p>
              <p className="text-[11px] text-zinc-400 font-sans-ui">Alumna, Osun State University</p>
            </div>
          </div>
          <p>
            Sharon Olaniyi is the founder of <strong>LEX Mentors</strong>, a vibrant academic community redefining how the next generation of lawyers approach the study of law. Driven by a deep conviction that legal education should be accessible, practical, and empowering, she has dedicated herself to equipping law students with the tools, strategies, and confidence they need to excel.
          </p>
          <p>
            A product of Osun State University, Sharon distinguished herself as a student leader, serving as the Assistant General Secretary of the Law Students&apos; Society and Vice President (Administration) of the Association of Campus Journalists.
          </p>
          <p className="bg-zinc-900/60 p-3 rounded border border-zinc-800 text-xs italic text-zinc-200">
            &ldquo;Legal Maxims: A Practical Guide for Everyone is her first published work and a reflection of her life&apos;s mission: to stand at the intersection of law and education, making the wisdom of the legal profession available to all who seek it.&rdquo;
          </p>
        </div>
      )
    }
  ];

  const currentPage = samplePages[currentPageIndex];

  const handleCopyShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-[#121319] border border-zinc-800 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-[#161820]">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-orange-600/20 text-orange-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-cinzel text-sm sm:text-base font-bold text-white tracking-wide">
                Sample Reader Preview
              </h3>
              <p className="text-xs text-zinc-400">
                {BOOK_INFO.title} • {currentPage.pageNumber}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyShare}
              className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition"
              title="Share Book Link"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Page Content Viewport */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 bg-[#0e0f14]">
          <div className="max-w-lg mx-auto">
            {/* Header of the page in reader */}
            <div className="text-center mb-6 pb-4 border-b border-zinc-800">
              <span className="text-[10px] font-mono uppercase tracking-widest text-orange-400 bg-orange-950/60 px-3 py-1 rounded-full border border-orange-500/20">
                {currentPage.pageNumber}
              </span>
              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white mt-2">
                {currentPage.title}
              </h3>
              {currentPage.subtitle && (
                <p className="text-xs text-zinc-400 font-sans-ui mt-1">
                  {currentPage.subtitle}
                </p>
              )}
            </div>

            {/* Page Body */}
            <div>{currentPage.body}</div>
          </div>
        </div>

        {/* Reader Footer Controls */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-zinc-800 bg-[#161820]">
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={currentPageIndex === 0}
              onClick={() => setCurrentPageIndex((prev) => Math.max(0, prev - 1))}
              className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed text-zinc-200 transition flex items-center gap-1 text-xs"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Previous</span>
            </button>

            <span className="text-xs text-zinc-400 px-2 font-mono">
              {currentPageIndex + 1} / {samplePages.length}
            </span>

            <button
              type="button"
              disabled={currentPageIndex === samplePages.length - 1}
              onClick={() => setCurrentPageIndex((prev) => Math.min(samplePages.length - 1, prev + 1))}
              className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed text-zinc-200 transition flex items-center gap-1 text-xs"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              onClose();
              onGoToOrder();
            }}
            className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-medium text-xs sm:text-sm shadow-md transition transform active:scale-95 flex items-center gap-2"
          >
            <span>Order Full 343-Page Book</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
