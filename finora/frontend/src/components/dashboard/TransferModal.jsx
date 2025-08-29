import React, { useState, useEffect } from 'react';
import Modal from '../Modal';

const TransferModal = ({ isOpen, onClose, onTransfer, accounts, error }) => {
  const [fromAccountId, setFromAccountId] = useState('');
  const [toAccountId, setToAccountId] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (accounts && accounts.length > 0) {
      setFromAccountId(accounts[0]._id);
    }
  }, [accounts, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fromAccountId || !toAccountId || !amount || parseFloat(amount) <= 0) {
      return;
    }
    onTransfer({ fromAccountId, toAccountId, amount: parseFloat(amount), description });
  };

  const availableToAccounts = accounts.filter(acc => acc._id !== fromAccountId);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Transfer Funds">
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label htmlFor="fromAccount" className="block text-sm font-medium text-gray-700">From Account</label>
            <select id="fromAccount" name="fromAccount" className="mt-1 block w-full ..." value={fromAccountId} onChange={(e) => setFromAccountId(e.target.value)}>
              {accounts.map(acc => (<option key={acc._id} value={acc._id}>{acc.accountName} (${acc.balance.toLocaleString('en-US', {minimumFractionDigits: 2})})</option>))}
            </select>
          </div>
          <div>
            <label htmlFor="toAccount" className="block text-sm font-medium text-gray-700">To Account</label>
            <select id="toAccount" name="toAccount" className="mt-1 block w-full ..." value={toAccountId} onChange={(e) => setToAccountId(e.target.value)} required disabled={!fromAccountId}>
              <option value="">Select an account</option>
              {availableToAccounts.map(acc => (<option key={acc._id} value={acc._id}>{acc.accountName} (${acc.balance.toLocaleString('en-US', {minimumFractionDigits: 2})})</option>))}
            </select>
          </div>
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
            <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><span className="text-gray-500 sm:text-sm">$</span></div>
                <input type="number" name="amount" id="amount" className="focus:ring-primary focus:border-primary block w-full ..." placeholder="0.00" required value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description (Optional)</label>
            <input type="text" name="description" id="description" className="mt-1 focus:ring-primary focus:border-primary block w-full ..." placeholder="e.g., For savings" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
        </div>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
          <button type="submit" disabled={!fromAccountId || !toAccountId || !amount} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:col-start-2 sm:text-sm disabled:opacity-50">Transfer</button>
          <button type="button" onClick={onClose} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:col-start-1 sm:text-sm">Cancel</button>
        </div>
      </form>
    </Modal>
  );
};

export default TransferModal;
