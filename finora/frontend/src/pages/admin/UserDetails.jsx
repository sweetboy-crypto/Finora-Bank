import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import EditBalanceModal from '../../components/admin/EditBalanceModal';

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditBalanceModalOpen, setEditBalanceModalOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const userRes = await axios.get(`http://localhost:3001/api/admin/users/${id}`);
      setUser(userRes.data.data);

      const accountsRes = await axios.get(`http://localhost:3001/api/admin/users/${id}/accounts`);
      setAccounts(accountsRes.data.data);

      setError(null);
    } catch (err) {
      console.error('Failed to fetch user details', err);
      setError('Could not load user details.');
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
      await axios.put(`http://localhost:3001/api/admin/accounts/${accountId}`, data);
      setEditBalanceModalOpen(false);
      setSelectedAccount(null);
      fetchData(); // Refresh data
    } catch (err) {
      console.error('Failed to update balance', err);
      // Optionally, show an error in the modal
    }
  };

  if (loading) return <div>Loading user details...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!user) return <div>User not found.</div>;

  return (
    <>
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">User Details</h1>
        <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-lg">
          {/* ... user details dl ... */}
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
                        <p className="text-xs text-gray-500">ID: {account._id}</p>
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
      </div>
      <EditBalanceModal
        isOpen={isEditBalanceModalOpen}
        onClose={() => setEditBalanceModalOpen(false)}
        onSave={handleSaveBalance}
        account={selectedAccount}
      />
    </>
  );
};

export default UserDetails;
