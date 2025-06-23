const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
  type: String, // weapon, vehicle
  name: String,
  quantity: Number,
  base: String,
  history: [
    {
      action: String,
      quantity: Number,
      from: String,
      to: String,
      date: Date,
      performedBy: String,
    }
  ]
});

module.exports = mongoose.model('Asset', assetSchema);
