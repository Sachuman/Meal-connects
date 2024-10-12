import React, { useEffect, useState } from 'react';

export default function DisplayShelters() {
  const [shelters, setShelters] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShelters = async () => {
      try {
        const response = await fetch('http://localhost:5000/shelters/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setShelters(data);
      } catch (err) {
        console.error('Failed to fetch shelters:', err);
        setError(err.message);
      }
    };

    fetchShelters();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/shelters/${id}`, {
        method: 'DELETE',
      });
      setShelters(shelters.filter(shelter => shelter._id !== id));
    } catch (err) {
      console.error('Failed to delete shelter:', err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Shelters</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {shelters.length === 0 && !error ? (
        <p className="text-center text-gray-600">No shelters registered yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shelters.map((shelter) => (
            <div key={shelter._id} className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
              <div className="px-6 py-4">
                <h2 className="text-xl font-bold mb-2 text-green-600">{shelter.name}</h2>
                <p className="text-gray-700"><strong>Address:</strong> {shelter.address}</p>
                <p className="text-gray-700"><strong>People Served:</strong> {shelter.peopleServed}</p>
                <p className="text-gray-700"><strong>Contact:</strong> {shelter.contactPerson}</p>
                <button 
                  onClick={() => handleDelete(shelter._id)} 
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
