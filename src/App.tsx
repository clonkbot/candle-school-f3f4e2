import { useState } from 'react';
import { CandlestickChart } from './components/CandlestickChart';
import { PatternCard } from './components/PatternCard';
import { LessonModal } from './components/LessonModal';
import { patterns, type Pattern } from './data/patterns';

function App() {
  const [selectedPattern, setSelectedPattern] = useState<Pattern | null>(null);
  const [activeCategory, setActiveCategory] = useState<'bullish' | 'bearish' | 'neutral'>('bullish');
  const [completedPatterns, setCompletedPatterns] = useState<Set<string>>(new Set());

  const filteredPatterns = patterns.filter(p => p.category === activeCategory);

  const handleComplete = (patternId: string) => {
    setCompletedPatterns(prev => new Set([...prev, patternId]));
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#e8e4dc] overflow-x-hidden">
      {/* Grain overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-50"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }}
      />

      {/* Animated grid background */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(212,175,55,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212,175,55,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Header */}
      <header className="relative z-10 border-b border-[#d4af37]/20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="flex gap-0.5">
                  <div className="w-2 h-8 bg-[#22c55e] rounded-sm" />
                  <div className="w-2 h-6 bg-[#ef4444] rounded-sm" />
                  <div className="w-2 h-10 bg-[#22c55e] rounded-sm" />
                </div>
                <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#d4af37] tracking-tight">
                  CandleSchool
                </h1>
              </div>
              <p className="font-mono text-xs md:text-sm text-[#e8e4dc]/50 tracking-wider uppercase">
                Master Price Action &bull; Read The Market
              </p>
            </div>
            <div className="flex items-center gap-3 font-mono text-xs">
              <span className="text-[#e8e4dc]/40">Progress</span>
              <div className="w-32 md:w-48 h-1.5 bg-[#1a1a24] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#d4af37] to-[#f4d03f] rounded-full transition-all duration-500"
                  style={{ width: `${(completedPatterns.size / patterns.length) * 100}%` }}
                />
              </div>
              <span className="text-[#d4af37]">{completedPatterns.size}/{patterns.length}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 py-8 md:py-16 border-b border-[#d4af37]/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl mb-4 md:mb-6 leading-tight">
                Learn to read the <span className="text-[#d4af37]">language of price</span>
              </h2>
              <p className="font-mono text-sm md:text-base text-[#e8e4dc]/60 leading-relaxed mb-6 md:mb-8">
                Candlestick patterns are the heartbeat of market sentiment. Each pattern tells a story
                of battle between buyers and sellers. Master these patterns to understand where price
                is likely to go next.
              </p>
              <div className="grid grid-cols-3 gap-3 md:gap-4">
                <div className="bg-[#111118] border border-[#22c55e]/30 rounded-lg p-3 md:p-4 text-center">
                  <div className="text-xl md:text-2xl font-serif text-[#22c55e]">12</div>
                  <div className="font-mono text-[10px] md:text-xs text-[#e8e4dc]/40 mt-1">BULLISH</div>
                </div>
                <div className="bg-[#111118] border border-[#ef4444]/30 rounded-lg p-3 md:p-4 text-center">
                  <div className="text-xl md:text-2xl font-serif text-[#ef4444]">10</div>
                  <div className="font-mono text-[10px] md:text-xs text-[#e8e4dc]/40 mt-1">BEARISH</div>
                </div>
                <div className="bg-[#111118] border border-[#d4af37]/30 rounded-lg p-3 md:p-4 text-center">
                  <div className="text-xl md:text-2xl font-serif text-[#d4af37]">4</div>
                  <div className="font-mono text-[10px] md:text-xs text-[#e8e4dc]/40 mt-1">NEUTRAL</div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2 flex justify-center">
              <CandlestickChart />
            </div>
          </div>
        </div>
      </section>

      {/* Basics Section */}
      <section className="relative z-10 py-8 md:py-16 border-b border-[#d4af37]/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center gap-3 mb-6 md:mb-8">
            <div className="w-1 h-6 md:h-8 bg-[#d4af37]" />
            <h2 className="font-serif text-xl md:text-2xl">Anatomy of a Candle</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="bg-gradient-to-br from-[#111118] to-[#0d0d12] border border-[#22c55e]/20 rounded-xl p-4 md:p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#22c55e]/5 rounded-full blur-3xl" />
              <h3 className="font-mono text-xs md:text-sm text-[#22c55e] mb-4 tracking-wider">BULLISH CANDLE</h3>
              <div className="flex gap-4 md:gap-6 items-center">
                <div className="relative flex flex-col items-center">
                  <div className="w-0.5 h-8 md:h-12 bg-[#22c55e]" />
                  <div className="w-8 md:w-12 h-16 md:h-24 bg-[#22c55e] rounded-sm" />
                  <div className="w-0.5 h-6 md:h-8 bg-[#22c55e]" />
                </div>
                <div className="flex-1 space-y-2 md:space-y-3 font-mono text-xs md:text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#22c55e]" />
                    <span className="text-[#e8e4dc]/70">Upper Wick = High</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#22c55e]" />
                    <span className="text-[#e8e4dc]/70">Body Top = Close</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#22c55e]" />
                    <span className="text-[#e8e4dc]/70">Body Bottom = Open</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#22c55e]" />
                    <span className="text-[#e8e4dc]/70">Lower Wick = Low</span>
                  </div>
                </div>
              </div>
              <p className="mt-4 font-mono text-xs text-[#e8e4dc]/50">
                Price closed higher than it opened. Buyers won this period.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#111118] to-[#0d0d12] border border-[#ef4444]/20 rounded-xl p-4 md:p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#ef4444]/5 rounded-full blur-3xl" />
              <h3 className="font-mono text-xs md:text-sm text-[#ef4444] mb-4 tracking-wider">BEARISH CANDLE</h3>
              <div className="flex gap-4 md:gap-6 items-center">
                <div className="relative flex flex-col items-center">
                  <div className="w-0.5 h-6 md:h-8 bg-[#ef4444]" />
                  <div className="w-8 md:w-12 h-16 md:h-24 bg-[#ef4444] rounded-sm" />
                  <div className="w-0.5 h-8 md:h-12 bg-[#ef4444]" />
                </div>
                <div className="flex-1 space-y-2 md:space-y-3 font-mono text-xs md:text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#ef4444]" />
                    <span className="text-[#e8e4dc]/70">Upper Wick = High</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#ef4444]" />
                    <span className="text-[#e8e4dc]/70">Body Top = Open</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#ef4444]" />
                    <span className="text-[#e8e4dc]/70">Body Bottom = Close</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#ef4444]" />
                    <span className="text-[#e8e4dc]/70">Lower Wick = Low</span>
                  </div>
                </div>
              </div>
              <p className="mt-4 font-mono text-xs text-[#e8e4dc]/50">
                Price closed lower than it opened. Sellers won this period.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pattern Library */}
      <section className="relative z-10 py-8 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 md:mb-8">
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 md:h-8 bg-[#d4af37]" />
              <h2 className="font-serif text-xl md:text-2xl">Pattern Library</h2>
            </div>

            <div className="flex gap-2 font-mono text-xs">
              {(['bullish', 'bearish', 'neutral'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 md:px-4 py-2 rounded-lg transition-all duration-300 uppercase tracking-wider min-h-[44px] ${
                    activeCategory === cat
                      ? cat === 'bullish'
                        ? 'bg-[#22c55e]/20 text-[#22c55e] border border-[#22c55e]/50'
                        : cat === 'bearish'
                        ? 'bg-[#ef4444]/20 text-[#ef4444] border border-[#ef4444]/50'
                        : 'bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/50'
                      : 'bg-[#111118] text-[#e8e4dc]/50 border border-transparent hover:border-[#e8e4dc]/20'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredPatterns.map((pattern, idx) => (
              <PatternCard
                key={pattern.id}
                pattern={pattern}
                index={idx}
                isCompleted={completedPatterns.has(pattern.id)}
                onClick={() => setSelectedPattern(pattern)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Price Action Tips */}
      <section className="relative z-10 py-8 md:py-16 border-t border-[#d4af37]/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center gap-3 mb-6 md:mb-8">
            <div className="w-1 h-6 md:h-8 bg-[#d4af37]" />
            <h2 className="font-serif text-xl md:text-2xl">Price Action Principles</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[
              { title: 'Context is King', desc: 'A hammer at support is powerful. A hammer in the middle of a range means nothing. Always read patterns in context.' },
              { title: 'Higher Timeframes Rule', desc: 'A pattern on the daily chart carries more weight than one on the 5-minute. Start with weekly, then daily, then lower.' },
              { title: 'Volume Confirms', desc: 'High volume on a breakout candle confirms conviction. Low volume suggests a potential fake-out.' },
              { title: 'Wicks Tell Stories', desc: 'Long wicks show rejection. A candle with a long lower wick shows buyers stepped in. Upper wicks show seller pressure.' },
              { title: 'Wait for Confirmation', desc: 'Never trade a pattern alone. Wait for the next candle to confirm the direction before entering.' },
              { title: 'Support & Resistance', desc: 'Patterns at key S/R levels are 10x more powerful. Always identify key levels first, then look for patterns.' },
            ].map((tip, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-[#111118] to-[#0d0d12] border border-[#d4af37]/10 rounded-xl p-4 md:p-6 hover:border-[#d4af37]/30 transition-all duration-300"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="font-mono text-[10px] md:text-xs text-[#d4af37]/60 mb-2">0{idx + 1}</div>
                <h3 className="font-serif text-base md:text-lg text-[#e8e4dc] mb-2">{tip.title}</h3>
                <p className="font-mono text-xs md:text-sm text-[#e8e4dc]/50 leading-relaxed">{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-6 md:py-8 border-t border-[#d4af37]/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <p className="font-mono text-xs text-[#e8e4dc]/30">
            Requested by @O_Meezly &middot; Built by @clonkbot
          </p>
        </div>
      </footer>

      {/* Lesson Modal */}
      {selectedPattern && (
        <LessonModal
          pattern={selectedPattern}
          isCompleted={completedPatterns.has(selectedPattern.id)}
          onClose={() => setSelectedPattern(null)}
          onComplete={() => handleComplete(selectedPattern.id)}
        />
      )}
    </div>
  );
}

export default App;
