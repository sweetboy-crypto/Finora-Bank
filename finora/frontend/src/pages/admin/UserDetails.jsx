import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api/axios';
import EditBalanceModal from '../../components/admin/EditBalanceModal.jsx';
import EditHoldingModal from '../../components/admin/EditHoldingModal.jsx';

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isEditBalanceModalOpen, setEditBalanceModalOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);

  const [isEditHoldingModalOpen, setEditHoldingModalOpen] = useState(false);
  const [selectedHolding, setSelectedHolding] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const userRes = await api.get(`/api/admin/users/${id}`);
      setUser(userRes.data.data);

      const accountsRes = await api.get(`/api/admin/users/${id}/accounts`);
      setAccounts(accountsRes.data.data);

      const portfolioRes = await api.get(`/api/admin/users/${id}/portfolio`);
      setPortfolio(portfolioRes.data.data);

      setError(null);
    } catch (err) {
      console.error('Failed to fetch user details', err);
      if (err.response && err.response.status === 404) {
        setPortfolio(null);
      } else {
        setError('Could not load user details.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleEditBalanceClick = (account) => {
    setSelectedAccount(account);
    setEditBalanceModalOpen(true);
  };

  const handleSaveBalance = async (accountId, data) => {
    try {
      await api.put(`/api/admin/accounts/${accountId}`, data);
      setEditBalanceModalOpen(false);
      fetchData();
    } catch (err) { console.error('Failed to update balance', err); }
  };

  const handleEditHoldingClick = (holding) => {
    setSelectedHolding(holding);
    setEditHoldingModalOpen(true);
  };

  const handleSaveHolding = async (holdingId, data) => {
    try {
      await api.put(`/api/admin/holdings/${holdingId}`, data);
      setEditHoldingModalOpen(false);
      fetchData();
    } catch (err) { console.error('Failed to update holding', err); }
  };

  if (loading) return <div>Loading user details...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!user) return <div>User not found.</div>;

  return (
    <>
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">User Details</h1>
        <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">{user.name}</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">{user.email}</p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Role</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.role}</dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Joined</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{new Date(user.createdAt).toLocaleDateString()}</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900">Bank Accounts</h2>
          <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-md">
            <ul role="list" className="divide-y divide-gray-200">
              {accounts.length > 0 ? accounts.map(account => (
                <li key={account._id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-primary truncate">{account.accountName} ({account.accountType})</p>
                        {account.accountNumber && <p className="text-xs text-gray-500">Acct #: {account.accountNumber}</p>}
                      </div>
                      <div className="flex items-center">
                        <p className="text-sm font-medium text-gray-900">${account.balance.toLocaleString('en-US', {minimumFractionDigits: 2})}</p>
                        <button onClick={() => handleEditBalanceClick(account)} className="ml-4 text-sm font-medium text-primary hover:text-primary/90">Edit Balance</button>
                      </div>
                    </div>
                  </div>
                </li>
              )) : <p className="px-4 py-4 sm:px-6 text-gray-500">This user has no bank accounts.</p>}
            </ul>
          </div>
        </div>

        {/* Investment Portfolio Section */}
        <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900">Investment Portfolio</h2>
            {portfolio ? (
                <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-md">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Portfolio Value: ${portfolio.totalValue.toLocaleString('en-US', {minimumFractionDigits: 2})}</h3>
                    </div>
                    <ul role="list" className="divide-y divide-gray-200">
                        {portfolio.holdings.length > 0 ? portfolio.holdings.map(holding => (
                            <li key={holding._id} className="px-4 py-4 sm:px-6 flex justify-between items-center">
                                <div>
                                    <p className="text-sm font-medium text-primary">{holding.asset.name} ({holding.asset.tickerSymbol})</p>
                                    <p className="text-sm text-gray-500">{holding.quantity} shares @ avg ${holding.purchasePrice.toFixed(2)}</p>
                                </div>
                                <div className="flex items-center">
                                    <p className="text-sm font-medium text-gray-900">${(holding.quantity * holding.asset.currentPrice).toLocaleString('en-US', {minimumFractionDigits: 2})}</p>
                                    <button onClick={() => handleEditHoldingClick(holding)} className="ml-4 text-sm font-medium text-primary hover:text-primary/90">Edit</button>
                                </div>
                            </li>
                        )) : <p className="px-4 py-4 sm:px-6 text-gray-500">No holdings in this portfolio.</p>}
                    </ul>
                </div>
            ) : <p className="mt-4 text-gray-500">This user does not have an investment portfolio.</p>}
        </div>
      </div>
      <EditBalanceModal isOpen={isEditBalanceModalOpen} onClose={() => setEditBalanceModalOpen(false)} onSave={handleSaveBalance} account={selectedAccount} />
      <EditHoldingModal isOpen={isEditHoldingModalOpen} onClose={() => setEditHoldingModalOpen(false)} onSave={handleSaveHolding} holding={selectedHolding} />
    </>
  );
};

export default UserDetails;
