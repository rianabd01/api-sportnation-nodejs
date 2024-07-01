const { PrismaClient } = require('@prisma/client');
const { nanoid } = require('nanoid');

const prisma = new PrismaClient();

const order = async (req, res) => {
  const { customerId } = req.user;
  const { products, shipmentId, paymentMethod } = req.body;

  try {
    const id = nanoid();
    // const id = Date.now().toString();

    // Calculate total price
    let totalPrice = 0;
    for (const product of products) {
      const { productId, quantity } = product;
      const productDetails = await prisma.product.findUnique({
        where: { productId },
      });

      if (!productDetails) {
        return res
          .status(404)
          .json({ error: `Product with ID ${productId} not found` });
      }

      let subtotal = productDetails.price * quantity;
      const addOrderItem = await prisma.OrderItem.create({
        data: {
          productId: productId,
          quantity: quantity,
          subtotal,
          orderId: id,
        },
      });

      totalPrice += productDetails.price * quantity;
    }

    const shipment = await prisma.shipment.findFirst({
      where: {
        shipmentId,
      },
    });

    const addPayment = await prisma.payment.create({
      data: {
        paymentId: id,
        amount: totalPrice + shipment.price,
        paymentMethod,
        customerId,
      },
    });

    const addOrder = await prisma.Order.create({
      data: {
        orderId: id,
        totalPrice: totalPrice + shipment.price,
        customerId,
        paymentId: id,
        shipmentId: shipmentId,
      },
    });

    res.status(201).send('order succesfully');
  } catch (error) {
    console.log(error);
  }
};

module.exports = order;
