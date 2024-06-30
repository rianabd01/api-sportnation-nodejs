const { PrismaClient } = require('@prisma/client');
const argon2 = require('argon2');
const { cryptoKey } = require('../../config/app.conf');

const prisma = new PrismaClient();

const register = async (req, res) => {
  const { fullName, email, phoneNumber, username, password } = req.body;

  try {
    const hashedPassword = await argon2.hash(String(password), {
      secret: Buffer.from(String(cryptoKey)),
    });

    console.log('register', hashedPassword);

    const isUsernameExist = await prisma.customer.findUnique({
      where: {
        username,
      },
    });

    if (isUsernameExist) {
      return res.status(409).send('Username already exists');
    }

    const isEmailExist = await prisma.customer.findUnique({
      where: {
        email,
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
        password: String(hashedPassword),
      },
    });

    const otp = '123456';
    const newOtp = await prisma.otp.create({
      data: {
        email,
        otp,
      },
    });

    res
      .status(201)
      .send('Registration success, please verify the otp and check your email');
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
};

module.exports = register;
