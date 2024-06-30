const { PrismaClient } = require('@prisma/client');
const argon2 = require('argon2');
const { cryptoKey } = require('../../config/app.conf');

const prisma = new PrismaClient();

const otp = async (req, res) => {
  const { email, otpVal } = req.body;
  try {
    // Validation if OTP not found
    const findOtpVerify = await prisma.otp.findMany({
      where: {
        email,
      },
      orderBy: {
        otpId: 'desc',
      },
      take: 1,
    });
    const otpVerify = findOtpVerify[0];

    if (!otpVerify) {
      res.status(404).send('OTP not found');
    }

    // Validation 5 mintes
    const dateDifference =
      new Date() - new Date(otpVerify.createdAt) >= 5 * 60 * 1000;

    if (dateDifference) {
      res.status(500).send('OTP expired');
    }
    // const date = new Date(now())

    // if()

    // Validation if OTP not match
    const isOtpValid = await argon2.verify(otpVerify.otp, otpVal, {
      secret: Buffer.from(String(cryptoKey)),
    });

    if (isOtpValid) {
      const userVerify = await prisma.customer.update({
        where: {
          email,
        },
        data: {
          isActive: 1,
        },
      });

      // Validation if update customer table is failed
      if (!userVerify) {
        throw new Error('OTP verification failed');
      }

      const destroyOtp = await prisma.otp.delete({
        where: {
          otpId: otpVerify.otpId,
        },
      });

      // Validation if delete OTP failed
      if (!destroyOtp) {
        throw new Error('OTP destroy failed');
      }

      res.status(201).send('OTP verification success');
    } else {
      res.status(500).send('Invalid OTP');
    }
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
};

module.exports = otp;
