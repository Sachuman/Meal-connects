import React, { useState, useEffect } from 'react';
import './ImpactTracker.css'; // Import the CSS file

export default function ImpactTracker() {
  const [impactData, setImpactData] = useState({
<<<<<<< Updated upstream
    foodSaved: 0, // in kilograms or pounds
    mealsProvided: 0, 
    co2Reduction: 0, // in kilograms or pounds of CO2
    donationsMade: 0, // total donations by restaurants
  })

  useEffect(() => {
    // Simulate fetching impact data from a database or API
    const fetchedImpactData = JSON.parse(localStorage.getItem('impactData') || '{}')

    // Assuming impactData contains: foodSaved, mealsProvided, co2Reduction, donationsMade
    setImpactData({
      foodSaved: fetchedImpactData.foodSaved || 0,
      mealsProvided: fetchedImpactData.mealsProvided || 0,
      co2Reduction: fetchedImpactData.co2Reduction || 0,
      donationsMade: fetchedImpactData.donationsMade || 0,
    })
  }, [])
=======
    foodSaved: 0,
    mealsProvided: 0,
    co2Reduction: 0,
  });

  const [graphData, setGraphData] = useState([]);

  // Fetching data from the server
  const fetchedFoodData = async () => {
    try {
      const response = await fetch('http://localhost:5001/donors/');
      const data = await response.json();
      const foodSaved = data.reduce((total, donor) => total + donor.foodAmount, 0);
      return foodSaved;
    } catch (err) {
      console.log(err);
    }
  };

  const fetchedShelterData = async () => {
    try {
      const response = await fetch('http://localhost:5001/shelters/');
      const data = await response.json();
      const mealsProvided = data.reduce((total, shelter) => total + shelter.peopleServed, 0);
      return mealsProvided;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchImpactData = async () => {
      const foodSaved = await fetchedFoodData();
      const mealsProvided = await fetchedShelterData();
      const co2Reduction = foodSaved * 2.5; // 2.5 kg of CO2 saved per kg of food

      setImpactData({
        foodSaved,
        mealsProvided,
        co2Reduction,
      });
    };
    fetchImpactData();
  }, []);
>>>>>>> Stashed changes

  return (
    <div className="container">
      <h1>Impact Tracker</h1>

      <div className="grid">
        {/* Total Food Saved */}
        <div className="card">
          <h2>Total Food Saved</h2>
          <p>{impactData.foodSaved} kg</p>
          <p>of food saved from waste</p>
        </div>

        {/* Meals Provided */}
        <div className="card" style={{ backgroundColor: '#ebf8ff' }}>
          <h2>Meals Provided</h2>
          <p>{impactData.mealsProvided}</p>
          <p>meals served to shelters</p>
        </div>

        {/* CO2 Emission Reduction */}
        <div className="card" style={{ backgroundColor: '#fefcbf' }}>
          <h2>CO2 Emissions Reduced</h2>
          <p>{impactData.co2Reduction} kg</p>
          <p>of CO2 saved</p>
        </div>
<<<<<<< Updated upstream

        {/* Donations Made */}
        <div className="bg-purple-100 shadow-lg rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-purple-600">Donations Made</h2>
          <p className="text-5xl font-bold text-gray-800 mt-4">{impactData.donationsMade}</p>
          <p className="text-gray-600 mt-2">total donations by restaurants</p>
        </div>
=======
>>>>>>> Stashed changes
      </div>

      {/* Optionally add graphs or charts for visualizing progress */}
      <div className="mt-12 text-center">
        <h3 className="text-xl font-bold mb-4">Visualize Your Impact</h3>
        <p className="text-gray-600">Coming soon: Detailed graphs showing your impact over time.</p>
      </div>
    </div>
  );
}
