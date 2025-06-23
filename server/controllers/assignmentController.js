const Assignment = require('../models/Assignment');
const Asset = require('../models/Asset');

exports.assignAsset = async (req, res) => {
  try {
    const { assetName, assignedTo, quantity, base } = req.body;

    const asset = await Asset.findOne({ name: assetName, base });
    if (!asset || asset.quantity < quantity) {
      return res.status(400).json({ error: 'Not enough stock to assign' });
    }

    asset.quantity -= quantity;
    asset.history.push({
      action: 'assigned',
      date: new Date(),
      quantity,
      to: assignedTo,
      performedBy: req.user.id,
    });
    await asset.save();

    const assignment = new Assignment({
      assetName,
      assignedTo,
      quantity,
      base,
      assignedBy: req.user.id
    });

    await assignment.save();
    res.status(201).json({ message: 'Asset assigned successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.markExpended = async (req, res) => {
  try {
    const { id } = req.params;

    const assignment = await Assignment.findById(id);
    if (!assignment) return res.status(404).json({ error: 'Assignment not found' });

    assignment.isExpended = true;
    assignment.expendedOn = new Date();
    await assignment.save();

    res.json({ message: 'Marked as expended' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAssignments = async (req, res) => {
  try {
    const { base, expended } = req.query;

    const query = {};
    if (base) query.base = base;
    if (expended) query.isExpended = expended === 'true';

    const assignments = await Assignment.find(query).sort({ assignedOn: -1 });
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
