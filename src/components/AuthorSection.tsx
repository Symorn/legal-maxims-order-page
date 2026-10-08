import React from 'react';
import { Mail, Phone, ExternalLink, GraduationCap, Users, HeartHandshake, Shield } from 'lucide-react';
import { BOOK_INFO } from '../data/bookData';

export const AuthorSection: React.FC = () => {
  return (
    <section id="author" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto scroll-mt-20">
      <div className="bg-[#12131a] border border-zinc-800 rounded-3xl p-6 sm:p-10 md:p-14 relative overflow-hidden">
        
        {/* Glow */}
        <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Author Bio & Story (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-950/70 text-orange-400 border border-orange-500/30 text-xs font-semibold">
              <Users className="w-3.5 h-3.5" />
              <span>Meet the Author & Founder</span>
            </div>

            <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white tracking-wide">
              Sharon O. Olaniyi
            </h2>

            <p className="font-lora text-orange-400 text-sm sm:text-base font-semibold">
              Legal Scholar • Educator • Founder, LEX Mentors
            </p>

            <div className="space-y-4 font-lora text-zinc-300 text-sm sm:text-base leading-relaxed">
              <p>
                Sharon Olaniyi is driven by a deep conviction that legal education should not be an arcane mystery, but accessible, practical, and empowering. As the founder of <strong>LEX Mentors</strong>, she has cultivated a rapidly growing community dedicated to mentoring aspiring lawyers, demystifying court doctrines, and equipping students with the tactical confidence needed to excel.
              </p>

              <p>
                A proud alumna of Osun State University, Sharon distinguished herself as a student leader, having served as the <em>Assistant General Secretary of the Law Students&apos; Society</em> and <em>Vice President (Administration) of the Association of Campus Journalists</em>.
              </p>

              <p className="bg-[#181924] p-4 rounded-xl border border-zinc-800 text-zinc-200 italic">
                &ldquo;Legal Maxims: A Practical Guide for Everyone is her first published work and a reflection of her life&apos;s mission: to stand at the intersection of law and education, ensuring the wisdom of the legal profession belongs to everyone.&rdquo;
              </p>
            </div>

            {/* Author Direct Channels */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-sans-ui">
              <a
                href={`mailto:${BOOK_INFO.authorEmail}`}
                className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white flex items-center gap-2 border border-zinc-700 transition"
              >
                <Mail className="w-3.5 h-3.5 text-orange-400" />
                <span>{BOOK_INFO.authorEmail}</span>
              </a>

              <a
                href={`https://wa.me/${BOOK_INFO.authorWhatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white flex items-center gap-2 border border-zinc-700 transition"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>{BOOK_INFO.authorPhone}</span>
              </a>
            </div>
          </div>

          {/* Right: LEX Mentors Community & Publisher info (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* LEX Mentors card */}
            <div className="bg-[#181a24] p-6 rounded-2xl border border-orange-500/30 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-600/20 text-orange-400 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-cinzel text-base font-bold text-white">LEX MENTORS</h3>
                  <p className="text-xs text-orange-400">Next-Generation Legal Community</p>
                </div>
              </div>

              <p className="text-xs text-zinc-300 font-lora leading-relaxed">
                Connect with hundreds of law students across Nigerian universities, moot court participants, and seasoned legal practitioners. Every book order includes an invitation to upcoming Lex Mentors maxim revision sessions.
              </p>

              <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-xs">
                <span className="text-zinc-400">Social: {BOOK_INFO.socialLinkedinFacebook}</span>
                <span className="text-orange-400 font-semibold">Join Free</span>
              </div>
            </div>

            {/* Publisher Card */}
            <div className="bg-[#181a24] p-5 rounded-2xl border border-zinc-800 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-cinzel font-bold text-white text-sm">Elegraph Publishing</span>
                <span className="font-mono text-zinc-400 text-[11px]">ISBN {BOOK_INFO.isbn}</span>
              </div>
              <p className="text-zinc-400 font-lora">
                Official publisher and formatter of <em>Legal Maxims Simplified</em>. Available for campus deliveries, bulk bookshop distribution, and library acquisitions.
              </p>
              <div className="pt-1 flex items-center justify-between text-zinc-500 text-[11px]">
                <span>Contact: {BOOK_INFO.publisherEmail}</span>
                <span>IG: {BOOK_INFO.publisherInstagram}</span>
              </div>
            </div>

            {/* Dedication excerpt */}
            <div className="bg-black/40 p-4 rounded-xl border border-zinc-800/80 text-xs italic font-lora text-zinc-300">
              <p className="text-[10px] uppercase font-sans-ui tracking-wider font-semibold text-amber-400 not-italic mb-1">
                Book Dedication
              </p>
              &ldquo;To every law student who has ever struggled to decode the meaning of a Latin phrase, to every young lawyer searching for clarity in the courtroom, and to every teacher of the law committed to passing down knowledge with patience and care...&rdquo;
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
