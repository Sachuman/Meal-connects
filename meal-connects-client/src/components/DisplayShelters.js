import React, { useEffect, useState } from 'react';

export default function DisplayShelters() {
  const [shelters, setShelters] = useState([]);

  useEffect(() => {
    const organizations = JSON.parse(localStorage.getItem('organizations') || '[]');
    const shelterOrgs = organizations.filter(org => org.type === 'shelter');
    setShelters(shelterOrgs);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Shelters</h1>
      {shelters.length === 0 ? (
        <p className="text-center text-gray-600">No shelters registered yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shelters.map((shelter) => (
            <div key={shelter.id} className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
              <div className="px-6 py-4">
                <h2 className="text-xl font-bold mb-2 text-green-600">{shelter.name}</h2>
                <p className="text-gray-700"><strong>Address:</strong> {shelter.address}</p>
                <p className="text-gray-700"><strong>People Served:</strong> {shelter.peopleServed}</p>
                <p className="text-gray-700"><strong>Contact:</strong> {shelter.contactPerson}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
