import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const AdminLayout = () => {
  const navigation = [
    { name: 'Dashboard', href: '/admin' },
    { name: 'Users', href: '/admin/users' },
    { name: 'Transactions', href: '/admin/transactions' },
    // Add more admin links here
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h2 className="text-2xl font-bold text-primary">Finora Admin</h2>
        </div>
        <nav className="mt-5">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              end // Use 'end' for the dashboard link to prevent it from being active for all child routes
              className={({ isActive }) =>
                `flex items-center mt-2 py-2 px-6 text-gray-600 hover:bg-gray-200 hover:text-gray-700 ${
                  isActive ? 'bg-gray-200 text-gray-700' : ''
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
