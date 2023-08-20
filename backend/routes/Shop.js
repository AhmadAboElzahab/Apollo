const express = require('express');
const router = express.Router();
const { getCategories, getProductsByCategory } = require('../controllers/Category.controller');

router.get('/categories', getCategories);

router.get('/:type/:title', getProductsByCategory);

module.exports = router;
