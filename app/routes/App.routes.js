const express = require('express');
const getProducts = require('../controllers/productController');
const login = require('../controllers/Auth/loginController');
const authMiddleware = require('../middleware/authMiddleware');
const cart = require('../controllers/cartController');
const register = require('../controllers/Auth/registerController');
const otp = require('../controllers/Auth/otpController');
const router = express.Router();

router.get('/products', getProducts);
router.post('/register', express.json(), register);
router.post('/otp', express.json(), otp);
router.post('/login', express.json(), login);
router.post('/cart/:productId', authMiddleware, cart);

module.exports = router;
