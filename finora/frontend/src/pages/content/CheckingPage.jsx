import React from 'react';

const CheckingPage = () => {
  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900">Finora Checking Account</h1>
        <p className="mt-4 text-lg text-gray-500">
          Experience seamless, modern banking with the Finora Checking Account. No monthly fees, no minimum balance, just simple, powerful banking designed for your life.
        </p>
        <div className="mt-8 prose prose-lg text-gray-500 mx-auto">
          <h2>Key Features</h2>
          <ul>
            <li><strong>No Monthly Fees:</strong> Keep more of your money with zero monthly maintenance fees.</li>
            <li><strong>Fee-Free Overdraft:</strong> We provide a safety net for overdrafts up to $200 with no fees.</li>
            <li><strong>Early Direct Deposit:</strong> Get your paycheck up to two days earlier with direct deposit.</li>
            <li><strong>Mobile Banking:</strong> Access your account anytime, anywhere with our top-rated mobile app. Deposit checks, pay bills, and transfer money with ease.</li>
            <li><strong>Vast ATM Network:</strong> Access over 55,000 fee-free ATMs worldwide.</li>
          </ul>
          <h2>Security You Can Trust</h2>
          <p>
            Your peace of mind is our top priority. Finora accounts are FDIC insured up to $250,000. We use state-of-the-art encryption and security protocols to protect your account and personal information 24/7.
          </p>
          <h2>Ready to Get Started?</h2>
          <p>
            Opening an account takes less than 5 minutes. Join the future of banking today.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckingPage;
