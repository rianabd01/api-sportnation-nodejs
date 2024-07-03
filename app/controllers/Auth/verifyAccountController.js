const { PrismaClient } = require('@prisma/client');
const argon2 = require('argon2');
const { cryptoKey } = require('../../config/app.conf');

const prisma = new PrismaClient();

const verifyAccount = async (req, res) => {
  const { verifyToken, userEmail } = req.query;

  try {
    if (!verifyToken || !userEmail) {
      return res.status(404).send('data not found');
    }
    // Validation if token not found
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
      return res.status(404).send('data not found');
    }

    // Validation link max 5 minutes
    const isFiveMinutes =
      new Date() - new Date(verifyData.createdAt) <= 5 * 60 * 1000;

    if (!isFiveMinutes) {
      return res.status(401).send('link is expired');
    }

    // Validation if token not match
    const isTokenValid = await argon2.verify(verifyData.token, verifyToken, {
      secret: Buffer.from(String(cryptoKey)),
    });

    if (!isTokenValid) {
      return res.status(401).send('wrong link');
    }

    // Update account status
    const userVerify = await prisma.customer.update({
      where: {
        email: userEmail,
      },
      data: {
        isActive: 1,
      },
    });

    // Validation if update account failed
    if (!userVerify) {
      throw new Error('verification failed');
    }

    // remove varified token
    const destroyToken = await prisma.verify_account.delete({
      where: {
        verifyId: verifyData.verifyId,
      },
    });

    return res.status(200).send('email verification success');
  } catch (error) {
    return res.status(500).send(error.message || 'Internal server error');
  } finally {
    await prisma.$disconnect();
  }
};

module.exports = verifyAccount;
