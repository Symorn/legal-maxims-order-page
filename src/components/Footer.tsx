import React from 'react';
import { Scale, Phone, Mail, Instagram, ArrowUp, Heart } from 'lucide-react';
import { BOOK_INFO } from '../data/bookData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-zinc-800 bg-[#0a0a0f] text-zinc-400 py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Col 1 & 2: Book Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-orange-600 flex items-center justify-center text-white shadow-md">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <span className="font-cinzel text-base font-bold text-white tracking-wider block">
                  LEGAL MAXIMS SIMPLIFIED
                </span>
                <span className="text-[10px] text-orange-400 uppercase font-semibold">
                  A Practical Guide For Everyone
                </span>
              </div>
            </div>

            <p className="text-xs font-lora leading-relaxed text-zinc-300 max-w-sm">
              The premier practical handbook demystifying over 250+ Latin legal maxims with clear English translations and everyday Nigerian real-world case illustrations.
            </p>

            <div className="pt-2 text-xs space-y-1 font-mono">
              <p><span className="text-zinc-500">ISBN:</span> <span className="text-zinc-200 font-bold">{BOOK_INFO.isbn}</span></p>
              <p><span className="text-zinc-500">Author:</span> <span className="text-zinc-200">Sharon O. Olaniyi</span></p>
              <p><span className="text-zinc-500">Foreword:</span> <span className="text-amber-400">Prof. Mojeed Olujinmi Alabi</span></p>
              <p><span className="text-zinc-500">Publisher:</span> <span className="text-zinc-200">{BOOK_INFO.publisher}</span></p>
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div className="space-y-3">
            <h4 className="font-cinzel text-xs font-bold text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#about-book" className="hover:text-orange-400 transition">About The Book</a></li>
              <li><a href="#maxims-explorer" className="hover:text-orange-400 transition">Maxims Directory</a></li>
              <li><a href="#foreword" className="hover:text-orange-400 transition">Prof. Alabi&apos;s Foreword</a></li>
              <li><a href="#author" className="hover:text-orange-400 transition">Sharon Olaniyi Bio</a></li>
              <li><a href="#order-section" className="text-orange-400 font-semibold hover:text-orange-300 transition">Order Book Copies</a></li>
            </ul>
          </div>

          {/* Col 4: Community & Publisher */}
          <div className="space-y-3">
            <h4 className="font-cinzel text-xs font-bold text-white uppercase tracking-wider">
              Community & Publishing
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="text-zinc-300 font-semibold">{BOOK_INFO.community}</li>
              <li className="text-zinc-400">Osun State University Law Community</li>
              <li><a href="mailto:elegraphpublishing@gmail.com" className="hover:text-white transition">elegraphpublishing@gmail.com</a></li>
              <li><span className="text-zinc-500">Instagram:</span> @elegraphpublishing</li>
              <li><span className="text-zinc-500">Facebook/LinkedIn:</span> @Sharon Olaniyi</li>
            </ul>
          </div>

          {/* Col 5: Direct Support */}
          <div className="space-y-3">
            <h4 className="font-cinzel text-xs font-bold text-white uppercase tracking-wider">
              Order Assistance
            </h4>
            <p className="text-xs text-zinc-400">
              Need assistance with an existing order or group shipment?
            </p>
            <div className="space-y-2 pt-1 text-xs">
              <a
                href={`https://wa.me/${BOOK_INFO.authorWhatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>+234 904 840 2122 (WhatsApp)</span>
              </a>
              <a
                href={`mailto:${BOOK_INFO.authorEmail}`}
                className="flex items-center gap-2 text-orange-400 hover:text-orange-300 transition"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{BOOK_INFO.authorEmail}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>
            Copyright © {BOOK_INFO.copyrightYear} Sharon Olaniyi. All rights reserved. Published by {BOOK_INFO.publisher}.
          </p>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition flex items-center gap-1.5"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
