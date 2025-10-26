import React, { useState, useEffect } from 'react';
import { StockData } from './types';
import { generateInitialData, updateStockData } from './services/stockSimulator';
import StockTable from './components/StockTable';
import { SCAN_INTERVAL } from './constants';

const App: React.FC = () => {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  useEffect(() => {
    setStocks(generateInitialData());

    const intervalId = setInterval(() => {
      setStocks(prevStocks => updateStockData(prevStocks));
      setLastUpdated(new Date());
    }, SCAN_INTERVAL);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <header className="mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-cyan-400 tracking-tight">
            Live Stock Scanner
          </h1>
          <p className="text-slate-400 mt-2">
            Simulating market data for popular stocks. Updates every 15 seconds.
          </p>
          <div className="text-right text-sm text-slate-500 -mt-4">
            Last Updated: {lastUpdated.toLocaleTimeString()}
          </div>
        </header>
        <main>
          <StockTable stocks={stocks} />
        </main>
        <footer className="text-center mt-8 text-slate-500 text-sm">
          <p>This is a simulation. Not financial advice.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
