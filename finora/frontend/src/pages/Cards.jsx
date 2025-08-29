import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import AddCardModal from '../components/dashboard/AddCardModal';

const Cards = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddCardModalOpen, setAddCardModalOpen] = useState(false);

  const fetchCards = async () => {
    try {
      setLoading(true);
      const res = await api.get('/api/cards');
      setCards(res.data.data);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch cards', err);
      setError('Could not load your saved cards.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const handleCardAdd = async (data) => {
    try {
      await api.post('/api/cards', data);
      setAddCardModalOpen(false);
      fetchCards(); // Refresh the list
    } catch (err) {
      console.error('Failed to add card', err);
      // Optionally, set an error state to show in the modal
    }
  };

  if (loading) return <div className="p-8">Loading cards...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;

  return (
    <>
      <div className="p-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-text-primary">Manage Cards</h1>
          <button
            onClick={() => setAddCardModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90"
          >
            Add New Card
          </button>
        </div>

        <div className="mt-8">
          {cards.length > 0 ? (
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {cards.map((card) => (
                <li key={card._id} className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200">
                  <div className="w-full flex items-center justify-between p-6 space-x-6">
                    <div className="flex-1 truncate">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-gray-900 text-sm font-medium truncate">{card.cardholderName}</h3>
                        <span className="flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                          {card.cardType}
                        </span>
                      </div>
                      <p className="mt-1 text-gray-500 text-sm truncate">**** **** **** {card.lastFour}</p>
                      <p className="mt-1 text-gray-500 text-sm truncate">Expires: {card.expiryDate}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">You have no saved cards. Add one to get started.</p>
          )}
        </div>
      </div>
      <AddCardModal
        isOpen={isAddCardModalOpen}
        onClose={() => setAddCardModalOpen(false)}
        onCardAdd={handleCardAdd}
      />
    </>
  );
};

export default Cards;
