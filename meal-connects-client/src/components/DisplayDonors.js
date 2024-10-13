import React, { useEffect, useState } from 'react';
import './DisplayDonors.css'; // Import your CSS file

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
    <div className="donors-container">
      <h1 className="title">Donating Restaurants</h1>
      {error && <p className="error-message">{error}</p>}
      {donors.length === 0 && !error ? (
        <p className="no-donors-message">No donors registered yet.</p>
      ) : (
        <div className="donor-grid">
          {donors.map((donor) => (
            <div key={donor._id} className="donor-card">
              <div className="donor-details">
                <h2 className="donor-name">{donor.address}</h2>
                <p><strong>Address:</strong> {donor.foodType}</p>
                <p><strong>Cuisine:</strong> {donor.foodType}</p>
                <p><strong>Amount:</strong> {donor.foodAmount} kg</p>
                <p><strong>Contact:</strong> {donor.contactPerson}</p>
                <p><strong>Phone Number:</strong> {donor.phoneNumber}</p>
                <p><strong>Email:</strong> {donor.email}</p>
                <button 
                  onClick={() => handleDelete(donor._id)} 
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
