const express = require('express');
const router = express.Router();
const adminAuthorization = require('../../middleware/adminAuthorization.middleware');

router.use(adminAuthorization)

router.get('/',  async (req, res) => {});

module.exports = router;
