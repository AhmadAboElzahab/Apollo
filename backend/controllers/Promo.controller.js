const Promo = require('../models/Promo.model');
const couponCode = require('coupon-code');

async function getAllPromoCodes(req, res) {
  try {
    const promoCodes = await Promo.find();
    res.status(200).json(promoCodes);
  } catch (err) {
    res.status(500).json({ error: err });
  }
}

async function createPromoCode(req, res) {
  try {
    const { value } = req.body;
    if (value === '') return res.status(400).json({ error: 'value Should not be empty' });

    const promo = new Promo({
      code: couponCode.generate({ parts: 1 }),
      value,
    });

    await promo.save();

    res.status(200).json({ data: promo });
  } catch (err) {
    res.status(500).json({ error: err });
  }
}

async function deletePromoCode(req, res) {
  try {
    const promoId = req.params.id;
    const deletedPromo = await Promo.findByIdAndDelete(promoId);

    if (!deletedPromo) {
      return res.status(404).json({ error: 'Promo not found' });
    }

    res.status(200).json({ message: 'Promo Code Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err });
  }
}

async function updatePromoCode(req, res) {
  try {
    const promoId = req.params.id;
    const { value } = req.body;

    if (value === '') return res.status(400).json({ error: 'value Should not be empty' });

    const updatedPromo = await Promo.findByIdAndUpdate(promoId, { value }, { new: true });

    if (!updatedPromo) {
      return res.status(404).json({ error: 'Promo not found' });
    }

    res.status(200).json({ data: updatedPromo });
  } catch (err) {
    res.status(500).json({ error: err });
  }
}

async function checkPromoCode(req, res) {
  try {
    const { amount, code } = req.body;
    const findCode = await Promo.findOne({ code });

    if (findCode) {
      const newAmount = amount - (findCode.value * amount) / 100;
      res.json({ price: newAmount });
    } else {
      res.status(404).json({ error: 'Promo code not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  getAllPromoCodes,
  createPromoCode,
  deletePromoCode,
  updatePromoCode,
  checkPromoCode,
};
