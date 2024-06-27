require('dotenv').config();
const express = require('express');
const app = express();
const appConfig = require('./app/config/app.conf');

// Import routes

const appRoutes = require('./app/routes/App.routes');
// const authRoutes = require('./app/routes/Auth.routes');
// const dashboardRoutes = require('./app/routes/Dashboard.routes');

// Use routes
app.use('/', appRoutes);
// app.use('/auth', authRoutes);
// app.use('/dashboard', dashboardRoutes);

const port = appConfig.port;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
