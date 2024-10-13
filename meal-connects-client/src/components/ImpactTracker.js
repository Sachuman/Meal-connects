import React, { useState, useEffect } from 'react';
import './ImpactTracker.css'; // Import the CSS file

export default function ImpactTracker() {
  const [impactData, setImpactData] = useState({
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
      </div>

      {/* Optionally add graphs or charts for visualizing progress */}
      <div className="mt-12 text-center">
        <h3 className="text-xl font-bold mb-4">Visualize Your Impact</h3>
        <p className="text-gray-600">Coming soon: Detailed graphs showing your impact over time.</p>
      </div>
    </div>
  );
}
