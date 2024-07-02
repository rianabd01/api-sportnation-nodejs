const express = require('express');
const login = require('../controllers/Auth/loginController');
const register = require('../controllers/Auth/registerController');
const otp = require('../controllers/Auth/otpController');

const router = express.Router();

router.post('/register', express.json(), register);
router.post('/otp', express.json(), otp);
router.post('/login', express.json(), login);

module.exports = router;
