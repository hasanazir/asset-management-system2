const Log = require('../models/Log');

const logger = async (req, res, next) => {
  if (req.user) {
    await Log.create({
      userId: req.user.id,
      action: `${req.method} ${req.originalUrl}`,
      endpoint: req.originalUrl,
      method: req.method,
      body: req.body,
      timestamp: new Date()
    });
  }
  next();
};

module.exports = logger;
