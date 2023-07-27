const express = require('express');
const adminAuthorization = require('../../middleware/adminAuthorization.middleware');
const router = express.Router();
const Lyrics = require('../../models/Lyrics.model');

router.post('/', async (req, res) => {
    try {
        const { title, lyrics, category, price } = req.body;
        const newLyric = new Lyrics({ title, lyrics, category, price });
        const savedLyric = await newLyric.save();
        res.json(savedLyric);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create a new lyric.' });
    }
});


router.get('/', async (req, res) => {
    try {
        const allLyrics = await Lyrics.find();
        res.json(allLyrics);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch lyrics.' });
    }
});


router.get('/:id', async (req, res) => {
    try {
        const lyric = await Lyrics.findById(req.params.id);
        if (!lyric) {
            return res.status(404).json({ error: 'Lyric not found.' });
        }
        res.json(lyric);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch the lyric.' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { title, lyrics, category, price } = req.body;
        const updatedLyric = await Lyrics.findByIdAndUpdate(
            req.params.id,
            { title, lyrics, category, price },
            { new: true } // Return the updated document
        );
        if (!updatedLyric) {
            return res.status(404).json({ error: 'Lyric not found.' });
        }
        res.json(updatedLyric);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update the lyric.' });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const deletedLyric = await Lyrics.findByIdAndRemove(req.params.id);
        if (!deletedLyric) {
            return res.status(404).json({ error: 'Lyric not found.' });
        }
        res.json({ message: 'Lyric deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete the lyric.' });
    }
});

module.exports = router;
