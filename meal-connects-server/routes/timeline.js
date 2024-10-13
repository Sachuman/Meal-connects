// routes/timelineRoutes.js

const express = require('express');
const router = express.Router();

const Donor = require('../mongodb/Donor');
const Shelter = require('../mongodb/Shelter');

const getTimelineData = async () => {

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7); // Get the date 7 days ago

    // Prepare an object to hold the totals for each day
    const timelineTotals = {};
    
    // Initialize the last 7 days
    for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateString = date.toISOString().split('T')[0]; // Format: YYYY-MM-DD
        timelineTotals[dateString] = {
            totalFoodSaved: 0,
            totalCarbonSaved: 0,
            totalPeopleServed: 0
        };
    }

    // Aggregate food saved from Donor model
    const foodSavedData = await Donor.aggregate([
        {
            $match: {
                createdAt: { $gte: sevenDaysAgo }, // Filter for the last 7 days
            },
        },
        {
            $group: {
                _id: {
                    $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }, // Group by day
                },
                totalFoodSaved: { $sum: "$foodAmount" },
                totalCarbonSaved: { $sum: { $multiply: ["$foodAmount", 2.5] }}
            },
        },
        {
            $sort: { _id: 1 }, // Sort by date
        },
    ]);

    console.log(foodSavedData);

    // Aggregate people served from Shelter model
    const peopleServedData = await Shelter.aggregate([
        {
            $match: {
                createdAt: { $gte: sevenDaysAgo }, // Filter for the last 7 days
            },
        },
        {
            $group: {
                _id: {
                    $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }, // Group by day
                },
                totalPeopleServed: { $sum: "$peopleServed" },
            },
        },
        {
            $sort: { _id: 1 }, // Sort by date
        },
    ]);

    console.log(peopleServedData);

    // Populate the timelineTotals with data from foodSavedData
    foodSavedData.forEach(({ _id, totalFoodSaved, totalCarbonSaved }) => {
        timelineTotals[_id].totalFoodSaved = totalFoodSaved;
        timelineTotals[_id].totalCarbonSaved = totalCarbonSaved;
    });

    // Populate the timelineTotals with data from peopleServedData
    peopleServedData.forEach(({ _id, totalPeopleServed }) => {
        timelineTotals[_id].totalPeopleServed = totalPeopleServed;
    });

    // Convert the timelineTotals object to an array for easier return
    return Object.keys(timelineTotals).map(date => ({
        date,
        ...timelineTotals[date]
    }));
};

router.get('/', async (req, res) => {
    try {
        const timelineData = await getTimelineData();
        res.json(timelineData);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching timeline data', error });
    }
});

module.exports = router;
