const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const morgan = require('morgan');
const authRoutes = require('./routes/auth');
const purchaseRoutes = require('./routes/purchase');
const transferRoutes = require('./routes/transfer');
const assignmentRoutes = require('./routes/assignment');
const logger = require('./middleware/logger');
const logRoutes = require('./routes/logs');
const { auth } = require('./middleware/authMiddleware');
const movementRoutes = require('./routes/movements');

require('dotenv').config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/auth', authRoutes);
app.use('/api/purchase', purchaseRoutes);
app.use('/api/transfer', transferRoutes);
app.use('/api/assignment', assignmentRoutes);
app.use('/api/movements', movementRoutes);
//app.use(auth);     // all routes after this will need token
app.use(logger); // audit logger for authenticated actions
app.use('/api/logs', logRoutes);

// TODO: Add routes

app.get('/', (req, res) => {
  res.send('API running...');
});

app.get('/api/debug/users', async (req, res) => {
  try {
    const User = require('./server/models/User');
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
