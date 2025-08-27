import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const authLinks = (
    <>
      <Link
        to="/dashboard"
        className="text-text-primary hover:text-primary px-3 py-2 rounded-md text-base font-medium"
      >
        Dashboard
      </Link>
      <Link
        to="/invest"
        className="text-text-primary hover:text-primary px-3 py-2 rounded-md text-base font-medium"
      >
        Investments
      </Link>
      <button
        onClick={handleLogout}
        className="ml-4 px-5 py-3 rounded-md text-sm font-medium text-white bg-primary hover:bg-primary/90 transition-colors"
      >
        Logout
      </button>
    </>
  );

  const guestLinks = (
    <>
      <Link
        to="/login"
        className="text-text-primary hover:text-primary px-3 py-2 rounded-md text-base font-medium"
      >
        Login
      </Link>
      <Link
        to="/signup"
        className="ml-4 px-5 py-3 rounded-md text-sm font-medium text-white bg-primary hover:bg-primary/90 transition-colors"
      >
        Sign Up
      </Link>
    </>
  );

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-3xl font-bold text-primary tracking-tight">
              Finora
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-text-primary hover:text-primary px-3 py-2 rounded-md text-base font-medium"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:block">
            {isAuthenticated ? authLinks : guestLinks}
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg className={`block h-6 w-6 ${isOpen ? 'hidden' : 'block'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg className={`h-6 w-6 ${isOpen ? 'block' : 'hidden'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="text-text-primary hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
              >
                {link.name}
              </Link>
            ))}
             {isAuthenticated && (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="text-text-primary hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
                >
                  Dashboard
                </Link>
                <Link
                  to="/invest"
                  onClick={() => setIsOpen(false)}
                  className="text-text-primary hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
                >
                  Investments
                </Link>
              </>
             )}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="px-5 space-y-3">
               {isAuthenticated ? (
                  <button
                    onClick={handleLogout}
                    className="block text-center w-full px-3 py-2 rounded-md text-base font-medium text-white bg-primary hover:bg-primary/90"
                  >
                    Logout
                  </button>
               ) : (
                 <>
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="block text-center w-full px-3 py-2 rounded-md text-base font-medium text-text-primary hover:bg-gray-100"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsOpen(false)}
                    className="block text-center w-full px-3 py-2 rounded-md text-base font-medium text-white bg-primary hover:bg-primary/90"
                  >
                    Sign Up
                  </Link>
                 </>
               )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
