const Asset = require('../models/Asset');
const Assignment = require('../models/Assignment');
const Purchase = require('../models/Purchase');
const Transfer = require('../models/Transfer');

exports.getNetMovements = async (req, res) => {
  try {
    const { base, from, to, type } = req.query;

    const dateFilter = {};
    if (from || to) {
      dateFilter.date = {};
      if (from) dateFilter.date.$gte = new Date(from);
      if (to) dateFilter.date.$lte = new Date(to);
    }

    // Purchases
    const purchases = await Purchase.find({ base, ...dateFilter });
    const totalPurchased = purchases.reduce((sum, p) => sum + p.quantity, 0);

    // Transfers
    const transfersIn = await Transfer.find({ toBase: base, ...dateFilter });
    const transfersOut = await Transfer.find({ fromBase: base, ...dateFilter });

    const totalIn = transfersIn.reduce((sum, t) => sum + t.quantity, 0);
    const totalOut = transfersOut.reduce((sum, t) => sum + t.quantity, 0);

    // Assignments
    const assignments = await Assignment.find({ base, ...dateFilter });
    const totalAssigned = assignments.reduce((sum, a) => sum + a.quantity, 0);
    const totalExpended = assignments
      .filter(a => a.isExpended)
      .reduce((sum, a) => sum + a.quantity, 0);

    const netMovement = totalPurchased + totalIn - totalOut;

    return res.json({
      openingBalance: '-', // Optional to compute later
      closingBalance: '-', // Optional to compute later
      netMovement,
      totalPurchased,
      totalIn,
      totalOut,
      totalAssigned,
      totalExpended,
      purchases,
      transfersIn,
      transfersOut,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
