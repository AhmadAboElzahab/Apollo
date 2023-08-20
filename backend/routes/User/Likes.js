const express = require('express');
const userAuthorization = require('../../middleware/userAuthorization.middleware');
const router = express.Router();
const mongoose = require('mongoose');
const Artwork = require('../../models/Artwork.model');

router.put('/like', async (req, res) => {
  const { postId, UserId } = req.body;

  try {
    const artwork = await Artwork.findByIdAndUpdate(
      postId,
      {
        $push: { likes: UserId },
      },
      {
        new: true,
      },
    ).exec();

    if (!artwork) {
      return res.status(404).json({ error: 'Artwork not found' });
    }

    res.json(artwork);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.put('/unlike', async (req, res) => {
  const { postId, UserId } = req.body;

  try {
    const artwork = await Artwork.findByIdAndUpdate(
      postId,
      {
        $pull: { likes: UserId },
      },
      {
        new: true,
      },
    ).exec();

    if (!artwork) {
      return res.status(404).json({ error: 'Artwork not found' });
    }

    res.json(artwork);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
