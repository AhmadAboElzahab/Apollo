const express = require('express');
const router = express.Router();
const { getCategories } = require('../controllers/Category.controller');

router.get('/categories', getCategories);

module.exports = router;
