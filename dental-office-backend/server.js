const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const dentistRoutes = require('./routes/dentistRoutes');
const officeInfoRoutes = require('./routes/officeInfoRoutes');
const errorHandler = require('./middleware/errorMiddleware');
const rateLimiter = require('./middleware/rateLimiter');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/', rateLimiter); // Apply rate limiting to all API routes

app.use('/api/auth', authRoutes);
app.use('/api/office-info', officeInfoRoutes);
app.use('/api/dentists', dentistRoutes);
app.use('/api/appointments', appointmentRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));