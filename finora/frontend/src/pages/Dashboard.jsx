import React, { useContext, useState, useEffect } from 'react';
import AuthContext from '../context/AuthContext.jsx';
import api from '../api/axios';
import PageWrapper from '../components/PageWrapper.jsx';
import DashboardHeader from '../components/dashboard/DashboardHeader.jsx';
import AccountList from '../components/dashboard/AccountList.jsx';
import TransactionList from '../components/dashboard/TransactionList.jsx';
import DepositModal from '../components/dashboard/DepositModal.jsx';
import WithdrawModal from '../components/dashboard/WithdrawModal.jsx';
import AddAccountModal from '../components/dashboard/AddAccountModal.jsx';
import TransferModal from '../components/dashboard/TransferModal.jsx';

const Dashboard = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalError, setModalError] = useState('');

  const [isDepositModalOpen, setDepositModalOpen] = useState(false);
  const [isWithdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [isAddAccountModalOpen, setAddAccountModalOpen] = useState(false);
  const [isTransferModalOpen, setTransferModalOpen] = useState(false);

  const fetchData = async () => {
    if (user) {
      try {
        setLoading(true);
        setError(null);
        setTransactions([]);

        const accountsRes = await api.get('/api/accounts');

        if (accountsRes.data && Array.isArray(accountsRes.data.data) && accountsRes.data.data.length > 0) {
          const userAccounts = accountsRes.data.data;
          setAccounts(userAccounts);

          const primaryAccount = userAccounts[0];
          if (primaryAccount && primaryAccount._id) {
            const transactionsRes = await api.get(`/api/accounts/${primaryAccount._id}/transactions`);
            if (transactionsRes.data && Array.isArray(transactionsRes.data.data)) {
              setTransactions(transactionsRes.data.data);
            }
          }
        } else {
          setAccounts([]);
        }

      } catch (err) {
        console.error("Dashboard fetch error:", err);
        setError('Could not load your dashboard data. Please try again later.');
        setAccounts([]);
        setTransactions([]);
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

  const handleTransaction = async (action, data) => {
    setModalError('');
    const primaryAccount = accounts.length > 0 ? accounts[0] : null;
    try {
      switch (action) {
        case 'deposit':
          await api.post(`/api/accounts/${primaryAccount._id}/transactions/deposit`, data);
          setDepositModalOpen(false);
          break;
        case 'withdraw':
          await api.post(`/api/accounts/${primaryAccount._id}/transactions/withdraw`, data);
          setWithdrawModalOpen(false);
          break;
        case 'addAccount':
          await api.post('/api/accounts', data);
          setAddAccountModalOpen(false);
          break;
        case 'transfer':
          await api.post('/api/transactions/transfer', data);
          setTransferModalOpen(false);
          break;
        default:
          throw new Error('Invalid action');
      }
      fetchData();
    } catch (err) {
      setModalError(err.response?.data?.message || 'An unexpected error occurred.');
    }
  };

  if (loading || authLoading) return <div className="p-8 text-center">Loading Dashboard...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <>
      <PageWrapper>
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <DashboardHeader
            userName={user?.name}
            onDeposit={() => setDepositModalOpen(true)}
            onWithdraw={() => setWithdrawModalOpen(true)}
            onTransfer={() => setTransferModalOpen(true)}
            onAddAccount={() => setAddAccountModalOpen(true)}
          />
          <main>
            <AccountList accounts={accounts} />
            <TransactionList transactions={transactions} />
          </main>
        </div>
      </PageWrapper>
      <DepositModal isOpen={isDepositModalOpen} onClose={() => {setDepositModalOpen(false); setModalError('');}} onDeposit={(data) => handleTransaction('deposit', data)} error={modalError} />
      <WithdrawModal isOpen={isWithdrawModalOpen} onClose={() => {setWithdrawModalOpen(false); setModalError('');}} onWithdraw={(data) => handleTransaction('withdraw', data)} error={modalError} />
      <AddAccountModal isOpen={isAddAccountModalOpen} onClose={() => {setAddAccountModalOpen(false); setModalError('');}} onAccountAdd={(data) => handleTransaction('addAccount', data)} error={modalError} />
      <TransferModal isOpen={isTransferModalOpen} onClose={() => {setTransferModalOpen(false); setModalError('');}} onTransfer={(data) => handleTransaction('transfer', data)} accounts={accounts} error={modalError} />
    </>
  );
};

export default Dashboard;
