import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
             <Link to="/" className="text-3xl font-bold text-primary tracking-tight">
              Finora
            </Link>
            <p className="text-gray-500 text-base">
              Modern banking and investments for everyone.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Solutions</h3>
                <ul className="mt-4 space-y-4">
                  <li><Link to="/checking" className="text-base text-gray-500 hover:text-gray-900">Checking</Link></li>
                  <li><Link to="/savings" className="text-base text-gray-500 hover:text-gray-900">Savings</Link></li>
                  <li><Link to="/invest" className="text-base text-gray-500 hover:text-gray-900">Investing</Link></li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Support</h3>
                <ul className="mt-4 space-y-4">
                  <li><Link to="/contact" className="text-base text-gray-500 hover:text-gray-900">Contact</Link></li>
                  <li><Link to="/faq" className="text-base text-gray-500 hover:text-gray-900">FAQ</Link></li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Company</h3>
                <ul className="mt-4 space-y-4">
                  <li><Link to="/about" className="text-base text-gray-500 hover:text-gray-900">About</Link></li>
                  <li><Link to="/careers" className="text-base text-gray-500 hover:text-gray-900">Careers</Link></li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Legal</h3>
                <ul className="mt-4 space-y-4">
                  <li><Link to="/privacy" className="text-base text-gray-500 hover:text-gray-900">Privacy</Link></li>
                  <li><Link to="/terms" className="text-base text-gray-500 hover:text-gray-900">Terms</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-400 xl:text-center">&copy; {year} Finora, Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
