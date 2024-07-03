const express = require('express');
const login = require('../controllers/Auth/loginController');
const register = require('../controllers/Auth/registerController');
const verifyAccount = require('../controllers/Auth/verifyAccountController');

const router = express.Router();

router.post('/register', express.json(), register);
router.post('/verify-account', verifyAccount);
router.post('/login', express.json(), login);

module.exports = router;
