const express = require('express');
const router = express.Router();
const { getNetMovements } = require('../controllers/movementController');
const { auth } = require('../middleware/authMiddleware');

router.get('/', auth, getNetMovements);

module.exports = router;
