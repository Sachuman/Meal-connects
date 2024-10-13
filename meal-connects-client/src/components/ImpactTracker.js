import React, { useState, useEffect } from 'react'
import ImpactChart from './ImpactChart';

export default function ImpactTracker() {

  const [impactData, setImpactData] = useState({
    foodSaved: 0, 
    mealsProvided: 0, 
    co2Reduction: 0, 
  })

  const [timelineData, setTimelineData] = useState([]);

  //writing code for fetching data from the server and getting the data for impact
  const fetchedFoodData = async() =>{
    try{
      const response = await fetch('http://localhost:5000/donors/');
      const data = await response.json();
      const foodSaved = data.reduce((total, donor) => total + donor.foodAmount, 0); //defautl value is 0
      return foodSaved;

    }
    catch(err){
      console.log(err);
    } 

  }

  const fetchedShelterData = async() => {
    try{
      const response = await fetch('http://localhost:5000/shelters/');
      const data = await response.json();
      const mealsProvided = data.reduce((total, shelter) => total + shelter.peopleServed, 0); //defautl value is 0
      return mealsProvided;

    }
    catch(err){
      console.log(err);
    } 

  }

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
      console.log(mealsProvided);
      const co2Reduction = foodSaved * 2.5; // lets assume 2.5 kg of CO2 saved per kg of food

      setImpactData({
        foodSaved,
        mealsProvided,
        co2Reduction,
      })

      const timelineData = await getTimelineData();
      console.log(timelineData);
      setTimelineData(timelineData);

    }
    fetchImpactData();

  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Impact Tracker</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Food Saved */}
        <div className="bg-green-100 shadow-lg rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-green-600">Total Food Saved</h2>
          <p className="text-5xl font-bold text-gray-800 mt-4">{impactData.foodSaved} kg</p>
          <p className="text-gray-600 mt-2">of food saved from waste</p>
        </div>

        {/* Meals Provided */}
        <div className="bg-blue-100 shadow-lg rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-blue-600">Meals Provided</h2>
          <p className="text-5xl font-bold text-gray-800 mt-4">{impactData.mealsProvided}</p>
          <p className="text-gray-600 mt-2">meals served to shelters</p>
        </div>

        {/* CO2 Emission Reduction */}
        <div className="bg-yellow-100 shadow-lg rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-yellow-600">CO2 Emissions Reduced</h2>
          <p className="text-5xl font-bold text-gray-800 mt-4">{impactData.co2Reduction} kg</p>
          <p className="text-gray-600 mt-2">of CO2 saved</p>
        </div>

      </div>
      
      {/* Optionally add graphs or charts for visualizing progress */}
      <div className="mt-12 text-center">
        <h3 className="text-xl font-bold mb-4">Visualize Your Impact</h3>
        <p className="text-gray-600">Coming soon: Detailed graphs showing your impact over time.</p>
      </div>
      <ImpactChart data={timelineData} />
    </div>
  )
}
