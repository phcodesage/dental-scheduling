const express = require('express');
const fileUpload = require('express-fileupload');
const { 
    register, 
    login, 
    getProfile, 
    updateProfile, 
    resetPassword, 
    forgotPassword, 
    uploadAvatar, 
    deleteAccount // Import deleteAccount function
} = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const rateLimiter = require('../middleware/rateLimiter');

const router = express.Router();

// Enable file uploads
router.use(fileUpload());

// Register a new user
router.post('/register', rateLimiter, register);

// Login user
router.post('/login', rateLimiter, login);

// Reset Password
router.post('/reset-password/', rateLimiter, resetPassword);

// Forgot Password
router.post('/forgot-password/', forgotPassword);

// Get user profile (protected route)
router.get('/me', authMiddleware, getProfile);

// Update user profile (protected route)
router.put('/me', authMiddleware, updateProfile);

// Upload user avatar (protected route)
router.put('/me/avatar', authMiddleware, uploadAvatar);

// Delete user account (protected route)
router.delete('/me', authMiddleware, deleteAccount);

module.exports = router;
