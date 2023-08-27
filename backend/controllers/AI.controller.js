const Payment = require('../models/Payment.model');

const getArray = async (req, res) => {
  try {
    const payments = await Payment.find().lean();

    const productCounts = {};
    const productInfoArray = [];

    payments.forEach((payment) => {
      payment.products.forEach((product) => {
        const productId = product.id;
        productCounts[productId] = (productCounts[productId] || 0) + 1;
      });

      const purchaseDate = payment.createdAt;
      payment.products.forEach((product) => {
        const productId = product.id;
        const productCount = productCounts[productId];
        productInfoArray.push({
          productId,
          productCount,
          purchaseDate,
        });
      });
    });

    res.json(productInfoArray);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getArray };
