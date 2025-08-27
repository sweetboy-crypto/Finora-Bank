import React, { useState, useEffect, useContext } from 'react';
import api from '../api/axios';
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
        const portfolioRes = await api.get('/api/portfolio');
        setPortfolio(portfolioRes.data.data);

        const assetsRes = await api.get('/api/assets');
        setAssets(assetsRes.data.data);

        const accountsRes = await api.get('/api/accounts');
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
      await api.post('/api/holdings/buy', data);
      setBuyModalOpen(false);
      fetchData();
    } catch (err) { console.error('Buy failed', err); }
  };

  const handleSell = async (data) => {
    try {
      await api.post('/api/holdings/sell', data);
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
        {/* ... JSX for rendering the page ... */}
      </div>
      {isBuyModalOpen && <BuyModal isOpen={isBuyModalOpen} onClose={() => setBuyModalOpen(false)} onBuy={handleBuy} asset={selectedAsset} accounts={accounts} />}
      {isSellModalOpen && <SellModal isOpen={isSellModalOpen} onClose={() => setSellModalOpen(false)} onSell={handleSell} holding={selectedHolding} accounts={accounts} />}
    </>
  );
};

export default Invest;
