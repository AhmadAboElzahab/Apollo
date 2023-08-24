const express = require('express');
const router = express.Router();
const { changePassword } = require('../../controllers/Auth.controller');

const adminAuthorization = require('../../middleware/adminAuthorization.middleware');

router.use(adminAuthorization);

router.post('/changePassword', changePassword);

module.exports = router;
