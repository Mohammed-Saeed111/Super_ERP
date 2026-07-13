// Load env FIRST
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');

// DB
const connectDB = require('./src/config/db');

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Static folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const authRoutes = require('./src/routes/authRoutes');
const webhookRoutes = require('./src/routes/webhookRoutes');
const leadRoutes = require('./src/routes/leadRoutes');
const ticketRoutes = require('./src/routes/ticketRoutes');
const analyticsRoutes = require('./src/routes/analyticsRoutes');
const campaignRoutes = require('./src/routes/campaignRoutes');
const publicRoutes = require('./src/routes/publicRoutes');
const offerRoutes = require('./src/routes/offerRoutes');
const hrmRoutes = require('./src/routes/hrmRoutes');
const payrollRoutes = require('./src/routes/payrollRoutes');
const essRoutes = require('./src/routes/essRoutes');
const gatewayRoutes = require('./src/routes/gatewayRoutes');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/webhooks', webhookRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/public', publicRoutes);
app.use('/api/offers', offerRoutes);
app.use('/api/hrm', hrmRoutes);
app.use('/api/payroll', payrollRoutes);
app.use('/api/ess', essRoutes);
app.use('/api/gateway', gatewayRoutes);

// Base route
app.get('/', (req, res) => {
  res.send('CRM Backend API is running...');
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

  // Helpers
  const { updateExpiredCampaigns } = require('./src/helpers/campaignHelper');

  updateExpiredCampaigns();
  setInterval(updateExpiredCampaigns, 5 * 60 * 1000);
});