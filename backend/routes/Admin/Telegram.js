const express = require('express');
const router = express.Router();
const {
  ShareArtwork,
  ShareAudio,
  ShareLyrics,
  SharePromo,
  GetLog,
  DeleteRecordFromLog,
} = require('../../controllers/Telegram.controller');

router.post('/ShareLyrics/:id', ShareLyrics);
router.post('/SharePromo/:id', SharePromo);
router.post('/shareArtwork/:id', ShareArtwork);
router.post('/shareAudio/:id', ShareAudio);
router.delete('/:id', DeleteRecordFromLog);
router.get('/', GetLog);

module.exports = router;
