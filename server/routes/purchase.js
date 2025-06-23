const express = require('express');
const router = express.Router();
const { createPurchase, getPurchases } = require('../controllers/purchaseController');
const { auth, authorizeRoles } = require('../middleware/authMiddleware');

// Only Admin and Logistics can make purchases
router.post('/', auth, authorizeRoles('Admin', 'LogisticsOfficer'), createPurchase);
router.get('/', auth, getPurchases);

module.exports = router;
