const express = require('express');
const router = express.Router();
const { getCategories, getProductsByCategory } = require('../controllers/Category.controller');
const { getArtworkById, getArtworks } = require('../controllers/Artwork.controller');
const { getAudioById, getAllAudio } = require('../controllers/Audio.controller');
const { getLyricById, getAllLyrics } = require('../controllers/Lyrics.controller');

router.get('/categories', getCategories);

router.get('/getProducts/:type/:title', getProductsByCategory);

router.get('/artwork/:id', getArtworkById);
router.get('/audio/:id', getAudioById);
router.get('/lyric/:id', getLyricById);

router.get('/artwork', getArtworks);
router.get('/audio', getAllAudio);
router.get('/lyrics', getAllLyrics);

module.exports = router;
