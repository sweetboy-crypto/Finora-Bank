import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-text-primary sm:text-5xl md:text-6xl">
            Smarter Banking. <span className="text-primary">Greater Freedom.</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
            Join Finora for a seamless banking and investment experience, designed for your modern life.
          </p>
          <div className="mt-8 flex justify-center">
            <div className="inline-flex rounded-md shadow">
              <Link
                to="/signup"
                className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition-colors"
              >
                Get Started
              </Link>
            </div>
            <div className="ml-3 inline-flex">
              <Link
                to="/about"
                className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-md text-primary bg-primary/10 hover:bg-primary/20 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl font-extrabold text-text-primary tracking-tight sm:text-4xl">
              Everything you need, nothing you don't.
            </p>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Finora provides powerful tools to help you manage your money and grow your wealth.
            </p>
          </div>

          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="pt-6">
              <div className="flow-root bg-white rounded-lg px-6 pb-8 shadow-lg h-full">
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-primary to-accent rounded-md shadow-lg">
                      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M12 6h.01M12 21a9 9 0 110-18 9 9 0 010 18z" />
                      </svg>
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-text-primary tracking-tight">Easy Deposits</h3>
                  <p className="mt-5 text-base text-gray-500">
                    Quickly add funds to your account with multiple deposit options, all from your phone.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="pt-6">
              <div className="flow-root bg-white rounded-lg px-6 pb-8 shadow-lg h-full">
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-primary to-accent rounded-md shadow-lg">
                       <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-text-primary tracking-tight">Secure Investments</h3>
                  <p className="mt-5 text-base text-gray-500">
                    Invest with confidence. Your assets are protected with top-tier security measures.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="pt-6">
              <div className="flow-root bg-white rounded-lg px-6 pb-8 shadow-lg h-full">
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-primary to-accent rounded-md shadow-lg">
                      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-text-primary tracking-tight">Growth Analytics</h3>
                  <p className="mt-5 text-base text-gray-500">
                    Track your portfolio's performance with simple, easy-to-understand charts and analytics.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
