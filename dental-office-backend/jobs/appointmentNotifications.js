const cron = require('node-cron');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');

const Appointment = require('../models/Appointment');
const sendEmail = require('../utils/sendEmail');

// Extend dayjs with plugins
dayjs.extend(utc);
dayjs.extend(timezone);

const notifyAfterMinutes = 2; // Set to 5 minutes after booking

// Schedule the task to run every minute
cron.schedule('* * * * *', async () => {
  console.log('Running scheduled task to check for recent bookings.');

  try {
    const currentTime = dayjs().utc();
    const fiveMinutesAgo = currentTime.subtract(notifyAfterMinutes, 'minute');

    console.log(`Current Time (UTC): ${currentTime.format()}`);
    console.log(`Looking for appointments created between: ${fiveMinutesAgo.format()} and ${currentTime.format()} (UTC)`);

    // Find appointments created within the last 5 minutes
    const recentAppointments = await Appointment.find({
      createdAt: {
        $gte: fiveMinutesAgo.toDate(),
        $lt: currentTime.toDate(),
      },
    }).populate('user');

    console.log(`Found ${recentAppointments.length} recent appointments.`);

    for (const appt of recentAppointments) {
      if (!appt.user) {
        console.log(`Skipping appointment ID: ${appt._id} because the user is null.`);
        continue;
      }

      const patient = appt.user;
      const appointmentDate = dayjs(appt.date).tz('Asia/Manila').format('MMMM D, YYYY [at] h:mm A');

      const emailOptions = {
        email: patient.email,
        subject: 'Thank You for Booking! Here’s Your Appointment Reminder',
        message: `Dear ${patient.name},\n\nThank you for booking your appointment. This is a reminder for your upcoming appointment on ${appointmentDate}. We look forward to seeing you.\n\nBest regards,\nYour Dental Office`,
      };

      console.log(`Sending reminder to ${patient.name} at ${patient.email} for appointment on ${appointmentDate}.`);

      await sendEmail(emailOptions);

      console.log(`Notification successfully sent to ${patient.name} for appointment on ${appointmentDate}.`);
    }
  } catch (error) {
    console.error('Error sending notifications:', error);
  }
});
