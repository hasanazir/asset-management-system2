const Transfer = require('../models/Transfer');
const Asset = require('../models/Asset');

exports.transferAsset = async (req, res) => {
  try {
    const { assetName, quantity, fromBase, toBase } = req.body;

    const assetFrom = await Asset.findOne({ name: assetName, base: fromBase });
    if (!assetFrom || assetFrom.quantity < quantity) {
      return res.status(400).json({ error: 'Insufficient asset quantity at base' });
    }

    // Deduct from source
    assetFrom.quantity -= quantity;
    assetFrom.history.push({
      action: 'transfer out',
      quantity,
      from: fromBase,
      to: toBase,
      date: new Date(),
      performedBy: req.user.id,
    });
    await assetFrom.save();

    // Add to destination
    let assetTo = await Asset.findOne({ name: assetName, base: toBase });
    if (assetTo) {
      assetTo.quantity += quantity;
      assetTo.history.push({
        action: 'transfer in',
        quantity,
        from: fromBase,
        to: toBase,
        date: new Date(),
        performedBy: req.user.id,
      });
      await assetTo.save();
    } else {
      assetTo = new Asset({
        name: assetName,
        type: assetFrom.type,
        quantity,
        base: toBase,
        history: [{
          action: 'transfer in',
          quantity,
          from: fromBase,
          to: toBase,
          date: new Date(),
          performedBy: req.user.id,
        }]
      });
      await assetTo.save();
    }

    const transfer = new Transfer({
      assetName,
      quantity,
      fromBase,
      toBase,
      transferredBy: req.user.id,
    });
    await transfer.save();

    res.status(201).json({ message: 'Asset transferred successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTransfers = async (req, res) => {
  try {
    const transfers = await Transfer.find().sort({ date: -1 });
    res.json(transfers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
