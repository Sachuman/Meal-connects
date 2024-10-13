import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Details.css'; // Import the CSS file
import { useJsApiLoader, StandaloneSearchBox} from '@react-google-maps/api';
import { useRef } from 'react';


export default function Details() {

  const inputRef = useRef(null);
  
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });

 const handleOnPlacesChanged = () => {
    const places = inputRef.current.getPlaces();
    if (places && places.length > 0) {
        const address = places[0].formatted_address;
        setFormData((prevState) => ({
            ...prevState,
            address,
        }));
    }
};

  
  const [isDonor, setIsDonor] = useState(null); // Track whether they are a donor or taker
  const [formData, setFormData] = useState({
    orgName: '',
    peopleServed: '',
    address: '',
    contactPerson: '',
    phoneNumber: '',
    email: '',
    foodType: '', // Specific for donors
    foodAmount: '', // Specific for donors
  });
  const navigate = useNavigate(); // Initialize navigation hook

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Create organization object based on user input
    const newOrg = {
      name: formData.orgName,
      address: formData.address,
      peopleServed: parseInt(formData.peopleServed, 10),
      contactPerson: formData.contactPerson,
      phoneNumber: formData.phoneNumber,
      email: formData.email,
      ...(isDonor && {
        foodType: formData.foodType,
        foodAmount: parseInt(formData.foodAmount, 10),
      }),
    };
  
    try {
      const response = await fetch(`http://localhost:5001${isDonor ? '/donors' : '/shelters'}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newOrg),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to register organization');
      }
  
      // Redirect based on the organization type
      if (isDonor) {
        navigate('/display/donors');
      } else {
        navigate('/display/shelters');
      }
    } catch (error) {
      console.error('Failed to register organization:', error);
      // Optionally show an error message to the user
    }
  };
  
  return (
    <div className="background">
      <div className="form-container">
        <div className="form-wrapper">
          <h1>Register Your Organization</h1>
          <p>Are you a donor or a shelter?</p>
          <div className="role-selection">
            <button
              className={`role-button ${isDonor ? 'selected' : ''}`}
              onClick={() => setIsDonor(true)}
            >
              Donor
            </button>
            <button
              className={`role-button ${!isDonor && isDonor !== null ? 'selected' : ''}`}
              onClick={() => setIsDonor(false)}
            >
              Shelter
            </button>
          </div>

          {isDonor !== null && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="form-group">
                <label htmlFor="orgName">Organization Name</label>
                <input
                  id="orgName"
                  name="orgName"
                  type="text"
                  value={formData.orgName}
                  onChange={handleChange}
                  required
                />
              </div>


              <div className="form-group">
                
                <label htmlFor="peopleServed">
                  Meals Served (Donor) / Needed (Shelter)
                </label>
                <input
                  id="peopleServed"
                  name="peopleServed"
                  type="number"
                  value={formData.peopleServed}
                  onChange={handleChange}
                  required
                />
              </div>

              {isDonor && (
                <>
                  <div className="form-group">
                    <label htmlFor="foodType">Food Type</label>
                    <input
                      id="foodType"
                      name="foodType"
                      type="text"
                      value={formData.foodType}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="foodAmount">Amount of Food (kg)</label>
                    <input
                      id="foodAmount"
                      name="foodAmount"
                      type="number"
                      value={formData.foodAmount}
                      onChange={handleChange}
                    />
                  </div>
                </>
              )}

              <div className="form-group">
                <label htmlFor="address">Address</label>

                {isLoaded &&
                <StandaloneSearchBox onLoad={(ref) => inputRef.current = ref}
                  onPlacesChanged= {handleOnPlacesChanged}>
                <input
                  id="address"
                  name="address"
                  type="text"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
                </StandaloneSearchBox>
                }

              </div>

              <div className="form-group">
                <label htmlFor="contactPerson">Contact Person</label>
                <input
                  id="contactPerson"
                  name="contactPerson"
                  type="text"
                  value={formData.contactPerson}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="submit-button"
              >
                Submit Registration
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
