const express = require('express');
const router = express.Router();
const Log = require('../models/Log');
const { auth, authorizeRoles } = require('../middleware/authMiddleware');

// Only Admin can view logs
router.get('/', auth, authorizeRoles('Admin'), async (req, res) => {
  const logs = await Log.find().sort({ timestamp: -1 });
  res.json(logs);
});

module.exports = router;
