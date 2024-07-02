const { PrismaClient } = require('@prisma/client');
// const authMiddleware = require('../middleware/authMiddleware');

const prisma = new PrismaClient();

const cart = async (req, res) => {
  // Take customerId from authMiddleware
  const { customerId } = req.user;

  const { id } = req.params;
  const productId = Number(id);
  try {
    const checkProduct = await prisma.product.findUnique({
      where: {
        productId,
      },
    });

    if (!checkProduct) {
      throw new Error('product not found');
    }

    const checkProductExist = await prisma.cart.findMany({
      where: {
        customerId,
        productId: productId,
      },
    });

    if (checkProduct.stockQuantity - 1 <= 0) {
      res.status(400).send('product is out of stock');
    }

    if (checkProductExist.length > 0) {
      const existingCartItem = checkProductExist[0];
      const addQuantity = await prisma.cart.update({
        where: {
          cartId: existingCartItem.cartId,
        },
        data: {
          quantity: existingCartItem.quantity + 1,
        },
      });
    } else {
      const addCart = await prisma.cart.create({
        data: {
          customerId: customerId,
          productId: productId,
          quantity: 1,
        },
      });
    }
    res.status(201).send('success add product to cart');
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
};

module.exports = cart;
