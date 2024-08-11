const mongoose = require('mongoose');

const DentistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  availableSlots: [
    {
      date: { type: Date, required: true }, // Stores the full date and time
    },
  ],
  avatar: {
    type: String, // URL or file path to the avatar image
    required: false,
  },
});

const Dentist = mongoose.model('Dentist', DentistSchema);

module.exports = Dentist;
