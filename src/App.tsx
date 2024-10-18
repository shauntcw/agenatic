import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import ExchangeRates from './components/ExchangeRates';
import ArbitrageOpportunities from './components/ArbitrageOpportunities';
import AlertSettings from './components/AlertSettings';
import { fetchExchangeRates } from './api/exchangeApi';
import { ExchangeRate } from './types';

function App() {
  const [exchangeRates, setExchangeRates] = useState<ExchangeRate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        setLoading(true);
        setError(null);
        const rates = await fetchExchangeRates();
        setExchangeRates(rates);
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
        setError('Failed to fetch exchange rates. Please try again later.');
        toast.error('Failed to fetch exchange rates');
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
    const interval = setInterval(fetchRates, 60000); // Refresh every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-right" />
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">Global Crypto Arbitrage Tracker</h1>
      </header>
      <main className="container mx-auto p-4">
        {loading ? (
          <p className="text-center">Loading exchange rates...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <>
            <ExchangeRates rates={exchangeRates} />
            <ArbitrageOpportunities rates={exchangeRates} />
            <AlertSettings />
          </>
        )}
      </main>
    </div>
  );
}

export default App;