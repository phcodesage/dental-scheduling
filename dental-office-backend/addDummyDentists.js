const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Dentist = require('./models/Dentist');
const fs = require('fs');
const path = require('path');

dotenv.config();

const DEFAULT_AVATAR_PATH = '/images/default-avatar.svg';  // Path to your default avatar

// Function to check if a file exists
const fileExists = (filePath) => {
  return fs.existsSync(path.join(__dirname, 'public', filePath));
};

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    // Define real dates for availability
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const dentists = [
      {
        name: 'Dr. John Doe',
        specialization: 'Orthodontics',
        availableSlots: [
          { date: new Date(today.setHours(9, 0)) },
          { date: new Date(today.setHours(10, 0)) },
          { date: new Date(today.setHours(11, 0)) },
        ],
        avatar: fileExists('/images/dr-john-doe.png') ? '/images/dr-john-doe.png' : DEFAULT_AVATAR_PATH,
      },
      {
        name: 'Dr. Jane Smith',
        specialization: 'Cosmetic Dentistry',
        availableSlots: [
          { date: new Date(today.setHours(12, 0)) },
          { date: new Date(today.setHours(13, 0)) },
          { date: new Date(today.setHours(14, 0)) },
        ],
        avatar: fileExists('/images/dr-jane-smith.png') ? '/images/dr-jane-smith.png' : DEFAULT_AVATAR_PATH,
      },
      {
        name: 'Dr. Emma Brown',
        specialization: 'Pediatric Dentistry',
        availableSlots: [
          { date: new Date(today.setHours(9, 0)) },
          { date: new Date(today.setHours(11, 0)) },
          { date: new Date(today.setHours(15, 0)) },
        ],
        avatar: fileExists('/images/dr-emma-brown.png') ? '/images/dr-emma-brown.png' : DEFAULT_AVATAR_PATH,
      },
      {
        name: 'Dr. Liam Johnson',
        specialization: 'Endodontics',
        availableSlots: [
          { date: new Date(tomorrow.setHours(10, 0)) },
          { date: new Date(tomorrow.setHours(12, 0)) },
          { date: new Date(tomorrow.setHours(16, 0)) },
        ],
        avatar: fileExists('/images/dr-liam-johnson.png') ? '/images/dr-liam-johnson.png' : DEFAULT_AVATAR_PATH,
      },
      {
        name: 'Dr. Olivia Davis',
        specialization: 'Prosthodontics',
        availableSlots: [
          { date: new Date(today.setHours(8, 0)) },
          { date: new Date(today.setHours(9, 0)) },
          { date: new Date(today.setHours(13, 0)) },
        ],
        avatar: fileExists('/images/dr-olivia-davis.png') ? '/images/dr-olivia-davis.png' : DEFAULT_AVATAR_PATH,
      },
      {
        name: 'Dr. William Martinez',
        specialization: 'Periodontics',
        availableSlots: [
          { date: new Date(tomorrow.setHours(10, 0)) },
          { date: new Date(tomorrow.setHours(11, 0)) },
          { date: new Date(tomorrow.setHours(14, 0)) },
        ],
        avatar: fileExists('/images/dr-william-martinez.png') ? '/images/dr-william-martinez.png' : DEFAULT_AVATAR_PATH,
      },
      {
        name: 'Dr. Isabella Garcia',
        specialization: 'Oral Surgery',
        availableSlots: [
          { date: new Date(today.setHours(9, 0)) },
          { date: new Date(today.setHours(10, 0)) },
          { date: new Date(today.setHours(15, 0)) },
        ],
        avatar: fileExists('/images/dr-isabella-garcia.png') ? '/images/dr-isabella-garcia.png' : DEFAULT_AVATAR_PATH,
      },
      {
        name: 'Dr. Noah Miller',
        specialization: 'General Dentistry',
        availableSlots: [
          { date: new Date(tomorrow.setHours(8, 0)) },
          { date: new Date(tomorrow.setHours(11, 0)) },
          { date: new Date(tomorrow.setHours(16, 0)) },
        ],
        avatar: fileExists('/images/dr-noah-miller.png') ? '/images/dr-noah-miller.png' : DEFAULT_AVATAR_PATH,
      },
      {
        name: 'Dr. Mia Lopez',
        specialization: 'Pediatric Dentistry',
        availableSlots: [
          { date: new Date(today.setHours(9, 0)) },
          { date: new Date(today.setHours(12, 0)) },
          { date: new Date(today.setHours(14, 0)) },
        ],
        avatar: fileExists('/images/dr-mia-lopez.png') ? '/images/dr-mia-lopez.png' : DEFAULT_AVATAR_PATH,
      },
      {
        name: 'Dr. Lucas Wilson',
        specialization: 'Orthodontics',
        availableSlots: [
          { date: new Date(tomorrow.setHours(10, 0)) },
          { date: new Date(tomorrow.setHours(13, 0)) },
          { date: new Date(tomorrow.setHours(15, 0)) },
        ],
        avatar: fileExists('/images/dr-lucas-wilson.png') ? '/images/dr-lucas-wilson.png' : DEFAULT_AVATAR_PATH,
      },
    ];

    // Insert dummy dentists into the database
    await Dentist.insertMany(dentists);
    console.log('Dummy dentists with real dates and avatars added successfully');

    // Disconnect from the database
    mongoose.disconnect();
  } catch (error) {
    console.error('Error adding dummy dentists:', error.message);
    process.exit(1);
  }
};

connectDB();
