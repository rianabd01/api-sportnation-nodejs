const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../config/app.conf');

const prisma = new PrismaClient();

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const customer = await prisma.customer.findFirst({
      where: {
        username: username,
      },
    });

    if (customer && customer.password === password) {
      const token = jwt.sign({ customerId: customer.customerId }, jwtSecret, {
        expiresIn: '30d',
      });
      res.status(201).json({
        token,
        customerId: customer.customerId,
        fullName: customer.fullName,
      });
    } else {
      res.status(401).send('Invalid username or password');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
};

module.exports = login;
