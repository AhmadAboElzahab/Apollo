const Payment = require('../models/Payment.model');

async function addPayment(req, res) {
  const userId = req.userId;
  try {
    const { productsID, totalPrice } = req.body;
    const newPayment = new Payment({ BuyerID: userId, productsID, totalPrice });
    const savedPayment = await newPayment.save();
    res.json(savedPayment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create a add Payment.' });
  }
}

module.exports = {
  addPayment,
};
