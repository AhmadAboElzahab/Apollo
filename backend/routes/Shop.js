const express = require('express');
const router = express.Router();
const { getCategories, getProductsByCategory } = require('../controllers/Category.controller');
const { getArtworkById } = require('../controllers/Artwork.controller');
const { getAudioById } = require('../controllers/Audio.controller');

router.get('/categories', getCategories);

router.get('/getProducts/:type/:title', getProductsByCategory);

router.get('/artwork/:id', getArtworkById);
router.get('/audio/:id', getAudioById);

module.exports = router;
