import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import DepositModal from '../components/dashboard/DepositModal';
import WithdrawModal from '../components/dashboard/WithdrawModal';
import AddAccountModal from '../components/dashboard/AddAccountModal';
import TransferModal from '../components/dashboard/TransferModal';

const Dashboard = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isDepositModalOpen, setDepositModalOpen] = useState(false);
  const [isWithdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [isAddAccountModalOpen, setAddAccountModalOpen] = useState(false);
  const [isTransferModalOpen, setTransferModalOpen] = useState(false);

  const fetchData = async () => {
    if (user) {
      try {
        setLoading(true);
        const accountsRes = await axios.get('http://localhost:3001/api/accounts');
        setAccounts(accountsRes.data.data);

        if (accountsRes.data.data.length > 0) {
          const primaryAccountId = accountsRes.data.data[0]._id;
          const transactionsRes = await axios.get(`http://localhost:3001/api/accounts/${primaryAccountId}/transactions`);
          setTransactions(transactionsRes.data.data);
        }
        setError(null);
      } catch (err) {
        console.error('Failed to fetch dashboard data', err);
        setError('Could not load your data. Please try again later.');
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

  const handleDeposit = async (data) => {
    // Assuming deposit is for the primary account for simplicity
    if (!primaryAccount) return;
    try {
      await axios.post(`http://localhost:3001/api/accounts/${primaryAccount._id}/transactions/deposit`, data);
      setDepositModalOpen(false);
      fetchData();
    } catch (err) { console.error('Deposit failed', err); }
  };

  const handleWithdraw = async (data) => {
    if (!primaryAccount) return;
    try {
      await axios.post(`http://localhost:3001/api/accounts/${primaryAccount._id}/transactions/withdraw`, data);
      setWithdrawModalOpen(false);
      fetchData();
    } catch (err) { console.error('Withdrawal failed', err); }
  };

  const handleAddAccount = async (data) => {
    try {
      await axios.post('http://localhost:3001/api/accounts', data);
      setAddAccountModalOpen(false);
      fetchData();
    } catch (err) { console.error('Failed to add account', err); }
  };

  const handleTransfer = async (data) => {
    try {
      await axios.post('http://localhost:3001/api/transactions/transfer', data);
      setTransferModalOpen(false);
      fetchData();
    } catch (err) { console.error('Transfer failed', err); }
  };

  if (loading || authLoading) return <div className="p-8">Loading Dashboard...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;

  const primaryAccount = accounts.length > 0 ? accounts[0] : null;

  return (
    <>
      <div className="bg-background min-h-full">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <header className="mb-8 md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl font-bold leading-tight text-text-primary">Welcome back, {user?.name}!</h1>
            </div>
            <div className="mt-4 flex md:mt-0 md:ml-4">
              <Link to="/cards" className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">Manage Cards</Link>
              <button type="button" onClick={() => setTransferModalOpen(true)} className="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">Transfer</button>
              <button type="button" onClick={() => setDepositModalOpen(true)} className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90">Deposit</button>
            </div>
          </header>

          <main>
            <h2 className="text-xl font-semibold text-text-primary mb-4">Your Accounts</h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {accounts.length > 0 ? accounts.map(account => (
                <div key={account._id} className="bg-white overflow-hidden shadow rounded-lg p-5">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{account.accountName} ({account.accountType})</dt>
                    <dd className="mt-1 text-3xl font-semibold text-gray-900">${account.balance.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</dd>
                  </dl>
                </div>
              )) : <p>No accounts found. Open one to get started!</p>}
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold text-text-primary mb-4">Recent Transactions (Primary Account)</h2>
              {/* ... transactions list ... */}
            </div>
          </main>
        </div>
      </div>
      <DepositModal isOpen={isDepositModalOpen} onClose={() => setDepositModalOpen(false)} onDeposit={handleDeposit} />
      <WithdrawModal isOpen={isWithdrawModalOpen} onClose={() => setWithdrawModalOpen(false)} onWithdraw={handleWithdraw} />
      <AddAccountModal isOpen={isAddAccountModalOpen} onClose={() => setAddAccountModalOpen(false)} onAccountAdd={handleAddAccount} />
      <TransferModal isOpen={isTransferModalOpen} onClose={() => setTransferModalOpen(false)} onTransfer={handleTransfer} accounts={accounts} />
    </>
  );
};

export default Dashboard;
