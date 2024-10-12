import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Details() {
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
    <div className="container mx-auto px-4 py-8">
      <div className="w-full max-w-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold mb-2">Register Your Organization</h1>
          <p className="text-gray-600 mb-4">Are you a donor or a shelter?</p>
          <div className="mb-4">
            <button
              className={`mr-4 py-2 px-4 rounded ${isDonor ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
              onClick={() => setIsDonor(true)}
            >
              Donor (Restaurant)
            </button>
            <button
              className={`py-2 px-4 rounded ${!isDonor && isDonor !== null ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
              onClick={() => setIsDonor(false)}
            >
              Shelter
            </button>
          </div>

          {isDonor !== null && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="orgName" className="block text-sm font-medium text-gray-700">
                  Organization Name
                </label>
                <input
                  id="orgName"
                  name="orgName"
                  type="text"
                  value={formData.orgName}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>

              <div>
                <label htmlFor="peopleServed" className="block text-sm font-medium text-gray-700">
                  Number of People Served
                </label>
                <input
                  id="peopleServed"
                  name="peopleServed"
                  type="number"
                  value={formData.peopleServed}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>

              {isDonor && (
                <>
                  <div>
                    <label htmlFor="foodType" className="block text-sm font-medium text-gray-700">
                      Food Type
                    </label>
                    <input
                      id="foodType"
                      name="foodType"
                      type="text"
                      value={formData.foodType}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="foodAmount" className="block text-sm font-medium text-gray-700">
                      Amount of Food (kg)
                    </label>
                    <input
                      id="foodAmount"
                      name="foodAmount"
                      type="number"
                      value={formData.foodAmount}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
                  </div>
                </>
              )}

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>

              <div>
                <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700">
                  Contact Person
                </label>
                <input
                  id="contactPerson"
                  name="contactPerson"
                  type="text"
                  value={formData.contactPerson}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>

              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
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
