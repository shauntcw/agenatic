export interface ExchangeRate {
  exchange: string;
  pair: string;
  rate: number;
}

export interface ArbitrageOpportunity {
  pair: string;
  buyExchange: string;
  sellExchange: string;
  buyRate: number;
  sellRate: number;
  profitPercentage: number;
}