const mongoose = require('mongoose');

const DentistSchema = new mongoose.Schema({
  name: String,
  specialty: String,
  availableSlots: [String],
});

const Dentist = mongoose.model('Dentist', DentistSchema);

module.exports = Dentist;
