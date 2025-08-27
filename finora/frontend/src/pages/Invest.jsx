import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import BuyModal from '../components/dashboard/BuyModal';
import SellModal from '../components/dashboard/SellModal';

const Invest = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const [portfolio, setPortfolio] = useState(null);
  const [assets, setAssets] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isBuyModalOpen, setBuyModalOpen] = useState(false);
  const [isSellModalOpen, setSellModalOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [selectedHolding, setSelectedHolding] = useState(null);

  const fetchData = async () => {
    if (user) {
      try {
        setLoading(true);
        const portfolioRes = await axios.get('http://localhost:3001/api/portfolio');
        setPortfolio(portfolioRes.data.data);

        const assetsRes = await axios.get('http://localhost:3001/api/assets');
        setAssets(assetsRes.data.data);

        const accountsRes = await axios.get('http://localhost:3001/api/accounts');
        setAccounts(accountsRes.data.data);

        setError(null);
      } catch (err) {
        console.error('Failed to fetch investment data', err);
        setError('Could not load your investment data.');
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (!authLoading) {
      fetchData();
    }
  }, [user, authLoading]);

  const handleBuyClick = (asset) => {
    setSelectedAsset(asset);
    setBuyModalOpen(true);
  };

  const handleSellClick = (holding) => {
    setSelectedHolding(holding);
    setSellModalOpen(true);
  };

  const handleBuy = async (data) => {
    try {
      await axios.post('http://localhost:3001/api/holdings/buy', data);
      setBuyModalOpen(false);
      fetchData();
    } catch (err) { console.error('Buy failed', err); }
  };

  const handleSell = async (data) => {
    try {
      await axios.post('http://localhost:3001/api/holdings/sell', data);
      setSellModalOpen(false);
      fetchData();
    } catch (err) { console.error('Sell failed', err); }
  };

  if (loading || authLoading) return <div className="p-8">Loading Investment Portfolio...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;

  const totalGain = portfolio?.totalValue > 0 ? portfolio.totalValue - portfolio.holdings.reduce((acc, h) => acc + (h.quantity * h.purchasePrice), 0) : 0;
  const totalCost = portfolio?.holdings.reduce((acc, h) => acc + (h.quantity * h.purchasePrice), 0);
  const totalGainPercent = totalCost > 0 ? (totalGain / totalCost) * 100 : 0;

  return (
    <>
      <div className="bg-background min-h-full">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <header className="mb-8">
            <h1 className="text-3xl font-bold leading-tight text-text-primary">Investment Portfolio</h1>
          </header>

          <main className="grid grid-cols-1 lg:grid-cols-3 lg:gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Portfolio Summary and Holdings */}
              {portfolio ? (
                <>
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h2 className="text-lg font-medium text-gray-500">Portfolio Value</h2>
                    <p className="mt-1 text-4xl font-semibold text-text-primary">${portfolio.totalValue.toLocaleString('en-US', {minimumFractionDigits: 2})}</p>
                    <p className={`mt-2 text-lg font-medium ${totalGain >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {totalGain >= 0 ? '+' : '-'}${Math.abs(totalGain).toLocaleString('en-US', {minimumFractionDigits: 2})} ({totalGainPercent.toFixed(2)}%) All Time
                    </p>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-text-primary mb-4">Your Holdings</h2>
                    <div className="bg-white shadow overflow-hidden sm:rounded-md">
                      <ul role="list" className="divide-y divide-gray-200">
                        {portfolio.holdings.length > 0 ? portfolio.holdings.map((holding) => (
                          <li key={holding._id}>
                            <div className="px-4 py-4 sm:px-6 flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium text-primary truncate">{holding.asset.name}</p>
                                <p className="text-sm text-gray-500">{holding.asset.tickerSymbol}</p>
                              </div>
                              <div className="ml-2 text-right">
                                <p className="text-sm font-medium text-text-primary">${(holding.quantity * holding.asset.currentPrice).toLocaleString('en-US', {minimumFractionDigits: 2})}</p>
                                <p className="text-sm text-gray-500">{holding.quantity} shares</p>
                              </div>
                              <div className="ml-4">
                                <button onClick={() => handleSellClick(holding)} className="text-sm font-medium text-red-600 hover:text-red-800">Sell</button>
                              </div>
                            </div>
                          </li>
                        )) : <p className="px-4 py-4 sm:px-6 text-gray-500">You do not have any holdings yet.</p>}
                      </ul>
                    </div>
                  </div>
                </>
              ) : <p>No portfolio data found.</p>}
            </div>

            <div className="lg:col-span-1 space-y-8">
              {/* Tradable Assets */}
              <div>
                <h2 className="text-xl font-semibold text-text-primary mb-4">Markets</h2>
                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                  <ul role="list" className="divide-y divide-gray-200">
                    {assets.map((asset) => (
                      <li key={asset._id}>
                        <div className="px-4 py-4 sm:px-6 flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-primary truncate">{asset.name}</p>
                            <p className="text-sm text-gray-500">{asset.tickerSymbol}</p>
                          </div>
                          <div className="ml-2 text-right">
                            <p className="text-sm font-medium text-text-primary">${asset.currentPrice.toLocaleString('en-US', {minimumFractionDigits: 2})}</p>
                            <button onClick={() => handleBuyClick(asset)} className="mt-1 text-sm font-medium text-green-600 hover:text-green-800">Buy</button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      {isBuyModalOpen && <BuyModal isOpen={isBuyModalOpen} onClose={() => setBuyModalOpen(false)} onBuy={handleBuy} asset={selectedAsset} accounts={accounts} />}
      {isSellModalOpen && <SellModal isOpen={isSellModalOpen} onClose={() => setSellModalOpen(false)} onSell={handleSell} holding={selectedHolding} accounts={accounts} />}
    </>
  );
};

export default Invest;
