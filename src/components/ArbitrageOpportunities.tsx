import React from 'react';
import { ExchangeRate } from '../types';
import { calculateArbitrage } from '../utils/arbitrageCalculator';

interface ArbitrageOpportunitiesProps {
  rates: ExchangeRate[];
}

const ArbitrageOpportunities: React.FC<ArbitrageOpportunitiesProps> = ({ rates }) => {
  const opportunities = calculateArbitrage(rates);

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h2 className="text-xl font-semibold mb-2">Arbitrage Opportunities</h2>
      {opportunities.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {opportunities.map((opp, index) => (
            <div key={index} className="p-3 bg-green-100 rounded">
              <p className="font-bold">{opp.pair}: {opp.profitPercentage.toFixed(2)}% profit</p>
              <p>Buy: {opp.buyExchange} at {opp.buyRate.toFixed(2)}</p>
              <p>Sell: {opp.sellExchange} at {opp.sellRate.toFixed(2)}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No arbitrage opportunities found at the moment.</p>
      )}
    </div>
  );
};

export default ArbitrageOpportunities;