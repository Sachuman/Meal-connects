import React, { useEffect, useState } from 'react';

export default function DisplayDonors() {
  const [donors, setDonors] = useState([]);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const response = await fetch('http://localhost:5001/donors/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setDonors(data);
      } catch (err) {
        console.error('Failed to fetch donors:', err);
        setError(err.message);
      }
    };

    fetchDonors();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5001/donors/${id}`, {
        method: 'DELETE',
      });
      setDonors(donors.filter(donor => donor._id !== id));
    } catch (err) {
      console.error('Failed to delete donor:', err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Donating Restaurants</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {donors.length === 0 && !error ? (
        <p className="text-center text-gray-600">No donors registered yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {donors.map((donor) => (
            <div key={donor._id} className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
              <div className="px-6 py-4">
                <h2 className="text-xl font-bold mb-2 text-blue-600">{donor.name}</h2>
                <p className="text-gray-700"><strong>Food Type:</strong> {donor.foodType}</p>
                <p className="text-gray-700"><strong>Amount:</strong> {donor.foodAmount} kg</p>
                <p className="text-gray-700"><strong>Address:</strong> {donor.address}</p>
                <button 
                  onClick={() => handleDelete(donor._id)} 
                  className="mt-2 bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-4 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
