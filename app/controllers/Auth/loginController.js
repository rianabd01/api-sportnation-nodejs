const { PrismaClient } = require('@prisma/client');
const { jwtSecret, cryptoKey } = require('../../config/app.conf');
const jwt = require('jsonwebtoken');
const argon2 = require('argon2');

const prisma = new PrismaClient();

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const customer = await prisma.customer.findUnique({
      where: {
        username: username,
      },
    });

    if (!customer) {
      return res.status(404).send('username not found');
    }

    const isPasswordValid = await argon2.verify(customer.password, password, {
      secret: Buffer.from(String(cryptoKey)),
    });

    if (!isPasswordValid) {
      return res.status(401).send('Invalid password');
    }

    const token = jwt.sign({ customerId: customer.customerId }, jwtSecret, {
      expiresIn: '30d',
    });

    return res.status(200).json({
      token,
      customerId: customer.customerId,
      fullName: customer.fullName,
    });
  } catch (error) {
    return res.status(500).send('Internal server error');
  }
};

module.exports = login;
