export enum AlertCondition {
  HighVolume = 'High Volume',
  GapUp = 'Gap Up',
  NewHigh = 'New 52-Week High',
  ReversalBounce = 'Reversal Bounce',
  Momentum = 'RSI Momentum',
}

export interface StockData {
  symbol: string;
  price: number;
  change: number;
  percentChange: number;
  volume: number;
  avgVolume: number;
  open: number;
  high: number;
  low: number;
  prevClose: number;
  week52High: number;
  week52Low: number;
  rsi: number;
  alerts: AlertCondition[];
  lastPrice: number; // For styling price changes
}
