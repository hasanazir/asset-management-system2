const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  userId: String,
  action: String,
  endpoint: String,
  method: String,
  body: Object,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Log', logSchema);
