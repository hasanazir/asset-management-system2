const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
  assetType: String,
  assetName: String,
  quantity: Number,
  base: String,
  purchasedBy: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Purchase', purchaseSchema);
