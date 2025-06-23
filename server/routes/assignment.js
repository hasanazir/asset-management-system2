const express = require('express');
const router = express.Router();
const { assignAsset, markExpended, getAssignments } = require('../controllers/assignmentController');
const { auth, authorizeRoles } = require('../middleware/authMiddleware');

// Only Admin or Commander can assign
router.post('/', auth, authorizeRoles('Admin', 'BaseCommander'), assignAsset);
router.patch('/:id/expended', auth, authorizeRoles('Admin', 'BaseCommander'), markExpended);
router.get('/', auth, getAssignments);

module.exports = router;
