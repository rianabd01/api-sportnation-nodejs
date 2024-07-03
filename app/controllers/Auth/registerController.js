const { PrismaClient } = require('@prisma/client');
const argon2 = require('argon2');
const { nanoid } = require('nanoid');
const { cryptoKey } = require('../../config/app.conf');
const emailSender = require('../../utils/emailSender');

const prisma = new PrismaClient();

const register = async (req, res) => {
  const { fullName, email, phoneNumber, username, password } = req.body;

  try {
    const hashedPassword = await argon2.hash(String(password), {
      secret: Buffer.from(String(cryptoKey)),
    });

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

    const verifyToken = nanoid(20);
    console.log(verifyToken);
    // const otp = Math.floor(Math.random() * 899999) + 100000;
    const hashToken = await argon2.hash(String(verifyToken), {
      secret: Buffer.from(String(cryptoKey)),
    });

    const newVerifyToken = await prisma.verify_account.create({
      data: {
        email,
        token: hashToken,
      },
    });

    const verifyLink = `http://localhost:3456/auth/verify-account?verifyToken=${verifyToken}&userEmail=${email}`;
    console.log(verifyLink);
    await emailSender({
      email,
      title: 'SportNation Email Verification',
      fullName,
      link: verifyLink,
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
