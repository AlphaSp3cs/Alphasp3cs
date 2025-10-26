import { StockData, AlertCondition } from '../types';
import { SYMBOLS, VOLUME_MULTIPLIER, GAP_THRESHOLD, NEW_HIGH_THRESHOLD, REVERSAL_BOUNCE_THRESHOLD, MOMENTUM_RSI_THRESHOLD } from '../constants';

const randomBetween = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

const createInitialStock = (symbol: string): StockData => {
  const price = randomBetween(2, 90);
  const week52Low = price * randomBetween(0.4, 0.7);
  const week52High = price * randomBetween(1.1, 1.8);
  const prevClose = price * randomBetween(0.98, 1.02);
  const open = prevClose * (1 + randomBetween(-0.02, 0.02));
  const high = Math.max(open, prevClose) * randomBetween(1.0, 1.03);
  const low = Math.min(open, prevClose) * randomBetween(0.97, 1.0);
  const avgVolume = Math.floor(randomBetween(1_000_000, 20_000_000));
  const volume = Math.floor(avgVolume * randomBetween(0.5, 1.5));
  const change = price - prevClose;
  const percentChange = (change / prevClose) * 100;

  return {
    symbol,
    price,
    change,
    percentChange,
    volume,
    avgVolume,
    open,
    high,
    low,
    prevClose,
    week52High,
    week52Low,
    rsi: randomBetween(30, 70),
    alerts: [],
    lastPrice: price,
  };
};

export const generateInitialData = (): StockData[] => {
  return SYMBOLS.map(createInitialStock);
};

export const updateStockData = (currentStocks: StockData[]): StockData[] => {
  return currentStocks.map(stock => {
    const lastPrice = stock.price;
    const volatility = 0.02; // Max 2% change per tick
    const changePercent = randomBetween(-volatility, volatility);
    const newPrice = Math.max(0.01, lastPrice * (1 + changePercent));

    const newVolume = stock.volume + Math.floor(stock.avgVolume / 100 * randomBetween(0.1, 2));

    const newHigh = Math.max(stock.high, newPrice);
    const newLow = Math.min(stock.low, newPrice);
    
    const newChange = newPrice - stock.prevClose;
    const newPercentChange = (newChange / stock.prevClose) * 100;
    
    // Simulate RSI
    const rsiChange = randomBetween(-5, 5);
    let newRsi = stock.rsi + rsiChange;
    if (newPrice > lastPrice) newRsi += 3;
    if (newPrice < lastPrice) newRsi -= 3;
    newRsi = Math.max(0, Math.min(100, newRsi));

    // Check for alerts
    const alerts: AlertCondition[] = [];
    if (newVolume > stock.avgVolume * VOLUME_MULTIPLIER) {
      alerts.push(AlertCondition.HighVolume);
    }
    const gapPercent = ((stock.open - stock.prevClose) / stock.prevClose) * 100;
    if (gapPercent > GAP_THRESHOLD) {
      alerts.push(AlertCondition.GapUp);
    }
    if ((newPrice / stock.week52High) * 100 > NEW_HIGH_THRESHOLD) {
      alerts.push(AlertCondition.NewHigh);
    }
    const bouncePercent = ((newPrice - stock.low) / stock.low) * 100;
    if (bouncePercent > REVERSAL_BOUNCE_THRESHOLD && newPrice > stock.open) {
      alerts.push(AlertCondition.ReversalBounce);
    }
    if (newRsi > MOMENTUM_RSI_THRESHOLD) {
      alerts.push(AlertCondition.Momentum);
    }
    
    return {
      ...stock,
      price: newPrice,
      change: newChange,
      percentChange: newPercentChange,
      volume: newVolume,
      high: newHigh,
      low: newLow,
      rsi: newRsi,
      alerts,
      lastPrice: lastPrice,
    };
  });
};
