import React, { useState, useEffect } from 'react';
import Modal from '../Modal';

const EditHoldingModal = ({ isOpen, onClose, onSave, holding }) => {
  const [formData, setFormData] = useState({ quantity: '', purchasePrice: '' });

  useEffect(() => {
    if (holding) {
      setFormData({
        quantity: holding.quantity || '',
        purchasePrice: holding.purchasePrice || '',
      });
    }
  }, [holding]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(holding._id, {
        quantity: parseFloat(formData.quantity),
        purchasePrice: parseFloat(formData.purchasePrice)
    });
  };

  if (!holding) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Edit Holding: ${holding.asset.name}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
          <input
            type="number"
            name="quantity"
            id="quantity"
            step="any"
            className="mt-1 focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
            value={formData.quantity}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label htmlFor="purchasePrice" className="block text-sm font-medium text-gray-700">Average Purchase Price</label>
           <div className="mt-1 relative rounded-md shadow-sm">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
                type="number"
                name="purchasePrice"
                id="purchasePrice"
                step="any"
                className="focus:ring-primary focus:border-primary block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                value={formData.purchasePrice}
                onChange={onChange}
                required
            />
          </div>
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

export default EditHoldingModal;
