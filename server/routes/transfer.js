const express = require('express');
const router = express.Router();
const { transferAsset, getTransfers } = require('../controllers/transferController');
const { auth, authorizeRoles } = require('../middleware/authMiddleware');

router.post('/', auth, authorizeRoles('Admin', 'LogisticsOfficer'), transferAsset);
router.get('/', auth, getTransfers);

module.exports = router;
