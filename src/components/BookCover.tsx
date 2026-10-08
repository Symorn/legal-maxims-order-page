import React, { useState } from 'react';
import { Rotate3d, BookOpen, Layers, Eye } from 'lucide-react';

interface BookCoverProps {
  className?: string;
  interactive?: boolean;
  onOpenSample?: () => void;
}

export const BookCover: React.FC<BookCoverProps> = ({
  className = '',
  interactive = true,
  onOpenSample
}) => {
  const [viewMode, setViewMode] = useState<'3d' | 'flat' | 'back'>('3d');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || viewMode !== '3d') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1 to 1
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2; // -1 to 1
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos({ x: 0, y: 0 });
  };

  const rotateY = viewMode === '3d' ? (isHovered ? mousePos.x * 24 - 15 : -18) : 0;
  const rotateX = viewMode === '3d' ? (isHovered ? -mousePos.y * 18 + 6 : 8) : 0;

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* 3D Stage Container */}
      <div
        className="perspective-1000 w-[290px] sm:w-[320px] md:w-[350px] h-[450px] sm:h-[490px] md:h-[530px] relative flex items-center justify-center cursor-pointer select-none group"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={onOpenSample}
      >
        {/* The 3D Book Object */}
        <div
          className="preserve-3d relative w-full h-full transition-transform duration-300 ease-out"
          style={{
            transform: `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`,
          }}
        >
          {/* FRONT COVER */}
          {viewMode !== 'back' ? (
            <div className="absolute inset-0 rounded-r-lg rounded-l-sm overflow-hidden bg-[#0c0d11] text-white flex flex-col justify-between border-y border-r border-[#262832] book-shadow">
              {/* Drapery texture background with subtle silk sheen */}
              <div
                className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(ellipse at 50% 20%, rgba(255,255,255,0.18) 0%, transparent 60%),
                                    linear-gradient(135deg, rgba(20,20,20,0.9) 0%, rgba(5,5,5,0.95) 50%, rgba(30,30,30,0.85) 100%)`
                }}
              />
              
              {/* Subtle fabric drape curved highlights */}
              <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0,0 C120,80 200,40 350,120 L350,550 L0,550 Z" fill="rgba(255,255,255,0.04)" />
                <path d="M50,0 C180,180 140,320 350,420 L350,550 L50,550 Z" fill="rgba(255,255,255,0.03)" />
              </svg>

              {/* Book spine shadow overlay on left edge */}
              <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-20 pointer-events-none" />
              <div className="absolute left-3 top-0 bottom-0 w-[1px] bg-white/10 z-20 pointer-events-none" />

              {/* Top / Main Cover Content */}
              <div className="relative z-10 flex-1 flex flex-col items-center justify-start pt-6 sm:pt-8 px-6 text-center">
                
                {/* Scales of Justice Icon */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 mb-4 flex items-center justify-center relative">
                  <svg
                    viewBox="0 0 100 100"
                    fill="none"
                    stroke="currentColor"
                    className="w-full h-full text-zinc-300 drop-shadow-[0_2px_8px_rgba(255,255,255,0.15)]"
                  >
                    {/* Beam balance / central pillar */}
                    <circle cx="50" cy="14" r="5" strokeWidth="2.5" />
                    <line x1="50" y1="19" x2="50" y2="84" strokeWidth="3" />
                    {/* Crossbar */}
                    <path d="M22 34 L78 34" strokeWidth="2.8" strokeLinecap="round" />
                    <circle cx="50" cy="34" r="3" fill="currentColor" />
                    {/* Left pan ropes */}
                    <line x1="22" y1="34" x2="10" y2="58" strokeWidth="1.5" />
                    <line x1="22" y1="34" x2="34" y2="58" strokeWidth="1.5" />
                    {/* Left pan */}
                    <path d="M8 58 Q22 66 36 58 Z" strokeWidth="2" fill="currentColor" fillOpacity="0.12" />
                    {/* Right pan ropes */}
                    <line x1="78" y1="34" x2="66" y2="58" strokeWidth="1.5" />
                    <line x1="78" y1="34" x2="90" y2="58" strokeWidth="1.5" />
                    {/* Right pan */}
                    <path d="M64 58 Q78 66 92 58 Z" strokeWidth="2" fill="currentColor" fillOpacity="0.12" />
                    {/* Base */}
                    <path d="M36 84 L64 84" strokeWidth="3.5" strokeLinecap="round" />
                    <path d="M42 80 L58 80" strokeWidth="2" strokeLinecap="round" />
                    {/* Subtle gavel & book faint outline behind */}
                    <rect x="65" y="68" width="16" height="10" rx="1.5" strokeWidth="1" strokeOpacity="0.4" />
                    <line x1="73" y1="68" x2="73" y2="60" strokeWidth="1.2" strokeOpacity="0.4" />
                  </svg>
                </div>

                {/* Main Title */}
                <h1 className="font-cinzel tracking-wider text-white text-3xl sm:text-4xl md:text-[42px] font-bold leading-[1.05] drop-shadow-md">
                  LEGAL
                  <br />
                  MAXIMS
                </h1>

                {/* Orange Badge: SIMPLIFIED */}
                <div className="mt-4 sm:mt-5 bg-gradient-to-r from-[#ea580c] via-[#f97316] to-[#ea580c] text-white font-cinzel font-black text-xs sm:text-sm tracking-[0.25em] px-5 sm:px-6 py-1.5 rounded-full shadow-[0_4px_16px_rgba(234,88,12,0.45)] border border-orange-400/40 flex items-center gap-2">
                  <span className="text-[9px] opacity-80">■</span>
                  <span>SIMPLIFIED</span>
                  <span className="text-[9px] opacity-80">■</span>
                </div>

                {/* Subtitle Pill Box */}
                <div className="mt-3 sm:mt-4 border border-zinc-500/80 rounded-full px-4 sm:px-5 py-1 backdrop-blur-xs">
                  <p className="font-lora italic text-[11px] sm:text-xs tracking-wide text-zinc-200">
                    A Practical Guide For Everyone
                  </p>
                </div>
              </div>

              {/* Bottom White Banner Section for Author & Foreword */}
              <div className="relative z-10 bg-white text-zinc-950 py-3.5 sm:py-4 px-4 text-center border-t border-zinc-200 shadow-inner">
                <p className="font-cinzel text-xs sm:text-sm md:text-[15px] font-extrabold tracking-widest uppercase text-zinc-900 leading-tight">
                  SHARON O. OLANIYI
                </p>
                <p className="font-lora text-[10px] sm:text-[11px] text-zinc-700 mt-1 font-medium italic">
                  Foreword by <span className="font-semibold text-zinc-900 not-italic">Professor Mojeed Olujinmi Alabi</span>
                </p>
              </div>

              {/* Glossy lighting glare overlay */}
              <div
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                  background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.4) 45%, transparent 52%)'
                }}
              />
            </div>
          ) : (
            /* BACK COVER VIEW */
            <div className="absolute inset-0 rounded-l-lg rounded-r-sm overflow-hidden bg-[#0e0f14] text-white p-5 sm:p-6 flex flex-col justify-between border border-[#2a2c36] book-shadow">
              <div className="space-y-3">
                <div className="border-b border-orange-500/30 pb-2">
                  <h3 className="font-cinzel text-xs font-bold tracking-widest text-orange-400">
                    ABOUT THE BOOK
                  </h3>
                  <p className="text-[10px] sm:text-[11px] font-lora text-zinc-300 leading-relaxed mt-1 line-clamp-6">
                    Legal Maxims: A Practical Guide for Everyone is a comprehensive reference work that brings centuries of legal wisdom into plain, accessible language. Compiled by Sharon Olaniyi, it unpacks meaning, context, and real-world Nigerian & common law application.
                  </p>
                </div>

                <div className="border-b border-orange-500/30 pb-2">
                  <h3 className="font-cinzel text-xs font-bold tracking-widest text-orange-400">
                    ABOUT THE AUTHOR
                  </h3>
                  <p className="text-[10px] sm:text-[11px] font-lora text-zinc-300 leading-relaxed mt-1 line-clamp-4">
                    Sharon Olaniyi is a legal scholar, educator, and the founder of LEX Mentors. Former student leader at Osun State University, she dedicates herself to equipping the next generation of lawyers.
                  </p>
                </div>

                <div className="bg-zinc-900/80 p-2.5 rounded border border-zinc-800 text-[10px] text-zinc-400 font-sans-ui">
                  <p className="font-semibold text-zinc-200">Foreword by:</p>
                  <p className="italic text-zinc-300">Prof. the Rt Hon Mojeed Olujinmi A. Alabi</p>
                  <p className="text-[9px] text-zinc-500">Provost, College of Law, Osun State University</p>
                </div>
              </div>

              {/* Barcode and ISBN */}
              <div className="bg-white text-zinc-900 p-2 rounded flex items-center justify-between mt-2">
                <div>
                  <p className="text-[9px] font-mono font-bold tracking-wider">ISBN 978-978-68-2634-9</p>
                  <p className="text-[8px] font-sans text-zinc-600">Elegraph Publishing</p>
                </div>
                {/* SVG Mock Barcode */}
                <div className="flex items-center gap-[2px] h-7">
                  {[2,1,3,1,2,3,1,1,2,1,3,1,2,1,1,3,2,1,2,3,1].map((w, idx) => (
                    <div key={idx} className="bg-black h-full" style={{ width: `${w * 1.5}px` }} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 3D BOOK PAGES (Right Side Thickness) */}
          {viewMode === '3d' && (
            <div
              className="absolute right-0 top-1 bottom-1 w-[26px] sm:w-[30px] rounded-r-xs preserve-3d"
              style={{
                transform: 'rotateY(90deg) translateZ(0px)',
                transformOrigin: 'right center',
                backgroundImage: `repeating-linear-gradient(
                  to bottom,
                  #f5f5f0 0px,
                  #eae7dc 1px,
                  #d8d3c5 2px,
                  #eae7dc 3px
                )`,
                boxShadow: 'inset -2px 0 5px rgba(0,0,0,0.4)',
              }}
            >
              {/* Gold ribbon bookmark poking out */}
              <div className="absolute bottom-[-10px] right-2 w-3 h-8 bg-amber-500 shadow-md transform rotate-6 rounded-b-xs" />
            </div>
          )}

          {/* 3D BOOK SPINE (Left Side Thickness) */}
          {viewMode === '3d' && (
            <div
              className="absolute left-0 top-0 bottom-0 w-[24px] sm:w-[28px] book-spine-gradient preserve-3d text-white flex flex-col justify-between py-6 px-1 items-center border-l border-white/10"
              style={{
                transform: 'rotateY(-90deg) translateZ(0px)',
                transformOrigin: 'left center',
              }}
            >
              <div className="text-[7px] font-cinzel font-bold text-amber-300 transform -rotate-90 whitespace-nowrap">
                ELEGRAPH
              </div>
              <div className="text-[8px] sm:text-[9px] font-cinzel tracking-widest text-zinc-100 font-extrabold transform -rotate-90 whitespace-nowrap">
                LEGAL MAXIMS SIMPLIFIED
              </div>
              <div className="text-[7px] font-cinzel text-zinc-300 transform -rotate-90 whitespace-nowrap">
                SHARON OLANIYI
              </div>
            </div>
          )}
        </div>

        {/* Hover / Click tooltip hint */}
        <div className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none flex items-center gap-1.5 text-xs text-orange-400 font-medium bg-zinc-900/90 px-3 py-1 rounded-full border border-orange-500/30">
          <Eye className="w-3.5 h-3.5" />
          <span>Click to read sample pages</span>
        </div>
      </div>

      {/* Control Switcher Buttons */}
      {interactive && (
        <div className="mt-8 flex items-center gap-1.5 bg-zinc-900/90 border border-zinc-800 p-1 rounded-full shadow-lg">
          <button
            type="button"
            onClick={() => setViewMode('3d')}
            className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all flex items-center gap-1.5 ${
              viewMode === '3d'
                ? 'bg-orange-600 text-white shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Rotate3d className="w-3.5 h-3.5" />
            <span>3D Angle</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('flat')}
            className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all flex items-center gap-1.5 ${
              viewMode === 'flat'
                ? 'bg-orange-600 text-white shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Front Cover</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('back')}
            className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all flex items-center gap-1.5 ${
              viewMode === 'back'
                ? 'bg-orange-600 text-white shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Back Cover</span>
          </button>
        </div>
      )}
    </div>
  );
};
