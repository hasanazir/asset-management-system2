const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  assetName: String,
  assignedTo: String,
  base: String,
  quantity: Number,
  isExpended: { type: Boolean, default: false },
  assignedBy: String,
  assignedOn: { type: Date, default: Date.now },
  expendedOn: Date
});

module.exports = mongoose.model('Assignment', assignmentSchema);
