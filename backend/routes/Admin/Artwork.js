const express = require('express');
const router = express.Router();
const upload = require('../../middleware/Artwork.middleware');
const {
  createArtwork,
  deleteArtwork,
  getArtworks,
  updateArtwork,
} = require('../../controllers/Artwork.controller');
const adminAuthorization = require('../../middleware/adminAuthorization.middleware');

router.use(adminAuthorization);

router.post('/', upload.single('image'), createArtwork);
router.delete('/:id', deleteArtwork);
router.get('/', getArtworks);
router.patch('/:id', updateArtwork);

module.exports = router;
