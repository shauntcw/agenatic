import axios from 'axios';
import { ExchangeRate } from '../types';

const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3';

const EXCHANGES = [
  // Korean exchanges
  'upbit', 'bithumb', 'korbit', 'coinone', 'gopax',
  // Global exchanges
  'binance', 'coinbase', 'kraken', 'huobi', 'kucoin', 'bitfinex', 'okex'
];

const COINS = ['bitcoin', 'ethereum', 'tether'];
const CURRENCIES = ['krw', 'usd'];

export const fetchExchangeRates = async (): Promise<ExchangeRate[]> => {
  try {
    const response = await axios.get(`${COINGECKO_API_URL}/exchanges/list`);
    const supportedExchanges = response.data.filter((exchange: any) => 
      EXCHANGES.includes(exchange.id)
    );

    const rates: ExchangeRate[] = [];

    for (const exchange of supportedExchanges) {
      for (const coin of COINS) {
        for (const currency of CURRENCIES) {
          try {
            const priceResponse = await axios.get(`${COINGECKO_API_URL}/simple/price`, {
              params: {
                ids: coin,
                vs_currencies: currency,
                exchange_ids: exchange.id,
              },
            });

            if (priceResponse.data[coin] && priceResponse.data[coin][currency]) {
              rates.push({
                exchange: exchange.name,
                pair: `${coin.toUpperCase()}/${currency.toUpperCase()}`,
                rate: priceResponse.data[coin][currency],
              });
            }
          } catch (error) {
            console.error(`Error fetching price for ${coin}/${currency} on ${exchange.name}:`, error);
          }
        }
      }
    }

    return rates;
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    throw error;
  }
};