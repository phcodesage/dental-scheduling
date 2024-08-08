const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Dentist = require('./models/Dentist');

dotenv.config();
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    // Define dummy dentists
    const dentists = [
      { name: 'Dr. John Doe', specialization: 'Orthodontics', availableSlots: ['09:00', '10:00', '11:00'] },
      { name: 'Dr. Jane Smith', specialization: 'Cosmetic Dentistry', availableSlots: ['12:00', '13:00', '14:00'] },
      { name: 'Dr. Emma Brown', specialization: 'Pediatric Dentistry', availableSlots: ['09:00', '11:00', '15:00'] },
      { name: 'Dr. Liam Johnson', specialization: 'Endodontics', availableSlots: ['10:00', '12:00', '16:00'] },
      { name: 'Dr. Olivia Davis', specialization: 'Prosthodontics', availableSlots: ['08:00', '09:00', '13:00'] },
      { name: 'Dr. William Martinez', specialization: 'Periodontics', availableSlots: ['10:00', '11:00', '14:00'] },
      { name: 'Dr. Isabella Garcia', specialization: 'Oral Surgery', availableSlots: ['09:00', '10:00', '15:00'] },
      { name: 'Dr. Noah Miller', specialization: 'General Dentistry', availableSlots: ['08:00', '11:00', '16:00'] },
      { name: 'Dr. Mia Lopez', specialization: 'Pediatric Dentistry', availableSlots: ['09:00', '12:00', '14:00'] },
      { name: 'Dr. Lucas Wilson', specialization: 'Orthodontics', availableSlots: ['10:00', '13:00', '15:00'] },
    ];

    // Insert dummy dentists into the database
    await Dentist.insertMany(dentists);
    console.log('Dummy dentists added successfully');

    // Disconnect from the database
    mongoose.disconnect();
  } catch (error) {
    console.error('Error adding dummy dentists:', error.message);
    process.exit(1);
  }
};

connectDB();
