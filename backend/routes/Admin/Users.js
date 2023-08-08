const express = require('express');
const adminAuthorization = require('../../middleware/adminAuthorization.middleware');
const router = express.Router();

router.get('/', adminAuthorization, async (req, res) => {});

module.exports = router;
