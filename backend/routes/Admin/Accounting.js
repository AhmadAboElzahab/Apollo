const express = require('express');
const router = express.Router();
const { getPayments } = require('../../controllers/Payment.controller');

const adminAuthorization = require('../../middleware/adminAuthorization.middleware');

router.use(adminAuthorization);

router.get('/', getPayments);

module.exports = router;
