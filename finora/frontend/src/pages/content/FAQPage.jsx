import React from 'react';

const faqs = [
  {
    question: 'Is Finora a real bank?',
    answer: 'Finora is a financial technology company, not a bank. Banking services are provided by our partner bank, Member FDIC. This means your deposits are FDIC insured up to $250,000.',
  },
  {
    question: 'Are there any hidden fees?',
    answer: 'No. We believe in transparency. Our checking and savings accounts have no monthly maintenance fees, no minimum balance fees, and no overdraft fees up to our safety limit.',
  },
  {
    question: 'How do I deposit money?',
    answer: 'You can deposit money into your Finora account via direct deposit from your employer, by linking an external bank account, or by using mobile check deposit in our app.',
  },
  {
    question: 'Is my money and data secure?',
    answer: 'Absolutely. We use bank-level security, including 256-bit AES encryption, to protect your data. All accounts are FDIC insured. We also support multi-factor authentication for added security.',
  },
];

const FAQPage = () => {
  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 text-center">Frequently Asked Questions</h1>
        <div className="mt-12">
          <dl className="space-y-10">
            {faqs.map((faq) => (
              <div key={faq.question}>
                <dt className="text-lg font-medium text-gray-900">{faq.question}</dt>
                <dd className="mt-2 text-base text-gray-500">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
