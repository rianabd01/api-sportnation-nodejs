const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../config/app.conf');
const SHA256 = require('crypto-js/sha256');

const { cryptoKey } = require('../../config/app.conf');
const prisma = new PrismaClient();

const login = async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = SHA256(cryptoKey + password).toString();

  try {
    const customer = await prisma.customer.findUnique({
      where: {
        username: username,
      },
    });

    if (!customer) {
      res.status(401).send('Username not registered');
    }

    if (customer.password === hashedPassword) {
      const token = jwt.sign({ customerId: customer.customerId }, jwtSecret, {
        expiresIn: '30d',
      });
      res.status(201).json({
        token,
        customerId: customer.customerId,
        fullName: customer.fullName,
      });
    } else {
      res.status(401).send('Invalid password');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
};

module.exports = login;
