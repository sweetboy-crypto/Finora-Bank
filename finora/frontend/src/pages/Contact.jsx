import React from 'react';
import PageWrapper from '../components/PageWrapper.jsx';

const Contact = () => {
  return (
    <PageWrapper>
      <div className="bg-background">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
          <div className="divide-y-2 divide-gray-200">
            <div className="lg:grid lg:grid-cols-3 lg:gap-8">
              <div className="space-y-8">
                <h2 className="text-3xl font-extrabold text-text-primary">Contact Us</h2>
                <p className="mt-4 text-lg text-gray-500">
                  Have questions? We'd love to hear from you. Fill out the form or contact us using the details below.
                </p>
                <div className="space-y-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                       <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                       </svg>
                    </div>
                    <div className="ml-3 text-base text-gray-500">
                      <p>123 Finora Street</p>
                      <p>New York, NY 10001</p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex-shrink-0">
                       <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                       </svg>
                    </div>
                    <p className="ml-3 text-base text-gray-500">+1 (555) 123-4567</p>
                  </div>
                  <div className="flex">
                    <div className="flex-shrink-0">
                       <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                       </svg>
                    </div>
                    <p className="ml-3 text-base text-gray-500">support@finora.com</p>
                  </div>
                </div>
              </div>
              <div className="mt-12 lg:mt-0 lg:col-span-2">
                <form action="#" method="POST" className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full name</label>
                    <div className="mt-1">
                      <input type="text" name="name" id="name" autoComplete="name" className="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-primary focus:border-primary border-gray-300 rounded-md" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <div className="mt-1">
                      <input id="email" name="email" type="email" autoComplete="email" className="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-primary focus:border-primary border-gray-300 rounded-md" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                    <div className="mt-1">
                      <input type="text" name="subject" id="subject" className="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-primary focus:border-primary border-gray-300 rounded-md" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                    <div className="mt-1">
                      <textarea id="message" name="message" rows={4} className="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-primary focus:border-primary border border-gray-300 rounded-md" defaultValue={""} />
                    </div>
                  </div>
                  <div className="text-right">
                    <button type="submit" className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Contact;
