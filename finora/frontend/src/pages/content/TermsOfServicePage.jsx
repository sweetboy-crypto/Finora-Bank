import React from 'react';
import PageWrapper from '../../components/PageWrapper';

const TermsOfServicePage = () => {
  return (
    <PageWrapper>
      <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-extrabold text-gray-900">Terms of Service</h1>
          <p className="mt-4 text-lg text-gray-500">
            Last updated: August 27, 2025
          </p>
          <div className="mt-8 prose prose-lg text-gray-500 mx-auto">
            <h2>1. Agreement to Terms</h2>
            <p>
              By using our Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.
            </p>
            <h2>2. Accounts</h2>
            <p>
              When you create an account with us, you must provide us with information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
            </p>
            <h2>3. Intellectual Property</h2>
            <p>
              The Service and its original content, features, and functionality are and will remain the exclusive property of Finora and its licensors.
            </p>
            <h2>4. Governing Law</h2>
            <p>
              These Terms shall be governed and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.
            </p>
            {/* Add more sections as needed */}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default TermsOfServicePage;
