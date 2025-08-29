import React from 'react';
import PageWrapper from '../../components/PageWrapper';

const PrivacyPolicyPage = () => {
  return (
    <PageWrapper>
      <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-extrabold text-gray-900">Privacy Policy</h1>
          <p className="mt-4 text-lg text-gray-500">
            Last updated: August 27, 2025
          </p>
          <div className="mt-8 prose prose-lg text-gray-500 mx-auto">
            <p>
              This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.
            </p>
            <h2>1. Information We Collect</h2>
            <p>
              We collect several different types of information for various purposes to provide and improve our Service to you. This may include, but is not limited to, personal identification information (Name, email address, phone number, etc.) and financial information required for our services.
            </p>
            <h2>2. How We Use Your Information</h2>
            <p>
              Finora uses the collected data for various purposes: to provide and maintain our Service, to notify you about changes to our Service, to provide customer support, to gather analysis or valuable information so that we can improve our Service, and to monitor the usage of our Service.
            </p>
            <h2>3. Security of Data</h2>
            <p>
              The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
            </p>
            {/* Add more sections as needed */}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default PrivacyPolicyPage;
