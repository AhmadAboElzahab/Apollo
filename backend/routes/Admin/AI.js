const express = require('express');
const router = express.Router();
const adminAuthorization = require('../../middleware/adminAuthorization.middleware');
const { getArray } = require('../../controllers/AI.controller');

router.use(adminAuthorization);

router.get('/', getArray);

module.exports = router;
