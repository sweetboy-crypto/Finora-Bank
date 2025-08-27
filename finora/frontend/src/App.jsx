import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Layouts
import Layout from './components/Layout';
import AdminLayout from './components/admin/AdminLayout';

// Route Guards
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';

// Main Pages
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Invest from './pages/Invest';
import Cards from './pages/Cards';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import UserManagement from './pages/admin/UserManagement';
import UserDetails from './pages/admin/UserDetails';


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
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
