import React, { useState } from 'react';
import Modal from '../Modal';

const AddAccountModal = ({ isOpen, onClose, onAccountAdd, error }) => {
  const [accountName, setAccountName] = useState('');
  const [accountType, setAccountType] = useState('Savings');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAccountAdd({ accountName, accountType });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Open a New Account">
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label htmlFor="accountName" className="block text-sm font-medium text-gray-700">Account Name</label>
            <div className="mt-1">
              <input
                type="text"
                name="accountName"
                id="accountName"
                className="focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="e.g., Vacation Fund"
                required
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label htmlFor="accountType" className="block text-sm font-medium text-gray-700">Account Type</label>
            <select
              id="accountType"
              name="accountType"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
              value={accountType}
              onChange={(e) => setAccountType(e.target.value)}
            >
              <option>Savings</option>
              <option>Investment</option>
            </select>
          </div>
        </div>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
          <button
            type="submit"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:col-start-2 sm:text-sm"
          >
            Open Account
          </button>
          <button
            type="button"
            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddAccountModal;
