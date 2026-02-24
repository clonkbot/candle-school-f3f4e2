export interface CandleData {
  open: number;
  close: number;
  high: number;
  low: number;
}

export interface Pattern {
  id: string;
  name: string;
  category: 'bullish' | 'bearish' | 'neutral';
  candles: CandleData[];
  description: string;
  psychology: string;
  howToTrade: string;
  reliability: 1 | 2 | 3 | 4 | 5;
}

export const patterns: Pattern[] = [
  // Bullish patterns
  {
    id: 'hammer',
    name: 'Hammer',
    category: 'bullish',
    candles: [{ open: 70, close: 80, high: 85, low: 30 }],
    description: 'A single candle with a small body at the top and a long lower wick (at least 2x the body). Appears after a downtrend.',
    psychology: 'Price dropped significantly but buyers stepped in and pushed it back up. The long lower wick shows strong buying pressure and rejection of lower prices.',
    howToTrade: 'Enter long after the next candle closes green above the hammer. Place stop loss below the hammer\'s low. Target previous resistance.',
    reliability: 4,
  },
  {
    id: 'bullish-engulfing',
    name: 'Bullish Engulfing',
    category: 'bullish',
    candles: [
      { open: 70, close: 50, high: 75, low: 45 },
      { open: 45, close: 80, high: 85, low: 40 },
    ],
    description: 'A two-candle pattern where a large green candle completely engulfs the previous red candle\'s body.',
    psychology: 'The bulls completely overwhelmed the bears. Whatever the sellers achieved in the first candle was erased and surpassed by aggressive buying.',
    howToTrade: 'Enter long on the close of the engulfing candle or at the open of the next. Stop loss below the engulfing candle\'s low.',
    reliability: 5,
  },
  {
    id: 'morning-star',
    name: 'Morning Star',
    category: 'bullish',
    candles: [
      { open: 75, close: 45, high: 80, low: 40 },
      { open: 42, close: 48, high: 50, low: 38 },
      { open: 50, close: 78, high: 82, low: 48 },
    ],
    description: 'A three-candle reversal pattern: large red candle, small-bodied candle (the "star"), then a large green candle.',
    psychology: 'Strong selling is followed by indecision (the star), then powerful buying takes over. The tide has turned from bears to bulls.',
    howToTrade: 'Enter long after the third candle closes. Stop below the star. Target the first candle\'s open or higher.',
    reliability: 5,
  },
  {
    id: 'piercing-line',
    name: 'Piercing Line',
    category: 'bullish',
    candles: [
      { open: 75, close: 45, high: 80, low: 40 },
      { open: 35, close: 65, high: 68, low: 32 },
    ],
    description: 'A red candle followed by a green candle that opens below the prior low but closes above the midpoint of the red candle.',
    psychology: 'Bears pushed price to new lows but couldn\'t maintain control. Bulls fought back and reclaimed more than half the losses.',
    howToTrade: 'Enter long on confirmation (next green candle). Stop below the pattern\'s low. Target previous highs.',
    reliability: 3,
  },
  {
    id: 'three-white-soldiers',
    name: 'Three White Soldiers',
    category: 'bullish',
    candles: [
      { open: 30, close: 45, high: 48, low: 28 },
      { open: 46, close: 60, high: 63, low: 44 },
      { open: 61, close: 78, high: 80, low: 59 },
    ],
    description: 'Three consecutive long green candles, each opening within the previous body and closing near its high.',
    psychology: 'Sustained buying pressure across three periods. Each day, bulls maintain control from open to close. Very strong momentum.',
    howToTrade: 'Enter on the close of the third candle. Stop below the first candle. Be aware of potential exhaustion after such a strong move.',
    reliability: 4,
  },
  {
    id: 'inverted-hammer',
    name: 'Inverted Hammer',
    category: 'bullish',
    candles: [{ open: 35, close: 40, high: 75, low: 32 }],
    description: 'A candle with a small body at the bottom and a long upper wick (at least 2x the body). Appears after a downtrend.',
    psychology: 'Despite the failed rally (upper wick), the fact that bulls attempted to push higher signals potential reversal. Requires confirmation.',
    howToTrade: 'Wait for the next candle to close green above the inverted hammer. Stop below the low.',
    reliability: 3,
  },
  // Bearish patterns
  {
    id: 'shooting-star',
    name: 'Shooting Star',
    category: 'bearish',
    candles: [{ open: 65, close: 60, high: 90, low: 55 }],
    description: 'A single candle with a small body at the bottom and a long upper wick (at least 2x the body). Appears after an uptrend.',
    psychology: 'Bulls tried to push higher but sellers rejected those prices aggressively. The long upper wick shows strong selling pressure.',
    howToTrade: 'Enter short after the next candle closes red below the shooting star. Stop above the wick.',
    reliability: 4,
  },
  {
    id: 'bearish-engulfing',
    name: 'Bearish Engulfing',
    category: 'bearish',
    candles: [
      { open: 50, close: 70, high: 75, low: 45 },
      { open: 75, close: 40, high: 80, low: 35 },
    ],
    description: 'A two-candle pattern where a large red candle completely engulfs the previous green candle\'s body.',
    psychology: 'Bears completely overwhelmed the bulls. All gains from the first candle were erased and sellers pushed even lower.',
    howToTrade: 'Enter short on the close of the engulfing candle. Stop above the engulfing candle\'s high.',
    reliability: 5,
  },
  {
    id: 'evening-star',
    name: 'Evening Star',
    category: 'bearish',
    candles: [
      { open: 40, close: 70, high: 75, low: 35 },
      { open: 72, close: 68, high: 80, low: 65 },
      { open: 65, close: 38, high: 68, low: 35 },
    ],
    description: 'A three-candle reversal pattern: large green candle, small-bodied candle (the "star"), then a large red candle.',
    psychology: 'Strong buying is followed by indecision, then powerful selling takes over. The bulls have run out of steam.',
    howToTrade: 'Enter short after the third candle closes. Stop above the star. Target the first candle\'s open or lower.',
    reliability: 5,
  },
  {
    id: 'hanging-man',
    name: 'Hanging Man',
    category: 'bearish',
    candles: [{ open: 75, close: 70, high: 80, low: 40 }],
    description: 'Same shape as a hammer but appears after an uptrend. Small body at top, long lower wick.',
    psychology: 'Despite recovery, the fact that price dropped significantly intraday shows underlying selling pressure. Uptrend may be weakening.',
    howToTrade: 'Wait for confirmation - enter short if next candle closes red. Stop above the high.',
    reliability: 3,
  },
  {
    id: 'dark-cloud-cover',
    name: 'Dark Cloud Cover',
    category: 'bearish',
    candles: [
      { open: 40, close: 70, high: 75, low: 35 },
      { open: 78, close: 52, high: 82, low: 50 },
    ],
    description: 'A green candle followed by a red candle that opens above the prior high but closes below the midpoint of the green candle.',
    psychology: 'Bulls created a new high but couldn\'t hold it. Bears stepped in and pushed price well into the prior gains.',
    howToTrade: 'Enter short on confirmation. Stop above the pattern\'s high. Target previous support.',
    reliability: 3,
  },
  {
    id: 'three-black-crows',
    name: 'Three Black Crows',
    category: 'bearish',
    candles: [
      { open: 78, close: 62, high: 80, low: 60 },
      { open: 61, close: 48, high: 63, low: 45 },
      { open: 47, close: 30, high: 49, low: 28 },
    ],
    description: 'Three consecutive long red candles, each opening within the previous body and closing near its low.',
    psychology: 'Sustained selling pressure across three periods. Bears maintain control throughout. Very strong bearish momentum.',
    howToTrade: 'Enter short on the close of the third candle. Stop above the first candle. Watch for potential exhaustion.',
    reliability: 4,
  },
  // Neutral / Indecision patterns
  {
    id: 'doji',
    name: 'Doji',
    category: 'neutral',
    candles: [{ open: 50, close: 50, high: 70, low: 30 }],
    description: 'A candle where the open and close are virtually the same, creating a cross or plus sign shape.',
    psychology: 'Perfect balance between buyers and sellers. Neither side won. This is pure indecision and often precedes a reversal.',
    howToTrade: 'Don\'t trade dojis alone. Wait for the next candle to confirm direction. A doji after a trend often signals reversal.',
    reliability: 2,
  },
  {
    id: 'spinning-top',
    name: 'Spinning Top',
    category: 'neutral',
    candles: [{ open: 48, close: 52, high: 70, low: 30 }],
    description: 'A candle with a small body in the middle and wicks on both sides. The body color doesn\'t matter much.',
    psychology: 'Both buyers and sellers tried but neither could gain control. Market is undecided about direction.',
    howToTrade: 'Like dojis, don\'t trade alone. At the end of trends, they can signal exhaustion. Wait for confirmation.',
    reliability: 2,
  },
  {
    id: 'inside-bar',
    name: 'Inside Bar',
    category: 'neutral',
    candles: [
      { open: 30, close: 70, high: 80, low: 20 },
      { open: 45, close: 55, high: 60, low: 40 },
    ],
    description: 'A candle that is completely contained within the range (high to low) of the previous candle.',
    psychology: 'Consolidation and compression. The market is coiling up for a potential breakout. Direction is unknown until it breaks.',
    howToTrade: 'Trade the breakout: go long if price breaks above the inside bar, short if it breaks below. Use tight stops.',
    reliability: 4,
  },
  {
    id: 'marubozu',
    name: 'Marubozu',
    category: 'neutral',
    candles: [{ open: 30, close: 70, high: 70, low: 30 }],
    description: 'A candle with no wicks (or very small wicks). The body extends from high to low. Can be bullish or bearish.',
    psychology: 'One side had complete control. A bullish marubozu shows pure buying power; bearish shows pure selling. Strong conviction candle.',
    howToTrade: 'Respect the direction. A bullish marubozu suggests continuation higher. But at extremes, can signal exhaustion.',
    reliability: 3,
  },
];
