const mongoose = require('mongoose');

const donorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  foodType: {
    type: String,
    required: true,
    trim: true,
  },
  foodAmount: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  contactPerson: {
    type: String,
    required: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  
}, { timestamps: true });

const Donor = mongoose.model('Donor', donorSchema);

module.exports = Donor;