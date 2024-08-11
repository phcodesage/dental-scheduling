const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('../middleware/asyncHandler');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');
const path = require('path');
const fs = require('fs');

// Register user
exports.register = asyncHandler(async (req, res) => {
  const { name, email, phone, password } = req.body;

  if (!phone) {
    return res.status(400).json({ message: 'Phone number is required' });
  }

  let user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ message: 'User already exists' });
  }

  user = new User({ name, email, phone, password });
  await user.save();

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.status(201).json({ message: 'User registered successfully', token });
});



// Login user
exports.login = asyncHandler(async (req, res) => {
  const { email, phone, password } = req.body;

  // Check if the user exists by email or phone
  const user = await User.findOne(email ? { email } : { phone });
  if (!user) {
    return res.status(400).json({ message: 'Invalid email or phone number' });
  }

  // Check if the password is correct
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid password' });
  }

  // If login is successful, generate a token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  res.json({
    message: 'User logged in successfully',
    token,
  });
});


// Get user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); // Exclude the password field
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user profile
exports.updateProfile = asyncHandler(async (req, res) => {
  const { name, email, phone, password } = req.body;

  const user = await User.findById(req.user.id);
  // Ensure all required fields are present during the update
  user.name = name || user.name;
  user.email = email || user.email;
  user.phone = phone || user.phone; // Retain the current phone if not provided
  if (password) {
    user.password = password;
  }

  await user.save();

  res.json({ message: 'Profile updated successfully', user });
});



// Forgot Password
exports.forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // Generate a password reset token
  const resetToken = crypto.randomBytes(20).toString('hex');
  console.log('Generated raw reset token:', resetToken); // Log the raw token

  user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  console.log('Hashed reset token stored in DB:', user.resetPasswordToken); // Log the hashed token

  user.resetPasswordExpire = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

  await user.save();

  // Create reset URL dynamically based on the environment
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
  console.log('Reset URL:', resetUrl); // Log the reset URL sent to the user

  const message = `You are receiving this email because you (or someone else) has requested a password reset. Please copy and paste the following link into your browser to reset your password:\n\n ${resetUrl}`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Password Reset Request',
      message,
    });

    res.status(200).json({ message: 'Email sent' });
  } catch (error) {
    console.error('Error sending email:', error);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    res.status(500);
    throw new Error('Email could not be sent');
  }
});

// Reset Password
exports.resetPassword = asyncHandler(async (req, res) => {
  const { token, password } = req.body;

  console.log('Received token:', token);

  if (!token) {
    res.status(400);
    throw new Error('Token is required');
  }

  // Find the user by hashed token and check if it's still valid
  const user = await User.findOne({
    resetPasswordToken: crypto.createHash('sha256').update(token).digest('hex'),
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    res.status(400);
    throw new Error('Invalid or expired token');
  }

  // Set the new password and let Mongoose hash it in the pre-save hook
  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  res.status(200).json({ message: 'Password reset successful' });
});

// Delete user account
exports.deleteAccount = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  await User.deleteOne({ _id: req.user.id });

  res.status(200).json({ message: 'Account deleted successfully' });
});



// Handle avatar upload
exports.uploadAvatar = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  if (!req.files || !req.files.avatar) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const file = req.files.avatar;

  if (!file.mimetype.startsWith('image')) {
    return res.status(400).json({ message: 'Please upload an image file' });
  }

  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return res.status(400).json({ message: `Please upload an image less than ${process.env.MAX_FILE_UPLOAD / 1024 / 1024}MB` });
  }

  file.name = `avatar_${user._id}${path.parse(file.name).ext}`;

  const uploadPath = path.join(__dirname, '../public/uploads');
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  file.mv(`${uploadPath}/${file.name}`, async (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Problem with file upload' });
    }

    user.avatarUrl = `/uploads/${file.name}`;

    await user.save(); // Ensure phone is preserved if not updated

    res.status(200).json({ avatarUrl: user.avatarUrl });
  });
});


