const express = require('express');
const router = express.Router();
const {
  createAudio,
  deleteAudio,
  updateAudio,
  getAllAudio,
} = require('../../controllers/Audio.controller');
const { uploadMiddleware } = require('../../middleware/Audio.middleware');
const adminAuthorization = require('../../middleware/adminAuthorization.middleware');

router.use(adminAuthorization);

router.post('/', uploadMiddleware, createAudio);
router.delete('/:id', deleteAudio);
router.patch('/:id', updateAudio);
router.get('/', getAllAudio);

module.exports = router;
