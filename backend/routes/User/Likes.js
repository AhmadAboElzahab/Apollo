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
    const artwork = await Artwork.findById(postId); // Use ArtworkId directly

    if (!artwork) {
      return res.status(404).json({ error: 'Artwork not found' });
    }

    // Perform unlike operation, e.g., removing the UserId from likes array
    // You might want to implement this part according to your database structure

    // Assuming you have a method to perform the unlike operation
    // Example: artwork.unlike(UserId);

    // Save the updated artwork after performing the unlike operation
    // Example: await artwork.save();

    res.json(artwork);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/unlike', async (req, res) => {
  const { ArtworkId, UserId } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(ArtworkId) || !mongoose.Types.ObjectId.isValid(UserId)) {
      return res.status(400).json({ error: 'Invalid IDs provided' });
    }

    const artwork = await Artwork.findByIdAndUpdate(
      ArtworkId,
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
