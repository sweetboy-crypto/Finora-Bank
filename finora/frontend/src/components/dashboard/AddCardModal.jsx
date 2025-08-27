import React, { useState } from 'react';
import Modal from '../Modal';

const AddCardModal = ({ isOpen, onClose, onCardAdd }) => {
  const [formData, setFormData] = useState({
    cardholderName: '',
    cardType: 'Visa',
    lastFour: '',
    expiryDate: '',
  });

  const { cardholderName, cardType, lastFour, expiryDate } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCardAdd(formData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add a New Card">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="cardholderName" className="block text-sm font-medium text-gray-700">Cardholder Name</label>
          <input
            type="text"
            name="cardholderName"
            id="cardholderName"
            className="mt-1 focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
            value={cardholderName}
            onChange={onChange}
            required
          />
        </div>
         <div>
          <label htmlFor="cardType" className="block text-sm font-medium text-gray-700">Card Type</label>
          <select
            id="cardType"
            name="cardType"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
            value={cardType}
            onChange={onChange}
          >
            <option>Visa</option>
            <option>Mastercard</option>
            <option>Amex</option>
          </select>
        </div>
        <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
                <label htmlFor="lastFour" className="block text-sm font-medium text-gray-700">Last Four Digits</label>
                <input
                    type="text"
                    name="lastFour"
                    id="lastFour"
                    pattern="\d{4}"
                    title="Four digits"
                    className="mt-1 focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                    value={lastFour}
                    onChange={onChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">Expiry (MM/YY)</label>
                <input
                    type="text"
                    name="expiryDate"
                    id="expiryDate"
                    placeholder="MM/YY"
                    className="mt-1 focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                    value={expiryDate}
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
                    Add Card
                </button>
            </div>
        </div>
      </form>
    </Modal>
  );
};

export default AddCardModal;
