import { ExchangeRate, ArbitrageOpportunity } from '../types';

export const calculateArbitrage = (rates: ExchangeRate[]): ArbitrageOpportunity[] => {
  const opportunities: ArbitrageOpportunity[] = [];

  rates.forEach((buyRate) => {
    rates.forEach((sellRate) => {
      if (buyRate.exchange !== sellRate.exchange && buyRate.pair === sellRate.pair) {
        const profitPercentage = ((sellRate.rate - buyRate.rate) / buyRate.rate) * 100;
        if (profitPercentage > 0) {
          opportunities.push({
            pair: buyRate.pair,
            buyExchange: buyRate.exchange,
            sellExchange: sellRate.exchange,
            buyRate: buyRate.rate,
            sellRate: sellRate.rate,
            profitPercentage,
          });
        }
      }
    });
  });

  return opportunities.sort((a, b) => b.profitPercentage - a.profitPercentage);
};