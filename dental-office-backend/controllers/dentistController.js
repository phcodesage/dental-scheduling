const asyncHandler = require('../middleware/asyncHandler');
const Dentist = require('../models/Dentist');

// Get all dentists
exports.getDentists = asyncHandler(async (req, res) => {
  const dentists = await Dentist.find();
  res.json(dentists);
});


// Get available slots for a specific dentist
exports.getAvailableSlots = asyncHandler(async (req, res) => {
  const dentistId = req.params.id;

  const dentist = await Dentist.findById(dentistId);
  if (!dentist) {
    return res.status(404).json({ message: 'Dentist not found' });
  }
  res.json(dentist.availableSlots);
});


exports.getDentistSlots = asyncHandler(async (req, res) => {
  const dentist = await Dentist.findById(req.params.id);
  if (!dentist) {
    return res.status(404).json({ message: 'Dentist not found' });
  }
  res.json(dentist.availableSlots);
});

exports.getDentistById = asyncHandler(async (req, res) => {
  const dentist = await Dentist.findById(req.params.id);
  if (!dentist) {
    return res.status(404).json({ message: 'Dentist not found' });
  }
  res.json(dentist);
});