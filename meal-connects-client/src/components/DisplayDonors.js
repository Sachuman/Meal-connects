import React, { useEffect, useState } from 'react';

export default function DisplayDonors() {
  const [donors, setDonors] = useState([]);

  useEffect(() => {
    const organizations = JSON.parse(localStorage.getItem('organizations') || '[]');
    const donorOrgs = organizations.filter(org => org.type === 'restaurant');
    setDonors(donorOrgs);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Donating Restaurants</h1>
      {donors.length === 0 ? (
        <p className="text-center text-gray-600">No donors registered yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {donors.map((donor) => (
            <div key={donor.id} className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
              <div className="px-6 py-4">
                <h2 className="text-xl font-bold mb-2 text-blue-600">{donor.name}</h2>
                <p className="text-gray-700"><strong>Food Type:</strong> {donor.foodType}</p>
                <p className="text-gray-700"><strong>Amount:</strong> {donor.foodAmount} kg</p>
                <p className="text-gray-700"><strong>Address:</strong> {donor.address}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
