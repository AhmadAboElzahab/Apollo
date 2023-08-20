const express = require('express');
const {
  getAllPromoCodes,
  createPromoCode,
  deletePromoCode,
  updatePromoCode,
  checkPromoCode,
} = require('../../controllers/Promo.controller'); // Adjust the path as needed

const router = express.Router();

router.get('/', getAllPromoCodes);
router.post('/', createPromoCode);
router.delete('/:id', deletePromoCode);
router.put('/:id', updatePromoCode);
router.post('/check', checkPromoCode);

module.exports = router;
