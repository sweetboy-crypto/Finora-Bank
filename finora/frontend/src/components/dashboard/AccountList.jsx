import React from 'react';

const AccountList = ({ accounts }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-text-primary mb-4">Your Accounts</h2>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {accounts.length > 0 ? accounts.map(account => (
          <div key={account._id} className="bg-white overflow-hidden shadow rounded-lg p-5">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">{account.accountName} ({account.accountType})</dt>
              {account.accountNumber && typeof account.accountNumber === 'string' && (
                <dd className="text-xs text-gray-400">...{account.accountNumber.slice(-4)}</dd>
              )}
              <dd className="mt-1 text-3xl font-semibold text-gray-900">${account.balance.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</dd>
            </dl>
          </div>
        )) : <p>No accounts found. Open one to get started!</p>}
      </div>
    </div>
  );
};

export default AccountList;
