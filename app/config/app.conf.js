module.exports = {
  port: process.env.APP_PORT || 5000,
  env: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret_key',
  logLevel: process.env.LOG_LEVEL || 'info',
  appName: 'SportNation',
  appDescription: 'Buy used sports equipment',
};
