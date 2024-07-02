const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getProducts = async (req, res) => {
  const { sortBy, range } = req.query;
  try {
    const queryOptions = {};

    if (sortBy === 'cheap') {
      queryOptions.orderBy = { price: 'asc' };
    }

    if (sortBy === 'expensive') {
      queryOptions.orderBy = { price: 'desc' };
    }

    if (range) {
      const bottomPrice = range.split('-')[0];
      const topPrice = range.split('-')[1];

      queryOptions.where = {
        price: {
          gte: Number(bottomPrice),
          lte: Number(topPrice),
        },
      };
    }

    const products = await prisma.product.findMany(queryOptions);
    res.status(201).json({ data: products });
  } catch (error) {
    res.status(500).send('Internal server error');
  }
};

module.exports = getProducts;
