const express = require('express');
const { createAppointment, getAppointments, deleteAppointment, updateAppointment } = require('../controllers/appointmentController'); // Ensure this is correct
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, createAppointment); // Create an appointment
router.get('/', authMiddleware, getAppointments);    // Get all appointments for the logged-in user
router.delete('/:id', authMiddleware, deleteAppointment); // Cancel an appointment
router.put('/:id', authMiddleware, updateAppointment); // Reschedule an appointment

module.exports = router;
