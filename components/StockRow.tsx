import React, { useState, useEffect } from 'react';
import { StockData, AlertCondition } from '../types';

interface StockRowProps {
  stock: StockData;
}

const getAlertBadgeColor = (alert: AlertCondition): string => {
  switch (alert) {
    case AlertCondition.HighVolume:
      return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
    case AlertCondition.GapUp:
      return 'bg-sky-500/20 text-sky-300 border-sky-500/30';
    case AlertCondition.NewHigh:
      return 'bg-green-500/20 text-green-300 border-green-500/30';
    case AlertCondition.ReversalBounce:
      return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
    case AlertCondition.Momentum:
      return 'bg-pink-500/20 text-pink-300 border-pink-500/30';
    default:
      return 'bg-slate-600/20 text-slate-300 border-slate-600/30';
  }
};

const PriceChangeIndicator: React.FC<{ price: number; lastPrice: number }> = ({ price, lastPrice }) => {
  const [flashColor, setFlashColor] = useState('');

  useEffect(() => {
    if (price > lastPrice) {
      setFlashColor('bg-green-500/20');
    } else if (price < lastPrice) {
      setFlashColor('bg-red-500/20');
    }

    const timer = setTimeout(() => setFlashColor(''), 500);
    return () => clearTimeout(timer);
  }, [price, lastPrice]);

  return (
    <span className={`transition-colors duration-500 ${flashColor} px-2 py-1 rounded-md`}>
      ${price.toFixed(2)}
    </span>
  );
};

const StockRow: React.FC<StockRowProps> = ({ stock }) => {
  const isPositive = stock.change >= 0;
  const changeColor = isPositive ? 'text-green-400' : 'text-red-400';

  const rangePercentage = ((stock.price - stock.low) / (stock.high - stock.low)) * 100;

  return (
    <tr className="hover:bg-slate-700/50 transition-colors duration-200">
      <td className="px-4 py-4 whitespace-nowrap">
        <div className="font-bold text-white text-lg">{stock.symbol}</div>
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-right font-mono text-lg text-white">
        <PriceChangeIndicator price={stock.price} lastPrice={stock.lastPrice} />
      </td>
      <td className={`px-4 py-4 whitespace-nowrap text-right font-mono ${changeColor}`}>
        <div>{stock.change.toFixed(2)}</div>
        <div className="text-sm">({stock.percentChange.toFixed(2)}%)</div>
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-right text-slate-300">
        {(stock.volume / 1_000_000).toFixed(2)}M
      </td>
      <td className="px-4 py-4 whitespace-nowrap hidden sm:table-cell">
        <div className="flex flex-col items-center">
          <div className="w-full bg-slate-600 rounded-full h-1.5 relative">
            <div
              className="bg-cyan-400 h-1.5 rounded-full"
              style={{ width: `${isNaN(rangePercentage) ? 50 : rangePercentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between w-full text-xs text-slate-400 mt-1">
            <span>{stock.low.toFixed(2)}</span>
            <span>{stock.high.toFixed(2)}</span>
          </div>
        </div>
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-right text-slate-300 hidden sm:table-cell">
        {stock.week52High.toFixed(2)}
      </td>
      <td className="px-4 py-4 whitespace-nowrap">
        <div className="flex flex-wrap gap-2 items-center">
          {stock.alerts.length > 0 ? (
            stock.alerts.map(alert => (
              <span
                key={alert}
                className={`px-2 py-1 text-xs font-semibold rounded-full border ${getAlertBadgeColor(alert)}`}
              >
                {alert}
              </span>
            ))
          ) : (
            <span className="text-slate-500 text-xs">--</span>
          )}
        </div>
      </td>
    </tr>
  );
};

export default StockRow;
