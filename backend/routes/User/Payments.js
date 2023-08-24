const express = require('express');
const userAuthorization = require('../../middleware/userAuthorization.middleware');
const { addPayment } = require('../../controllers/Payment.controller');
const router = express.Router();

router.use(userAuthorization);

router.post('/', addPayment);

module.exports = router;
