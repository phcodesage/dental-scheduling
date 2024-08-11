const Appointment = require('../models/Appointment');
const Dentist = require('../models/Dentist');
const asyncHandler = require('../middleware/asyncHandler');

// Create a new appointment
exports.createAppointment = asyncHandler(async (req, res) => {
  const { dentistId, time, date } = req.body;

  try {
    // Check if the user already has an appointment at the same time
    const existingAppointment = await Appointment.findOne({
      user: req.user.id,
      date,
      time,
    });

    if (existingAppointment) {
      return res.status(400).json({ message: 'You already have an appointment at this time.' });
    }

    const dentist = await Dentist.findById(dentistId);
    if (!dentist) {
      return res.status(404).json({ message: 'Dentist not found' });
    }

    const appointment = new Appointment({
      user: req.user.id,
      dentist: dentistId,
      time,
      date,
    });

    await appointment.save();

    // Remove the booked slot from available slots
    dentist.availableSlots = dentist.availableSlots.filter(
      (slot) => !(new Date(slot.date).toISOString() === new Date(date).toISOString() && slot.time === time)
    );
    await dentist.save();

    // Populate the dentist field before sending the response
    await appointment.populate('dentist', 'name specialization');

    res.status(201).json({
      message: 'Appointment successfully created',
      appointment,
    });
  } catch (error) {
    console.error('Error in createAppointment:', error);
    res.status(500).json({ message: 'Failed to create appointment', error: error.message });
  }
});

// Get all appointments for the logged-in user
exports.getAppointments = asyncHandler(async (req, res) => {
  try {
    const appointments = await Appointment.find({ user: req.user.id }).populate('dentist', 'name specialty');
    res.json(appointments);
  } catch (error) {
    console.error('Error in getAppointments:', error);
    res.status(500).json({ message: 'Failed to retrieve appointments', error: error.message });
  }
});

// Delete (cancel) an appointment
exports.deleteAppointment = asyncHandler(async (req, res) => {
  const appointmentId = req.params.id;

  try {
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Add the slot back to the dentist's available slots
    const dentist = await Dentist.findById(appointment.dentist);
    if (dentist) {
      dentist.availableSlots.push({ date: appointment.date, time: appointment.time });
      await dentist.save();
    }

    await appointment.deleteOne();
    res.json({ message: 'Appointment cancelled successfully' });
  } catch (error) {
    console.error('Error in deleteAppointment:', error);
    res.status(500).json({ message: 'Failed to cancel appointment', error: error.message });
  }
});


// Update (reschedule) an appointment
exports.updateAppointment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { time, date } = req.body;

  try {
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    const dentist = await Dentist.findById(appointment.dentist);
    if (!dentist) {
      return res.status(404).json({ message: 'Dentist not found' });
    }

    // Convert date to ISO string for accurate comparison
    const requestedDate = new Date(date).toISOString();

    // Validate that the selected slot is available
    const selectedSlot = dentist.availableSlots.find(slot => {
      return new Date(slot.date).toISOString() === requestedDate;
    });

    if (!selectedSlot) {
      return res.status(400).json({ message: `Selected time slot ${time} on ${date} is not available for dentist ${dentist.name}.` });
    }

    // Restore the previous slot to available slots
    dentist.availableSlots.push({ date: appointment.date });

    // Update the appointment time and date
    appointment.time = time;
    appointment.date = date;

    // Remove the new booked slot from available slots
    dentist.availableSlots = dentist.availableSlots.filter(slot => {
      return !(new Date(slot.date).toISOString() === requestedDate);
    });

    await dentist.save();
    await appointment.save();

    res.json({
      message: 'Appointment rescheduled successfully',
      appointment,
    });
  } catch (error) {
    console.error('Error in updateAppointment:', error.message);
    res.status(500).json({ message: 'Failed to reschedule appointment', error: error.message });
  }
});






