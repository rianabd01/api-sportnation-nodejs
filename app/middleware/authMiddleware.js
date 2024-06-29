const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/app.conf');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization').split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access Denied' });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).json({ message: 'Invalid Token' });
  }
};

module.exports = authMiddleware;
