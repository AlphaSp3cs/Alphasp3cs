import React from 'react';
import { StockData } from '../types';
import StockRow from './StockRow';

interface StockTableProps {
  stocks: StockData[];
}

const tableHeaders = [
  { label: 'Symbol', align: 'left' },
  { label: 'Price', align: 'right' },
  { label: 'Change', align: 'right' },
  { label: 'Volume', align: 'right' },
  { label: 'Day Range', align: 'center', mobileHidden: true },
  { label: '52-Wk High', align: 'right', mobileHidden: true },
  { label: 'Alerts', align: 'left' }
];

const StockTable: React.FC<StockTableProps> = ({ stocks }) => {
  if (stocks.length === 0) {
    return (
      <div className="text-center py-10 text-slate-400">
        Initializing data...
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-slate-800 rounded-lg shadow-lg">
      <table className="min-w-full divide-y divide-slate-700">
        <thead className="bg-slate-900/50">
          <tr>
            {tableHeaders.map((header, index) => (
              <th
                key={index}
                scope="col"
                className={`px-4 py-3 text-${header.align} text-xs font-medium text-slate-400 uppercase tracking-wider ${header.mobileHidden ? 'hidden sm:table-cell' : ''}`}
              >
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-700">
          {stocks.map(stock => (
            <StockRow key={stock.symbol} stock={stock} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockTable;
