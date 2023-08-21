const express = require('express');
const router = express.Router();
const {
  getAllPromoCodes,
  createPromoCode,
  deletePromoCode,
  updatePromoCode,
  checkPromoCode,
} = require('../../controllers/Promo.controller');
const adminAuthorization = require('../../middleware/adminAuthorization.middleware');

router.use(adminAuthorization);

router.get('/', getAllPromoCodes);
router.post('/', createPromoCode);
router.delete('/:id', deletePromoCode);
router.put('/:id', updatePromoCode);
router.post('/check', checkPromoCode);

module.exports = router;
