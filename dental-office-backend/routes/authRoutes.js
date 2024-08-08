const express = require('express');
const { register, login, getProfile, updateProfile } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Register a new user
router.post('/register', register);

// Login user
router.post('/login', login);

// Get user profile (protected route)
router.get('/profile', authMiddleware, getProfile);

// Update user profile (protected route)
router.put('/profile', authMiddleware, updateProfile);

module.exports = router;
