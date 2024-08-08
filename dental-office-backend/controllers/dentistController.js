const Dentist = require('../models/Dentist');

exports.getDentists = async (req, res) => {
  try {
    const dentists = await Dentist.find();
    res.json(dentists);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve dentists' });
  }
};

exports.getAvailableSlots = async (req, res) => {
  const dentistId = req.params.id;
  try {
    const dentist = await Dentist.findById(dentistId);
    if (!dentist) {
      return res.status(404).json({ message: 'Dentist not found' });
    }
    res.json(dentist.availableSlots);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve available slots' });
  }
};
