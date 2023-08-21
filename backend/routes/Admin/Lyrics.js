const express = require('express');
const router = express.Router();

const {
  createLyric,
  getAllLyrics,
  getLyricById,
  updateLyricById,
  deleteLyricById,
} = require('../../controllers/Lyrics.controller');
const adminAuthorization = require('../../middleware/adminAuthorization.middleware');

router.use(adminAuthorization);

router.post('/', adminAuthorization, createLyric);
router.get('/', getAllLyrics);
router.get('/:id', getLyricById);
router.patch('/:id', adminAuthorization, updateLyricById);
router.delete('/:id', adminAuthorization, deleteLyricById);

module.exports = router;
