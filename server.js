require('dotenv').config();
const express = require('express');
const app = express();
const appConfig = require('./app/config/app.conf');
const helmet = require('helmet');
const ratelimiter = require('express-rate-limit');

const limiter = ratelimiter({
  windowMs: 60 * 1000 * 15, // 15 minute
  max: 100, // 100 request maximal
  message: 'Youe reach limit request API',
});

// Middleware
app.use(limiter);
app.use(helmet());

// Import routes
const appRoutes = require('./app/routes/App.routes');
const authRoutes = require('./app/routes/Auth.routes');
const orderRoutes = require('./app/routes/Order.routes');

// Use routes
app.use('/', appRoutes);
app.use('/auth', authRoutes);
app.use('/order', orderRoutes);

const port = appConfig.port;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
