import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Layouts
import Layout from './components/Layout.jsx';
import AdminLayout from './components/admin/AdminLayout.jsx';

// Route Guards
import PrivateRoute from './components/PrivateRoute.jsx';
import AdminRoute from './components/AdminRoute.jsx';

// Main Pages
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Invest from './pages/Invest.jsx';
import Cards from './pages/Cards.jsx';

// Content Pages
import CheckingPage from './pages/content/CheckingPage.jsx';
import SavingsPage from './pages/content/SavingsPage.jsx';
import FAQPage from './pages/content/FAQPage.jsx';
import CareersPage from './pages/content/CareersPage.jsx';
import PrivacyPolicyPage from './pages/content/PrivacyPolicyPage.jsx';
import TermsOfServicePage from './pages/content/TermsOfServicePage.jsx';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import UserManagement from './pages/admin/UserManagement.jsx';
import UserDetails from './pages/admin/UserDetails.jsx';
import TransactionManagement from './pages/admin/TransactionManagement.jsx';


const App = () => {
  return (
    <Routes>
      {/* Main User-Facing Site Routes */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="checking" element={<CheckingPage />} />
        <Route path="savings" element={<SavingsPage />} />
        <Route path="faq" element={<FAQPage />} />
        <Route path="careers" element={<CareersPage />} />
        <Route path="privacy" element={<PrivacyPolicyPage />} />
        <Route path="terms" element={<TermsOfServicePage />} />

        <Route path="" element={<PrivateRoute />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="invest" element={<Invest />} />
          <Route path="cards" element={<Cards />} />
        </Route>
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="users/:id" element={<UserDetails />} />
          <Route path="transactions" element={<TransactionManagement />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
