const express = require('express');
const { getDentists, getAvailableSlots } = require('../controllers/dentistController');

const router = express.Router();

router.get('/', getDentists); // Get all dentists
router.get('/:id/slots', getAvailableSlots); // Get available slots for a specific dentist

module.exports = router;
