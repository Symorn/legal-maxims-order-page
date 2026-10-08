import React, { useState, useMemo } from 'react';
import { Search, BookMarked, Sparkles, Filter, Shuffle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { SAMPLE_MAXIMS, SUBJECT_CATEGORIES, LegalMaxim } from '../data/bookData';

interface MaximsExplorerProps {
  onSelectMaximToOrder?: (maxim: LegalMaxim) => void;
}

export const MaximsExplorer: React.FC<MaximsExplorerProps> = ({
  onSelectMaximToOrder
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');
  const [flashcardMode, setFlashcardMode] = useState(false);
  const [revealedIds, setRevealedIds] = useState<Record<string, boolean>>({});
  const [dailyMaximIndex, setDailyMaximIndex] = useState(0);

  const filteredMaxims = useMemo(() => {
    return SAMPLE_MAXIMS.filter((m) => {
      const matchesSearch =
        m.latin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.translation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.explanation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.illustration.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat =
        selectedCategory === 'All Categories' || m.category === selectedCategory;

      return matchesSearch && matchesCat;
    });
  }, [searchQuery, selectedCategory]);

  const toggleReveal = (latin: string) => {
    setRevealedIds((prev) => ({
      ...prev,
      [latin]: !prev[latin]
    }));
  };

  const handleShuffleDaily = () => {
    const nextIdx = (dailyMaximIndex + 1) % SAMPLE_MAXIMS.length;
    setDailyMaximIndex(nextIdx);
  };

  const dailyMaxim = SAMPLE_MAXIMS[dailyMaximIndex] || SAMPLE_MAXIMS[0];

  return (
    <section id="maxims-explorer" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-950/70 border border-orange-500/30 text-orange-400 text-xs font-semibold mb-4">
          <BookMarked className="w-4 h-4" />
          <span>Interactive Excerpt From The 343-Page Book</span>
        </div>
        <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-wide">
          Explore The Legal Maxims
        </h2>
        <p className="mt-4 font-lora text-base sm:text-lg text-zinc-300 leading-relaxed">
          Sample the distilled wisdom of common law jurisprudence. Each entry breaks down ancient Latin into plain English and a concrete Nigerian real-life scenario.
        </p>
      </div>

      {/* Daily Maxim Feature Card */}
      <div className="mb-14 bg-gradient-to-br from-[#181922] via-[#14151c] to-[#1e1510] border border-orange-500/30 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-lg bg-orange-600/20 text-orange-400">
              <Sparkles className="w-5 h-5" />
            </span>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-orange-400">
                Featured Maxim of the Day
              </span>
              <p className="text-xs text-zinc-400">Entry {dailyMaximIndex + 1} of {SAMPLE_MAXIMS.length} in preview directory</p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleShuffleDaily}
            className="self-start sm:self-auto px-3.5 py-1.5 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-xs text-zinc-300 flex items-center gap-1.5 border border-zinc-700 transition"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>Random Maxim</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-5 space-y-2">
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-zinc-800 text-zinc-300 border border-zinc-700 inline-block">
              {dailyMaxim.category} • Book Page {dailyMaxim.page}
            </span>
            <h3 className="font-serif italic font-bold text-2xl sm:text-3xl text-orange-400">
              {dailyMaxim.latin}
            </h3>
            <p className="font-lora text-base text-zinc-200 font-medium">
              &ldquo;{dailyMaxim.translation}&rdquo;
            </p>
            <p className="text-xs text-zinc-400 font-sans-ui pt-2 leading-relaxed">
              {dailyMaxim.explanation}
            </p>
          </div>

          <div className="lg:col-span-7 bg-[#0b0c10]/80 p-5 rounded-xl border border-zinc-800/80">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Real-World Nigerian Context</span>
            </div>
            <p className="font-lora text-sm text-zinc-300 leading-relaxed italic">
              {dailyMaxim.illustration}
            </p>
            <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400">
              <span>Included in complete 343-page handbook</span>
              <a
                href="#order-section"
                className="text-orange-400 hover:text-orange-300 font-semibold flex items-center gap-1 transition"
              >
                <span>Order this book</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#121319] border border-zinc-800 p-4 rounded-2xl mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          
          {/* Search box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Latin maxim, translation, or topic (e.g. 'Nemo dat', 'damage', 'contract')..."
              className="w-full bg-[#181a24] border border-zinc-700/80 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-hidden focus:border-orange-500 transition"
            />
          </div>

          {/* Flashcard Toggle */}
          <button
            type="button"
            onClick={() => setFlashcardMode(!flashcardMode)}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border transition shrink-0 ${
              flashcardMode
                ? 'bg-orange-600 text-white border-orange-500 shadow-md'
                : 'bg-[#181a24] text-zinc-300 border-zinc-700 hover:text-white'
            }`}
          >
            <BookMarked className="w-4 h-4" />
            <span>{flashcardMode ? 'Exam Study Mode: Active' : 'Enable Exam Flashcards'}</span>
          </button>
        </div>

        {/* Categories Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
          <Filter className="w-3.5 h-3.5 text-zinc-500 shrink-0 ml-1" />
          {SUBJECT_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap transition-all font-medium ${
                selectedCategory === cat
                  ? 'bg-orange-600 text-white shadow-xs'
                  : 'bg-zinc-800/60 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Maxims Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredMaxims.map((item) => {
          const isRevealed = revealedIds[item.latin] || !flashcardMode;

          return (
            <div
              key={item.latin}
              className="bg-[#13141c] border border-zinc-800 hover:border-orange-500/50 rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 hover:shadow-xl group"
            >
              <div>
                {/* Card Header */}
                <div className="flex items-start justify-between gap-2 mb-2.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-800/80 text-orange-400 border border-zinc-700/60">
                    {item.category}
                  </span>
                  <span className="text-[11px] font-mono text-zinc-500">
                    p. {item.page}
                  </span>
                </div>

                {/* Latin Maxim Name */}
                <h3 className="font-serif italic font-bold text-lg sm:text-xl text-white group-hover:text-orange-300 transition mb-1">
                  {item.latin}
                </h3>

                {/* Flashcard Hidden / Shown State */}
                {flashcardMode && !isRevealed ? (
                  <div className="my-6 p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-center">
                    <p className="text-xs text-zinc-400 mb-3 font-sans-ui">
                      What does this maxim mean in practice?
                    </p>
                    <button
                      type="button"
                      onClick={() => toggleReveal(item.latin)}
                      className="px-3.5 py-1.5 bg-orange-600/30 hover:bg-orange-600 text-orange-300 hover:text-white rounded-lg text-xs font-semibold transition"
                    >
                      Click to Reveal Meaning & Illustration
                    </button>
                  </div>
                ) : (
                  <>
                    <p className="font-lora text-sm font-semibold text-zinc-200 mb-2">
                      &ldquo;{item.translation}&rdquo;
                    </p>

                    <p className="text-xs font-sans-ui text-zinc-400 leading-relaxed mb-4">
                      {item.explanation}
                    </p>

                    {/* Illustration Box */}
                    <div className="bg-[#0b0c10] p-3 rounded-xl border-l-2 border-orange-500 border-y border-r border-zinc-800/60 text-xs font-lora text-zinc-300">
                      <span className="font-bold text-orange-400 block font-sans-ui text-[11px] uppercase tracking-wider mb-1">
                        Relatable Case Illustration:
                      </span>
                      {item.illustration}
                    </div>
                  </>
                )}
              </div>

              {/* Card Footer */}
              <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-500">
                <span>Handbook Reference #p.{item.page}</span>
                <a
                  href="#order-section"
                  className="text-orange-400 hover:text-orange-300 font-medium flex items-center gap-1 transition"
                >
                  <span>Order full text</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {filteredMaxims.length === 0 && (
        <div className="text-center py-12 bg-zinc-900/40 rounded-2xl border border-zinc-800">
          <BookMarked className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
          <p className="text-zinc-300 font-medium">No maxims matched your search criteria</p>
          <p className="text-xs text-zinc-500 mt-1">Try searching for terms like &ldquo;tort&rdquo;, &ldquo;court&rdquo;, &ldquo;contract&rdquo;, or &ldquo;nemo&rdquo;.</p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All Categories');
            }}
            className="mt-4 px-4 py-2 bg-orange-600 text-white rounded-lg text-xs font-medium"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Book Statistics Banner */}
      <div className="mt-12 p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <h4 className="font-cinzel text-base sm:text-lg font-bold text-white">
            Looking for all 250+ Latin Legal Maxims?
          </h4>
          <p className="text-xs sm:text-sm text-zinc-400 font-lora mt-0.5">
            The complete 343-page volume includes Latin pronunciation, A–Z directory, subject appendix, and detailed Nigerian case authorities.
          </p>
        </div>
        <a
          href="#order-section"
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold text-sm shadow-lg shadow-orange-600/20 whitespace-nowrap transition transform active:scale-95"
        >
          Order Your Copy Now
        </a>
      </div>
    </section>
  );
};
