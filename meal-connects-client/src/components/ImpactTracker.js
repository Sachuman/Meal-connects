import React, { useState, useEffect } from 'react'

export default function ImpactTracker() {
  const [impactData, setImpactData] = useState({
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

        {/* Donations Made */}
        <div className="bg-purple-100 shadow-lg rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-purple-600">Donations Made</h2>
          <p className="text-5xl font-bold text-gray-800 mt-4">{impactData.donationsMade}</p>
          <p className="text-gray-600 mt-2">total donations by restaurants</p>
        </div>
      </div>
      
      {/* Optionally add graphs or charts for visualizing progress */}
      <div className="mt-12 text-center">
        <h3 className="text-xl font-bold mb-4">Visualize Your Impact</h3>
        <p className="text-gray-600">Coming soon: Detailed graphs showing your impact over time.</p>
      </div>
    </div>
  )
}
