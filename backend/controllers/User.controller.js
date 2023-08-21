const Artwork = require('../models/Artwork.model');
const Audio = require('../models/Audio.model');
const Lyrics = require('../models/Lyrics.model');

const likePost = async (req, res) => {
  const userId = req.userId;
  const { postId, type } = req.body;

  try {
    let record;
    switch (type) {
      case 'Artwork':
        record = await Artwork.findByIdAndUpdate(
          postId,
          {
            $push: { likes: userId },
          },
          {
            new: true,
          },
        ).exec();
        break;

      case 'Audio':
        record = await Audio.findByIdAndUpdate(
          postId,
          {
            $push: { likes: userId },
          },
          {
            new: true,
          },
        ).exec();
        break;

      case 'Lyrics':
        record = await Lyrics.findByIdAndUpdate(
          postId,
          {
            $push: { likes: userId },
          },
          {
            new: true,
          },
        ).exec();
        break;

      default:
        return res.status(400).json({ error: 'Invalid post type' });
    }

    if (!record) {
      return res.status(404).json({ error: 'Record not found' });
    }

    res.json({ message: `${type} liked successfully` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const unlikePost = async (req, res) => {
  const userId = req.userId;
  const { postId, type } = req.body;

  try {
    let record;
    switch (type) {
      case 'Artwork':
        record = await Artwork.findByIdAndUpdate(
          postId,
          {
            $pull: { likes: userId },
          },
          {
            new: true,
          },
        ).exec();
        break;

      case 'Audio':
        record = await Audio.findByIdAndUpdate(
          postId,
          {
            $pull: { likes: userId },
          },
          {
            new: true,
          },
        ).exec();
        break;

      case 'Lyrics':
        record = await Lyrics.findByIdAndUpdate(
            postId,
            {
              $pull: { likes: userId },
            },
            {
              new: true,
            },
          ).exec();
          break;

      default:
        return res.status(400).json({ error: 'Invalid post type' });
    }

    if (!record) {
      return res.status(404).json({ error: 'Record not found' });
    }

    res.json({ message: `${type} liked successfully` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports = {
  likePost,
  unlikePost,
};
