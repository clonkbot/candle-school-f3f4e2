import { type Pattern } from '../data/patterns';

interface LessonModalProps {
  pattern: Pattern;
  isCompleted: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export function LessonModal({ pattern, isCompleted, onClose, onComplete }: LessonModalProps) {
  const categoryColor =
    pattern.category === 'bullish'
      ? '#22c55e'
      : pattern.category === 'bearish'
      ? '#ef4444'
      : '#d4af37';

  const chartHeight = 120;
  const candleWidth = pattern.candles.length === 1 ? 32 : pattern.candles.length === 2 ? 24 : 18;
  const gap = 8;
  const totalWidth = pattern.candles.length * (candleWidth + gap);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#0a0a0f]/90 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-[#111118] to-[#0a0a0f] border rounded-2xl"
        style={{ borderColor: `${categoryColor}30` }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#1a1a24] flex items-center justify-center text-[#e8e4dc]/50 hover:text-[#e8e4dc] transition-colors z-10"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="p-4 md:p-8 border-b" style={{ borderColor: `${categoryColor}20` }}>
          <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
            {/* Candle visualization */}
            <div
              className="flex-shrink-0 bg-[#0a0a0f] rounded-xl p-4 flex items-center justify-center mx-auto md:mx-0"
              style={{ border: `1px solid ${categoryColor}20` }}
            >
              <svg
                viewBox={`0 0 ${totalWidth + 20} ${chartHeight + 20}`}
                width={totalWidth + 20}
                height={chartHeight + 20}
              >
                {pattern.candles.map((candle, i) => {
                  const x = i * (candleWidth + gap) + 10;
                  const isBullish = candle.close > candle.open;
                  const color = isBullish ? '#22c55e' : '#ef4444';
                  const bodyTop = chartHeight - (Math.max(candle.open, candle.close) / 100) * chartHeight + 10;
                  const bodyBottom = chartHeight - (Math.min(candle.open, candle.close) / 100) * chartHeight + 10;
                  const bodyHeight = Math.max(bodyBottom - bodyTop, 3);
                  const wickTop = chartHeight - (candle.high / 100) * chartHeight + 10;
                  const wickBottom = chartHeight - (candle.low / 100) * chartHeight + 10;

                  return (
                    <g key={i}>
                      <line
                        x1={x + candleWidth / 2}
                        y1={wickTop}
                        x2={x + candleWidth / 2}
                        y2={wickBottom}
                        stroke={color}
                        strokeWidth={2}
                      />
                      <rect
                        x={x}
                        y={bodyTop}
                        width={candleWidth}
                        height={bodyHeight}
                        fill={color}
                        rx="2"
                        style={{
                          filter: `drop-shadow(0 0 8px ${color}40)`,
                        }}
                      />
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Title and meta */}
            <div className="flex-1 text-center md:text-left">
              <div className="font-mono text-xs uppercase tracking-wider mb-2" style={{ color: categoryColor }}>
                {pattern.category} pattern
              </div>
              <h2 className="font-serif text-2xl md:text-3xl text-[#e8e4dc] mb-3">{pattern.name}</h2>

              {/* Reliability */}
              <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                <span className="font-mono text-xs text-[#e8e4dc]/40">Reliability</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div
                      key={level}
                      className="w-3 h-3 rounded"
                      style={{
                        backgroundColor: level <= pattern.reliability ? categoryColor : '#1a1a24',
                      }}
                    />
                  ))}
                </div>
              </div>

              <p className="font-mono text-xs md:text-sm text-[#e8e4dc]/60">{pattern.description}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 md:p-8 space-y-6 md:space-y-8">
          {/* Psychology */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 md:w-8 md:h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${categoryColor}20` }}>
                <svg className="w-3 h-3 md:w-4 md:h-4" fill={categoryColor} viewBox="0 0 20 20">
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                </svg>
              </div>
              <h3 className="font-serif text-lg md:text-xl text-[#e8e4dc]">Market Psychology</h3>
            </div>
            <p className="font-mono text-xs md:text-sm text-[#e8e4dc]/60 leading-relaxed pl-8 md:pl-10">
              {pattern.psychology}
            </p>
          </div>

          {/* How to trade */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 md:w-8 md:h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${categoryColor}20` }}>
                <svg className="w-3 h-3 md:w-4 md:h-4" fill={categoryColor} viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="font-serif text-lg md:text-xl text-[#e8e4dc]">How to Trade</h3>
            </div>
            <p className="font-mono text-xs md:text-sm text-[#e8e4dc]/60 leading-relaxed pl-8 md:pl-10">
              {pattern.howToTrade}
            </p>
          </div>

          {/* Key points */}
          <div className="bg-[#0a0a0f] border rounded-xl p-4 md:p-6" style={{ borderColor: `${categoryColor}20` }}>
            <h4 className="font-mono text-xs uppercase tracking-wider mb-4" style={{ color: categoryColor }}>
              Key Takeaways
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full mt-2" style={{ backgroundColor: categoryColor }} />
                <span className="font-mono text-xs md:text-sm text-[#e8e4dc]/60">
                  Always wait for confirmation before entering a trade
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full mt-2" style={{ backgroundColor: categoryColor }} />
                <span className="font-mono text-xs md:text-sm text-[#e8e4dc]/60">
                  This pattern is most reliable at key support/resistance levels
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full mt-2" style={{ backgroundColor: categoryColor }} />
                <span className="font-mono text-xs md:text-sm text-[#e8e4dc]/60">
                  Higher timeframes (daily, weekly) produce more reliable signals
                </span>
              </li>
            </ul>
          </div>

          {/* Complete button */}
          <button
            onClick={onComplete}
            disabled={isCompleted}
            className="w-full py-4 rounded-xl font-mono text-xs md:text-sm uppercase tracking-wider transition-all duration-300 min-h-[48px]"
            style={{
              backgroundColor: isCompleted ? `${categoryColor}20` : categoryColor,
              color: isCompleted ? categoryColor : '#0a0a0f',
            }}
          >
            {isCompleted ? 'Completed' : 'Mark as Learned'}
          </button>
        </div>
      </div>
    </div>
  );
}
