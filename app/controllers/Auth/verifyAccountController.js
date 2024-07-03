const { PrismaClient } = require('@prisma/client');
const argon2 = require('argon2');
const { cryptoKey } = require('../../config/app.conf');

const prisma = new PrismaClient();

const verifyAccount = async (req, res) => {
  const { verifyToken, userEmail } = req.query;

  try {
    if (!verifyToken || !userEmail) {
      res.status(404).send('data not found');
    }
    // Validation if OTP not found
    const findToken = await prisma.verify_account.findMany({
      where: {
        email: userEmail,
      },
      orderBy: {
        verifyId: 'desc',
      },
      take: 1,
    });

    const verifyData = findToken[0];

    if (!verifyData) {
      res.status(404).send('data not found');
    }

    // Validation 5 minutes
    const dateDifference =
      new Date() - new Date(verifyData.createdAt) >= 5 * 60 * 1000;

    if (dateDifference) {
      throw new Error('Verify link is expired');
    }

    // Validation if OTP not match
    const isTokenValid = await argon2.verify(verifyData.token, verifyToken, {
      secret: Buffer.from(String(cryptoKey)),
    });

    if (!isTokenValid) {
      res.status(401).send('Wrong token');
    }
    if (isTokenValid) {
      const userVerify = await prisma.customer.update({
        where: {
          email: userEmail,
        },
        data: {
          isActive: 1,
        },
      });

      // Validation if update customer table is failed
      if (!userVerify) {
        throw new Error('verification failed');
      }

      const destroyToken = await prisma.verify_account.delete({
        where: {
          verifyId: verifyData.verifyId,
        },
      });

      res.status(201).send('OTP verification success');
    } else {
      res.status(500).send('Invalid OTP');
    }
  } catch (error) {
    console.log(verifyToken, userEmail);
    res.status(500).send(error || 'Internal server error');
  } finally {
    await prisma.$disconnect();
  }
};

module.exports = verifyAccount;
