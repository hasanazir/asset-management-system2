const mongoose = require('mongoose');

const transferSchema = new mongoose.Schema({
  assetName: String,
  quantity: Number,
  fromBase: String,
  toBase: String,
  transferredBy: String,
  date: { type: Date, default: Date.now },
  
});

module.exports = mongoose.model('Transfer', transferSchema);
