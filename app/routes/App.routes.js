const express = require('express');
const getProducts = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');
const cart = require('../controllers/cartController');

const cartItems = require('../controllers/cartItemsController');
const router = express.Router();

// get products list
router.get('/products', getProducts);
// add to cart
router.post('/cart/:id', authMiddleware, cart);
// get cartItem
router.get('/cart', authMiddleware, cartItems);

module.exports = router;
