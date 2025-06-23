const Purchase = require('../models/Purchase');
const Asset = require('../models/Asset');

exports.createPurchase = async (req, res) => {
  try {
    const { assetType, assetName, quantity, base } = req.body;

    // Save purchase log
    const purchase = new Purchase({
      assetType,
      assetName,
      quantity,
      base,
      purchasedBy: req.user.id,
    });
    await purchase.save();

    // Update or Create Asset
    let asset = await Asset.findOne({ name: assetName, base });
    if (asset) {
      asset.quantity += quantity;
      asset.history.push({
        action: 'purchase',
        date: new Date(),
        quantity,
        to: base,
        performedBy: req.user.id,
      });
      await asset.save();
    } else {
      asset = new Asset({
        type: assetType,
        name: assetName,
        quantity,
        base,
        history: [{
          action: 'purchase',
          date: new Date(),
          quantity,
          to: base,
          performedBy: req.user.id,
        }]
      });
      await asset.save();
    }

    res.status(201).json({ message: 'Purchase recorded' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPurchases = async (req, res) => {
  try {
    const { base, assetType, startDate, endDate } = req.query;

    const query = {};
    if (base) query.base = base;
    if (assetType) query.assetType = assetType;
    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const purchases = await Purchase.find(query).sort({ date: -1 });
    res.json(purchases);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
