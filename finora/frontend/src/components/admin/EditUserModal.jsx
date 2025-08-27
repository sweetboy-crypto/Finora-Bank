import React, { useState, useEffect } from 'react';
import Modal from '../Modal';

const EditUserModal = ({ isOpen, onClose, onSave, user }) => {
  const [formData, setFormData] = useState({ name: '', email: '', role: 'user' });

  useEffect(() => {
    // When the user prop changes (i.e., a new user is selected), update the form data
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        role: user.role || 'user',
      });
    }
  }, [user]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(user._id, formData);
  };

  if (!user) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Edit User: ${user.name}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            name="name"
            id="name"
            className="mt-1 focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
            value={formData.name}
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="mt-1 focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
            value={formData.email}
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
          <select
            id="role"
            name="role"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
            value={formData.role}
            onChange={onChange}
          >
            <option>user</option>
            <option>admin</option>
          </select>
        </div>
        <div className="pt-5">
            <div className="flex justify-end">
                <button
                    type="button"
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
                    onClick={onClose}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90"
                >
                    Save Changes
                </button>
            </div>
        </div>
      </form>
    </Modal>
  );
};

export default EditUserModal;
