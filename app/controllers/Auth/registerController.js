const { PrismaClient } = require('@prisma/client');
const argon2 = require('argon2');
const { nanoid } = require('nanoid');
const { cryptoKey } = require('../../config/app.conf');
const emailSender = require('../../utils/emailSender');

const prisma = new PrismaClient();

const register = async (req, res) => {
  const { fullName, email, phoneNumber, username, password } = req.body;

  try {
    // argon2 password hash
    const hashedPassword = await argon2.hash(String(password), {
      secret: Buffer.from(String(cryptoKey)),
    });

    const isUsernameExist = await prisma.customer.findUnique({
      where: {
        username,
      },
    });

    if (isUsernameExist) {
      return res.status(409).send('username already exists');
    }

    const isEmailExist = await prisma.customer.findUnique({
      where: {
        email,
      },
    });

    if (isEmailExist) {
      return res.status(409).send('email already exists');
    }

    // Create data to customer table
    const newCustomer = await prisma.customer.create({
      data: {
        fullName,
        email,
        phoneNumber,
        username,
        password: String(hashedPassword),
      },
    });

    if (!newCustomer) {
      throw new Error('create account failed');
    }

    // Generate token
    const verifyToken = nanoid(20);
    // argon2 token hash
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

    const sendEmail = await emailSender({
      email,
      title: 'SportNation Email Verification',
      fullName,
      link: verifyLink,
    });

    if (!sendEmail) {
      throw new Error('send email failed');
    }

    return res
      .status(201)
      .send('Registration success, please verify the otp and check your email');
  } catch (error) {
    return res.status(500).send(error.message || 'Internal server error');
  }
};

module.exports = register;
