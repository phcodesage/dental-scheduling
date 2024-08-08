const Appointment = require('../models/Appointment');
const Dentist = require('../models/Dentist');
const asyncHandler = require('../middleware/asyncHandler');

exports.createAppointment = asyncHandler(async (req, res) => {
  const { dentistId, date, time } = req.body;
  
  const dentist = await Dentist.findById(dentistId);
  if (!dentist) {
    res.status(404);
    throw new Error('Dentist not found');
  }

  const appointment = new Appointment({
    user: req.user.id,
    dentist: dentistId,
    date,
    time,
  });

  await appointment.save();

  // Remove the booked slot from available slots
  dentist.availableSlots = dentist.availableSlots.filter(slot => slot !== `${date} ${time}`);
  await dentist.save();

  res.status(201).json({
    message: 'Appointment successfully created',
    appointment,
  });
});

exports.getAppointments = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find({ user: req.user.id }).populate('dentist', 'name specialty');
  res.json(appointments);
});

exports.deleteAppointment = asyncHandler(async (req, res) => {
  const appointmentId = req.params.id;
  
  const appointment = await Appointment.findById(appointmentId);
  if (!appointment) {
    res.status(404);
    throw new Error('Appointment not found');
  }

  // Add the slot back to the dentist's available slots
  const dentist = await Dentist.findById(appointment.dentist);
  dentist.availableSlots.push(`${appointment.date} ${appointment.time}`);
  await dentist.save();

  await appointment.remove();
  res.json({ message: 'Appointment cancelled successfully' });
});
