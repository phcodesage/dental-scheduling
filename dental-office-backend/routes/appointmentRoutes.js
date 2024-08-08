const express = require('express');
const { createAppointment, getAppointments, deleteAppointment } = require('../controllers/appointmentController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, createAppointment); // Book an appointment
router.get('/', authMiddleware, getAppointments); // Get all appointments for logged-in user
router.delete('/:id', authMiddleware, deleteAppointment); // Cancel an appointment

module.exports = router;
