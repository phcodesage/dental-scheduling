const rateLimit = require('express-rate-limit');
const jwt = require('jsonwebtoken'); // Import the jwt module

const apiLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    message: 'Too many requests from this IP, please try again after 5 minutes.',
  },
  keyGenerator: function (req, res) {
    // Generate key based on the client IP
    return req.ip || req.connection.remoteAddress;
  },
  skip: function (req, res) {
    // Check if the user is authenticated, skip rate limiting if they are
    if (req.headers.authorization) {
      try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return !!decoded; // Skip if the token is valid
      } catch (err) {
        console.log('Invalid token, rate limiting will apply:', err.message);
        return false;
      }
    }
    return false;
  },
});

module.exports = apiLimiter;
