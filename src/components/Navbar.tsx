import React, { useState, useEffect } from 'react';
import { BookOpen, ShoppingBag, Phone, Menu, X, Scale } from 'lucide-react';
import { BOOK_INFO } from '../data/bookData';

interface NavbarProps {
  onOpenSample: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSample }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300">
      {/* Top micro-announcement bar */}
      <div className="bg-[#12131a] border-b border-zinc-800/80 py-1.5 px-4 text-xs text-zinc-300">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-sans-ui text-[11px] sm:text-xs">
              Official Book Order Portal • ISBN {BOOK_INFO.isbn} • Foreword by Prof. Mojeed Olujinmi Alabi
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-sans-ui">
            <a
              href={`https://wa.me/${BOOK_INFO.authorWhatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-400 flex items-center gap-1 transition"
            >
              <Phone className="w-3 h-3 text-orange-400" />
              <span>WhatsApp Helpline: +234 904 840 2122</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav
        className={`px-4 sm:px-6 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0d0e13]/95 backdrop-blur-md py-3 border-b border-zinc-800 shadow-xl'
            : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo / Title */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-600 to-amber-700 flex items-center justify-center text-white shadow-md shadow-orange-600/30 group-hover:scale-105 transition">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <span className="font-cinzel text-sm sm:text-base font-bold text-white tracking-wider block leading-tight">
                LEGAL MAXIMS
              </span>
              <span className="text-[10px] font-sans-ui text-orange-400 tracking-widest font-semibold uppercase">
                SIMPLIFIED
              </span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-7 text-xs font-semibold text-zinc-300">
            <a href="#about-book" className="hover:text-orange-400 transition">About Book</a>
            <a href="#maxims-explorer" className="hover:text-orange-400 transition">Maxims Directory</a>
            <a href="#foreword" className="hover:text-orange-400 transition">Foreword</a>
            <a href="#author" className="hover:text-orange-400 transition">Author & LEX Mentors</a>
            <a href="#testimonials" className="hover:text-orange-400 transition">Reviews</a>
            <a href="#faq" className="hover:text-orange-400 transition">FAQ</a>
          </div>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              type="button"
              onClick={onOpenSample}
              className="px-3.5 py-2 text-xs font-semibold text-zinc-300 hover:text-white bg-zinc-800/80 hover:bg-zinc-800 rounded-xl border border-zinc-700/80 transition flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5 text-orange-400" />
              <span>Read Sample</span>
            </button>

            <a
              href="#order-section"
              className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 rounded-xl shadow-md shadow-orange-600/25 transition transform active:scale-95 flex items-center gap-1.5"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Order Book</span>
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-zinc-400 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 p-4 bg-[#12131a] border border-zinc-800 rounded-2xl space-y-3 shadow-2xl">
            <a
              href="#about-book"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm text-zinc-300 hover:text-orange-400 py-1"
            >
              About The Book
            </a>
            <a
              href="#maxims-explorer"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm text-zinc-300 hover:text-orange-400 py-1"
            >
              Explore Legal Maxims
            </a>
            <a
              href="#foreword"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm text-zinc-300 hover:text-orange-400 py-1"
            >
              Foreword by Prof. Mojeed Alabi
            </a>
            <a
              href="#author"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm text-zinc-300 hover:text-orange-400 py-1"
            >
              About Sharon Olaniyi
            </a>
            <a
              href="#testimonials"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm text-zinc-300 hover:text-orange-400 py-1"
            >
              Reviews & Endorsements
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm text-zinc-300 hover:text-orange-400 py-1"
            >
              Shipping & FAQ
            </a>
            <div className="pt-2 border-t border-zinc-800 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSample();
                }}
                className="w-full py-2.5 bg-zinc-800 text-white rounded-xl text-xs font-semibold text-center flex items-center justify-center gap-1.5"
              >
                <BookOpen className="w-4 h-4 text-orange-400" />
                <span>Read Free Sample</span>
              </button>
              <a
                href="#order-section"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 bg-orange-600 text-white rounded-xl text-xs font-bold text-center flex items-center justify-center gap-1.5 shadow-md"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Order Now</span>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
