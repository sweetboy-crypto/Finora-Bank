import React from 'react';

const TransactionList = ({ transactions }) => {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold text-text-primary mb-4">Recent Transactions (Primary Account)</h2>
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul role="list" className="divide-y divide-gray-200">
          {transactions.length > 0 ? (
            transactions.slice(0, 5).map((transaction) => (
              <li key={transaction._id}>
                <div className="block hover:bg-gray-50 px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-text-primary truncate">{transaction.description}</p>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${transaction.amount > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {transaction.amount > 0 ? '+' : ''}${transaction.amount.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        {new Date(transaction.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <p className="capitalize">{transaction.type}</p>
                    </div>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <div className="px-4 py-4 sm:px-6">
              <p className="text-sm text-gray-500">No recent transactions.</p>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default TransactionList;
