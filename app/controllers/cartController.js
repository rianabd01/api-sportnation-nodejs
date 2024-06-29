const { PrismaClient } = require('@prisma/client');
// const authMiddleware = require('../middleware/authMiddleware');

const prisma = new PrismaClient();

const cart = async (req, res) => {
  // Take customerId from authMiddleware
  const { customerId } = req.user;

  const { productId } = req.params;
  try {
    const addCart = await prisma.cart.create({
      data: {
        customerId: customerId,
        productId: Number(productId),
        quantity: 1,
      },
    });

    res.status(201).json({ data: addCart });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = cart;
