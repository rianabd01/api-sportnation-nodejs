const express = require('express');
const getProducts = require('../controllers/productController');
const login = require('../controllers/Auth/loginController');
const authMiddleware = require('../middleware/authMiddleware');
const cart = require('../controllers/cartController');
const register = require('../controllers/Auth/registerController');
const otp = require('../controllers/Auth/otpController');
const cartItems = require('../controllers/cartItemsController');
const order = require('../controllers/orderController');
const router = express.Router();

router.get('/products', getProducts);
router.post('/register', express.json(), register);
router.post('/otp', express.json(), otp);
router.post('/login', express.json(), login);
// add to cart
router.post('/cart/:productId', authMiddleware, cart);
// get cartItem
router.get('/cart', authMiddleware, cartItems);
router.post('/order', authMiddleware, express.json(), order);

module.exports = router;
