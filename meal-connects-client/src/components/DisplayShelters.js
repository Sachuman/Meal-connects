import React, { useEffect, useState } from 'react';
import './DisplayShelters.css'; // Import your CSS file

export default function DisplayShelters() {
  const [shelters, setShelters] = useState([]);
  const [error, setError] = useState(null); // Add state for error handling

  useEffect(() => {
    const fetchShelters = async () => {
      try {
        const response = await fetch('http://localhost:5001/shelters/');
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
      await fetch(`http://localhost:5001/shelters/${id}`, {
        method: 'DELETE',
      });
      setShelters(shelters.filter(shelter => shelter._id !== id));
    } catch (err) {
      console.error('Failed to delete shelter:', err);
    }
  };

  return (
    <div className="shelters-container">
      <h1 className="title">Shelters</h1>
      {error && <p className="error-message">{error}</p>}
      {shelters.length === 0 && !error ? (
        <p className="no-shelters-message">No shelters registered yet.</p>
      ) : (
        <div className="shelter-grid">
          {shelters.map((shelter) => (
            <div key={shelter._id} className="shelter-card">
              <div className="shelter-details">
                <h2 className="shelter-name">{shelter.name}</h2>
                <p><strong>Address:</strong> {shelter.address}</p>
                <p><strong>People Served:</strong> {shelter.peopleServed}</p>
                <p><strong>Contact:</strong> {shelter.contactPerson}</p>
                <p><strong>Phone Number:</strong> {shelter.phoneNumber}</p>
                <p><strong>Email:</strong> {shelter.email}</p>
                <button 
                  onClick={() => handleDelete(shelter._id)} 
                  className="delete-button"
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
