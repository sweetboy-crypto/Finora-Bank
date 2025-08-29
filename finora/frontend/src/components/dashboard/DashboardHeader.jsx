import React from 'react';
import { Link } from 'react-router-dom';

const DashboardHeader = ({ userName, onDeposit, onWithdraw, onTransfer, onAddAccount }) => {
  return (
    <header className="mb-8 md:flex md:items-center md:justify-between">
      <div className="flex-1 min-w-0">
        <h1 className="text-3xl font-bold leading-tight text-text-primary">
          Welcome back, {userName}!
        </h1>
      </div>
      <div className="mt-4 flex md:mt-0 md:ml-4">
        <Link to="/cards" className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">Manage Cards</Link>
        <button type="button" onClick={onAddAccount} className="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">New Account</button>
        <button type="button" onClick={onTransfer} className="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">Transfer</button>
        <button type="button" onClick={onWithdraw} className="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">Withdraw</button>
        <button type="button" onClick={onDeposit} className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90">Deposit</button>
      </div>
    </header>
  );
};

export default DashboardHeader;
