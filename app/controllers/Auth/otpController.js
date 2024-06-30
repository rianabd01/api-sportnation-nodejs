const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const otp = async (req, res) => {
  const { email, otpVal } = req.body;
  try {
    const otpVerify = await prisma.otp.findUnique({
      where: {
        email,
      },
    });

    // Validation if OTP not found
    if (!otpVerify) {
      res.status(404).send('OTP not found');
    }

    // Validation if OTP not match
    if (!(otpVerify.otp === otpVal)) {
      res.status(500).send('Invalid OTP');
    }

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
        email,
      },
    });

    // Validation if delete OTP failed
    if (!destroyOtp) {
      throw new Error('OTP destroy failed');
    }

    res.status(201).send('OTP verification success');
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
};

module.exports = otp;
