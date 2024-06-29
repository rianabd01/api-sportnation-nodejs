const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany();

    res.status(201).json({ data: products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getProducts;
