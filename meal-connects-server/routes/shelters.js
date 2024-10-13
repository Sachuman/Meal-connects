const express = require('express');
const router = express.Router();
const Shelter = require('../mongodb/Shelter');




router.get('/', async (req, res) => {
    try {
        const shelters = await Shelter.find();
        res.json(shelters);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});


router.post('/', async (req, res) => {
    try {
        const shelter = new Shelter({
            name: req.body.name,
            address: req.body.address,
            peopleServed: req.body.peopleServed,
            contactPerson: req.body.contactPerson,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            createdAt: req.body.createdAt,
        });
        const newShelter = await shelter.save();
        res.status(201).json(newShelter);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
        console.log(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const shelter = await Shelter.findById(req.params.id);
        if (!shelter) {
            return res.status(404).json({ message: 'Shelter not found' });
        }
        await Shelter.deleteOne({ _id: req.params.id });
        res.json({ message: 'Shelter deleted' });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
