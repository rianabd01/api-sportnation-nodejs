const { PrismaClient } = require('@prisma/client');
const SHA256 = require('crypto-js/sha256');
const { cryptoKey } = require('../../config/app.conf');

const prisma = new PrismaClient();

const register = async (req, res) => {
  const { fullName, email, phoneNumber, username, password } = req.body;

  try {
    const hashedPassword = SHA256(cryptoKey + password).toString();

    const isUsernameExist = await prisma.customer.findUnique({
      where: {
        username: username,
      },
    });

    if (isUsernameExist) {
      return res.status(409).send('Username already exists');
    }

    const isEmailExist = await prisma.customer.findUnique({
      where: {
        email: email,
      },
    });

    if (isEmailExist) {
      return res.status(409).send('Email already exists');
    }

    const newCustomer = await prisma.customer.create({
      data: {
        fullName,
        email,
        phoneNumber,
        username,
        password: hashedPassword,
      },
    });

    res.status(201).json({ newCustomer });
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
};

module.exports = register;
