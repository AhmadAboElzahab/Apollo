const express = require('express');
const router = express.Router();
const { getCategories, getProductsByCategory } = require('../controllers/Category.controller');
const { getArtworkById } = require('../controllers/Artwork.controller');

router.get('/categories', getCategories);

router.get('/:type/:title', getProductsByCategory);

router.get('getArtwork/:id', getArtworkById);

module.exports = router;
