const express = require('express');
const { getDentists, getAvailableSlots, getDentistById } = require('../controllers/dentistController');
const apiLimiter = require('../middleware/rateLimiter');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Apply authMiddleware before rate limiting and route handlers
router.use(authMiddleware); // Ensures req.user is available

router.get('/', apiLimiter, getDentists); // Get all dentists
router.get('/:id/slots', apiLimiter, getAvailableSlots); // Get available slots for a specific dentist
router.get('/:id', apiLimiter, getDentistById); // Get dentist details

module.exports = router;
