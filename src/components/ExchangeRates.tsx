import React from 'react';
import { ExchangeRate } from '../types';

interface ExchangeRatesProps {
  rates: ExchangeRate[];
}

const ExchangeRates: React.FC<ExchangeRatesProps> = ({ rates }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h2 className="text-xl font-semibold mb-2">Exchange Rates</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {rates.map((rate) => (
          <div key={`${rate.exchange}-${rate.pair}`} className="border rounded p-2">
            <h3 className="font-medium">{rate.exchange}</h3>
            <p>{rate.pair}: {rate.rate.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExchangeRates;