const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const cartItems = async (req, res) => {
  try {
    const { customerId } = req.user;

    const getCartItems = await prisma.cart.findMany({
      where: {
        customerId,
      },
      select: {
        cartId: true,
        quantity: true,
        product: {
          select: {
            productId: true,
            name: true,
            description: true,
            price: true,
            stockQuantity: true,
          },
        },
      },
    });

    res.status(201).json({ data: getCartItems });
  } catch (error) {
    console.log(customerId);
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = cartItems;
