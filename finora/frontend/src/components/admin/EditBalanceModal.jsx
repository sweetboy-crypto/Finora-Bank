import React, { useState, useEffect } from 'react';
import Modal from '../Modal';

const EditBalanceModal = ({ isOpen, onClose, onSave, account }) => {
  const [balance, setBalance] = useState('');
  const [description, setDescription] = useState('Admin adjustment');

  useEffect(() => {
    if (account) {
      setBalance(account.balance);
    }
  }, [account]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(account._id, { balance: parseFloat(balance), description });
  };

  if (!account) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Edit Balance for ${account.accountName}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="balance" className="block text-sm font-medium text-gray-700">New Balance</label>
          <div className="mt-1 relative rounded-md shadow-sm">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              name="balance"
              id="balance"
              step="any"
              className="focus:ring-primary focus:border-primary block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Reason for Adjustment</label>
          <input
            type="text"
            name="description"
            id="description"
            className="mt-1 focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="pt-5">
            <div className="flex justify-end">
                <button
                    type="button"
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
                    onClick={onClose}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90"
                >
                    Save Balance
                </button>
            </div>
        </div>
      </form>
    </Modal>
  );
};

export default EditBalanceModal;
