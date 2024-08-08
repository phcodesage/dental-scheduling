const express = require('express');
const { getOfficeInfo, updateOfficeInfo } = require('../controllers/officeInfoController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getOfficeInfo); // Public route to get office information
router.put('/', authMiddleware, updateOfficeInfo); // Protected route to update office information

module.exports = router;
