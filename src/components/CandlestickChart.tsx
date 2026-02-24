import { useState, useEffect } from 'react';

interface Candle {
  open: number;
  close: number;
  high: number;
  low: number;
}

const generateCandles = (): Candle[] => {
  const candles: Candle[] = [];
  let price = 50;

  for (let i = 0; i < 12; i++) {
    const change = (Math.random() - 0.48) * 15;
    const open = price;
    const close = price + change;
    const high = Math.max(open, close) + Math.random() * 8;
    const low = Math.min(open, close) - Math.random() * 8;

    candles.push({
      open: Math.max(10, Math.min(90, open)),
      close: Math.max(10, Math.min(90, close)),
      high: Math.max(10, Math.min(95, high)),
      low: Math.max(5, Math.min(90, low)),
    });

    price = close;
  }

  return candles;
};

export function CandlestickChart() {
  const [candles, setCandles] = useState<Candle[]>(generateCandles);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCandles(generateCandles());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const chartHeight = 180;
  const candleWidth = 16;
  const gap = 6;

  return (
    <div className="relative">
      <div className="bg-gradient-to-br from-[#111118] to-[#0d0d12] border border-[#d4af37]/20 rounded-xl p-3 md:p-6 overflow-hidden">
        <div className="flex items-center justify-between mb-3 md:mb-4">
          <div className="font-mono text-[10px] md:text-xs text-[#d4af37]/60">DEMO/USD</div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#22c55e] animate-pulse" />
            <span className="font-mono text-[10px] md:text-xs text-[#e8e4dc]/40">LIVE</span>
          </div>
        </div>

        <svg
          viewBox={`0 0 ${(candleWidth + gap) * 12 + 20} ${chartHeight + 20}`}
          className="w-full h-auto max-w-[320px] md:max-w-[400px]"
        >
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map((y) => (
            <line
              key={y}
              x1="0"
              y1={chartHeight - (y / 100) * chartHeight + 10}
              x2={(candleWidth + gap) * 12 + 20}
              y2={chartHeight - (y / 100) * chartHeight + 10}
              stroke="#d4af37"
              strokeOpacity="0.1"
              strokeDasharray="4"
            />
          ))}

          {/* Candles */}
          {candles.map((candle, i) => {
            const x = i * (candleWidth + gap) + 10;
            const isBullish = candle.close > candle.open;
            const color = isBullish ? '#22c55e' : '#ef4444';
            const bodyTop = chartHeight - (Math.max(candle.open, candle.close) / 100) * chartHeight + 10;
            const bodyBottom = chartHeight - (Math.min(candle.open, candle.close) / 100) * chartHeight + 10;
            const bodyHeight = Math.max(bodyBottom - bodyTop, 2);
            const wickTop = chartHeight - (candle.high / 100) * chartHeight + 10;
            const wickBottom = chartHeight - (candle.low / 100) * chartHeight + 10;
            const isHovered = hoveredIndex === i;

            return (
              <g
                key={i}
                className="transition-all duration-300 cursor-pointer"
                style={{
                  transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                  opacity: hoveredIndex !== null && !isHovered ? 0.4 : 1,
                }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Wick */}
                <line
                  x1={x + candleWidth / 2}
                  y1={wickTop}
                  x2={x + candleWidth / 2}
                  y2={wickBottom}
                  stroke={color}
                  strokeWidth={isHovered ? 3 : 2}
                  className="transition-all duration-200"
                />
                {/* Body */}
                <rect
                  x={x}
                  y={bodyTop}
                  width={candleWidth}
                  height={bodyHeight}
                  fill={color}
                  rx="2"
                  className="transition-all duration-200"
                  style={{
                    filter: isHovered ? `drop-shadow(0 0 8px ${color})` : 'none',
                  }}
                />
              </g>
            );
          })}
        </svg>

        {hoveredIndex !== null && (
          <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4 right-2 md:right-4 bg-[#0a0a0f]/90 border border-[#d4af37]/30 rounded-lg p-2 md:p-3 font-mono text-[10px] md:text-xs">
            <div className="grid grid-cols-4 gap-1 md:gap-2 text-center">
              <div>
                <div className="text-[#e8e4dc]/40">O</div>
                <div className="text-[#e8e4dc]">{candles[hoveredIndex].open.toFixed(1)}</div>
              </div>
              <div>
                <div className="text-[#e8e4dc]/40">H</div>
                <div className="text-[#e8e4dc]">{candles[hoveredIndex].high.toFixed(1)}</div>
              </div>
              <div>
                <div className="text-[#e8e4dc]/40">L</div>
                <div className="text-[#e8e4dc]">{candles[hoveredIndex].low.toFixed(1)}</div>
              </div>
              <div>
                <div className="text-[#e8e4dc]/40">C</div>
                <div className={candles[hoveredIndex].close > candles[hoveredIndex].open ? 'text-[#22c55e]' : 'text-[#ef4444]'}>
                  {candles[hoveredIndex].close.toFixed(1)}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
