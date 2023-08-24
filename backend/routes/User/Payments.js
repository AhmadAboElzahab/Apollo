const express = require('express');
const userAuthorization = require('../../middleware/userAuthorization.middleware');
const { addPayment, getPurchaseHistory } = require('../../controllers/Payment.controller');
const router = express.Router();

router.use(userAuthorization);

router.post('/', addPayment);
router.get('/History', getPurchaseHistory);

module.exports = router;
