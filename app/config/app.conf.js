module.exports = {
  port: process.env.APP_PORT || 5000,
  env: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret_key',
  cryptoKey: process.env.CRYPTO_KEY || 'your_crypto_key',
  logLevel: process.env.LOG_LEVEL || 'info',
  emailService: process.env.EMAIL_SERVICE || 'email',
  emailPassword: process.env.EMAIL_PASS || 'pass',
  appName: 'SportNation',
  appDescription: 'Buy used sports equipment',
};
