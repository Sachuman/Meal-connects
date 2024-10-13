
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
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
      const response = await fetch('http://localhost:5000/donors/');
      const data = await response.json();
      const foodSaved = data.reduce((total, donor) => total + donor.foodAmount, 0);
      return foodSaved;
    } catch (err) {
      console.log(err);
    }
  };

  const fetchedShelterData = async() => {
    try{
      const response = await fetch('http://localhost:5000/shelters/');
      const data = await response.json();
      const mealsProvided = data.reduce((total, shelter) => total + shelter.peopleServed, 0);
      return mealsProvided;
    } catch (err) {
      console.log(err);
    }
  };

  const getTimelineData = async () => {
    try {
        const response = await fetch('http://localhost:5000/timeline/');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data); // Ensure you're logging the received data
        return data;
    } catch (err) {
        console.error('Error fetching timeline data:', err);
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
      })

      const timelineData = await getTimelineData();
      console.log(timelineData);
      setGraphData(timelineData.reverse());

    }
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
      <div>
        <h3>Visualize Your Impact</h3>
        <div style={{height: "500px", display: "flex", justifyContent: "center"}}>
          <ResponsiveContainer width="80%" height="100%">
            <LineChart
              data={graphData}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tickMargin={10} />
              <YAxis tickMargin={10}/>
              <Tooltip />
              <Legend 
                layout="horizontal"      // Horizontal layout
                verticalAlign="top"      // Place at the top of the chart
                align="center"           // Center the legend horizontally
              />
              <Line type="monotone" dataKey="Food Saved (kg)" stroke="#57c26e" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="Meals Provided" stroke="#5795c2" />
              <Line type="monotone" dataKey="CO2 Emissions Reduced (kg)" stroke="#ab9b49" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
    </div>
  );
}
