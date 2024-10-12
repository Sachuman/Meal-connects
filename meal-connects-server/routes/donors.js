const express = require('express');
const router = express.Router();
const Donor = require('../mongodb/Donor');




router.get('/', async (req, res) => {

    try {
        const donors = await Donor.find();
        res.json(donors);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});


router.post('/', async (req, res) => {
    try {
        const donor = new Donor({
            name: req.body.name,
            address: req.body.address,
            peopleServed: req.body.peopleServed,
            contactPerson: req.body.contactPerson,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            foodType: req.body.foodType,
            foodAmount: req.body.foodAmount,
            createdAt: req.body.createdAt,
        });
        const newDonor = await donor.save();
        res.status(201).json(newDonor);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {

    try {
        const donor = await Donor.findById(req.params.id);
        if (!donor) {
            return res.status(404).json({ message: 'Donor not found' });
        }
        await Donor.deleteOne({ _id: req.params.id });
        res.json({ message: 'Donor deleted' });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
    
});

module.exports = router;
