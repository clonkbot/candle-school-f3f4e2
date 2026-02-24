import { type Pattern } from '../data/patterns';

interface PatternCardProps {
  pattern: Pattern;
  index: number;
  isCompleted: boolean;
  onClick: () => void;
}

export function PatternCard({ pattern, index, isCompleted, onClick }: PatternCardProps) {
  const categoryColor =
    pattern.category === 'bullish'
      ? '#22c55e'
      : pattern.category === 'bearish'
      ? '#ef4444'
      : '#d4af37';

  const chartHeight = 60;
  const candleWidth = pattern.candles.length === 1 ? 20 : pattern.candles.length === 2 ? 14 : 10;
  const gap = 4;
  const totalWidth = pattern.candles.length * (candleWidth + gap);

  return (
    <button
      onClick={onClick}
      className="group relative bg-gradient-to-br from-[#111118] to-[#0d0d12] border rounded-xl p-4 md:p-5 text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-lg min-h-[44px]"
      style={{
        borderColor: isCompleted ? `${categoryColor}50` : 'rgba(212,175,55,0.1)',
        animationDelay: `${index * 100}ms`,
      }}
    >
      {/* Completed badge */}
      {isCompleted && (
        <div
          className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center"
          style={{ backgroundColor: `${categoryColor}30` }}
        >
          <svg className="w-3 h-3" fill={categoryColor} viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}

      {/* Mini candlestick visualization */}
      <div className="flex justify-center mb-4">
        <svg
          viewBox={`0 0 ${totalWidth + 10} ${chartHeight + 10}`}
          width={totalWidth + 10}
          height={chartHeight + 10}
          className="opacity-80 group-hover:opacity-100 transition-opacity"
        >
          {pattern.candles.map((candle, i) => {
            const x = i * (candleWidth + gap) + 5;
            const isBullish = candle.close > candle.open;
            const color = isBullish ? '#22c55e' : '#ef4444';
            const bodyTop = chartHeight - (Math.max(candle.open, candle.close) / 100) * chartHeight + 5;
            const bodyBottom = chartHeight - (Math.min(candle.open, candle.close) / 100) * chartHeight + 5;
            const bodyHeight = Math.max(bodyBottom - bodyTop, 2);
            const wickTop = chartHeight - (candle.high / 100) * chartHeight + 5;
            const wickBottom = chartHeight - (candle.low / 100) * chartHeight + 5;

            return (
              <g key={i}>
                <line
                  x1={x + candleWidth / 2}
                  y1={wickTop}
                  x2={x + candleWidth / 2}
                  y2={wickBottom}
                  stroke={color}
                  strokeWidth={1.5}
                />
                <rect
                  x={x}
                  y={bodyTop}
                  width={candleWidth}
                  height={bodyHeight}
                  fill={color}
                  rx="1"
                />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Pattern info */}
      <div className="font-mono text-[10px] md:text-xs uppercase tracking-wider mb-1" style={{ color: categoryColor }}>
        {pattern.category}
      </div>
      <h3 className="font-serif text-base md:text-lg text-[#e8e4dc] mb-2 group-hover:text-[#d4af37] transition-colors">
        {pattern.name}
      </h3>
      <p className="font-mono text-[10px] md:text-xs text-[#e8e4dc]/50 line-clamp-2">
        {pattern.description}
      </p>

      {/* Reliability indicator */}
      <div className="flex items-center gap-2 mt-3">
        <span className="font-mono text-[10px] text-[#e8e4dc]/30">Reliability</span>
        <div className="flex gap-0.5">
          {[1, 2, 3, 4, 5].map((level) => (
            <div
              key={level}
              className="w-2 h-2 rounded-sm"
              style={{
                backgroundColor: level <= pattern.reliability ? categoryColor : '#1a1a24',
              }}
            />
          ))}
        </div>
      </div>

      {/* Hover indicator */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 100%, ${categoryColor}10 0%, transparent 60%)`,
        }}
      />
    </button>
  );
}
