import React from 'react';

const SavingsPage = () => {
  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900">Finora High-Yield Savings</h1>
        <p className="mt-4 text-lg text-gray-500">
          Grow your money faster with our high-yield savings account. With competitive interest rates and no fees, reaching your financial goals has never been easier.
        </p>
        <div className="mt-8 prose prose-lg text-gray-500 mx-auto">
          <h2>Why Save with Finora?</h2>
          <ul>
            <li><strong>Competitive APY:</strong> Earn a high-yield Annual Percentage Yield (APY) on your balance, helping your money grow effortlessly.</li>
            <li><strong>No Fees, No Minimums:</strong> We believe in transparent banking. That means no monthly fees and no minimum balance requirements.</li>
            <li><strong>Automated Savings Tools:</strong> Set up recurring transfers and use our smart savings tools to build your savings automatically.</li>
            <li><strong>Goal-Oriented Savings:</strong> Create specific savings goals, track your progress, and stay motivated to reach your targets, whether it's for a vacation, a new car, or a down payment.</li>
            <li><strong>FDIC Insured:</strong> Your savings are safe with us. Deposits are FDIC insured up to the maximum amount allowed by law.</li>
          </ul>
          <h2>Start Saving Today</h2>
          <p>
            Whether you're saving for something big or just building an emergency fund, the Finora High-Yield Savings account is the perfect tool to help you get there.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SavingsPage;
