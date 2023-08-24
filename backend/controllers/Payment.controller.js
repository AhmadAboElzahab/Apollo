const Lyrics = require('../models/Lyrics.model');

async function createLyric(req, res) {
  try {
    const { title, lyrics, category, price } = req.body;
    const newLyric = new Lyrics({ title, lyrics, category, price });
    const savedLyric = await newLyric.save();
    res.json(savedLyric);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create a new lyric.' });
  }
}


module.exports = {
  createLyric,
  getAllLyrics,
  getLyricById,
  updateLyricById,
  deleteLyricById,
};
