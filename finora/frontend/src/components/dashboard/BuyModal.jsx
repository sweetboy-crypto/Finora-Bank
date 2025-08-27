import React, { useState } from 'react';
import Modal from '../Modal';

const BuyModal = ({ isOpen, onClose, onBuy, asset, accounts }) => {
  const [quantity, setQuantity] = useState('');
  const [fromAccountId, setFromAccountId] = useState(accounts.length > 0 ? accounts[0]._id : '');

  if (!asset) return null;

  const totalCost = asset.currentPrice * Number(quantity);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (totalCost <= 0) return;
    onBuy({ assetId: asset._id, quantity: Number(quantity), fromAccountId });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Buy ${asset.name} (${asset.tickerSymbol})`}>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <p className="text-sm text-gray-500">Current Price: ${asset.currentPrice.toFixed(2)}</p>
          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
            <input
              type="number"
              name="quantity"
              id="quantity"
              step="any"
              className="mt-1 focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="0"
              required
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="fromAccount" className="block text-sm font-medium text-gray-700">Pay from</label>
            <select
              id="fromAccount"
              name="fromAccount"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
              value={fromAccountId}
              onChange={(e) => setFromAccountId(e.target.value)}
            >
              {accounts.map(acc => (
                <option key={acc._id} value={acc._id}>
                  {acc.accountName} (${acc.balance.toLocaleString('en-US', {minimumFractionDigits: 2})})
                </option>
              ))}
            </select>
          </div>
          <div className="text-lg font-medium text-right">
            Total Cost: <span className="text-primary">${totalCost.toLocaleString('en-US', {minimumFractionDigits: 2})}</span>
          </div>
        </div>
        <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
          <button
            type="submit"
            disabled={!quantity || !fromAccountId || totalCost <= 0}
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 sm:col-start-2 sm:text-sm disabled:opacity-50"
          >
            Confirm Purchase
          </button>
          <button
            type="button"
            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:col-start-1 sm:text-sm"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default BuyModal;
