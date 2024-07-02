const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const order = require('../controllers/orderController');

const router = express.Router();

router.post('/', authMiddleware, express.json(), order);

module.exports = router;
