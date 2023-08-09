const express = require('express');
const router = express.Router();
const Promo = require('../../models/Promo.model');
const Artwork = require('../../models/Artwork.model');
const Audios = require('../../models/Audio.model');
const fs = require('fs');
const path = require('path');

router.post('/SharePromo/:id', async (req, res) => {
  const _id = req.params.id;

  try {
    const getPromo = await Promo.findOne({ _id });

    if (!getPromo) {
      return res.status(400).json({ message: 'Promo not Found' });
    }

    const { code, value } = getPromo;

    const response = await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text: `A New Promo Code is Added: ${code}\nDon't miss ${value}% discount Chance`,
        }),
      },
    );

    if (response.ok) {
      res.status(200).json({ message: 'Done' });
    } else {
      res.status(500).json({ message: 'Error' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});
router.post('/shareartwork/:id', async (req, res) => {
  try {
    const _id = req.params.id;
    const getArtwork = await Artwork.findOne({ _id });
    if (!getArtwork) {
      return res.status(400).json({ message: 'Artwork not found' });
    }

    const { art } = getArtwork;
    const convertedImagePath = path.join(__dirname, '../../uploads/artworks/', art);

    fs.readFile(convertedImagePath, async (err, data) => {
      if (err) {
        console.error('Error reading image:', err);
        return res.status(500).json({ message: 'Error reading image' });
      }

      const imageBlob = new Blob([data], { type: 'image/jpeg' });

      const formData = new FormData();
      formData.append('chat_id', process.env.TELEGRAM_CHAT_ID);
      formData.append('photo', imageBlob, 'image.jpg');
      formData.append('caption', 'alla'); // Append the caption

      const telegramApiUrl = `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendPhoto`;

      try {
        const telegramResponse = await fetch(telegramApiUrl, {
          method: 'POST',
          body: formData,
        });

        const telegramData = await telegramResponse.json();

        res.json({ success: true, telegramResponse: telegramData });
      } catch (error) {
        console.error('Error sending image:', error);
        res.status(500).json({ success: false, message: 'Error sending image' });
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

router.post('/shareaudio/:id', async (req, res) => {
  try {
    const _id = req.params.id;
    const getAudio = await Audios.findOne({ _id });
    if (!getAudio) {
      return res.status(400).json({ message: 'Audio not found' });
    }

    const { Audio, title } = getAudio;
    const caption = 'Listen to this amazing audio!';
    const convertedAudioPath = path.join(__dirname, '../../uploads/audio/', Audio);

    // Read the audio file
    fs.readFile(convertedAudioPath, async (err, data) => {
      if (err) {
        console.error('Error reading audio:', err);
        return res.status(500).json({ message: 'Error reading audio' });
      }

      const audioBlob = new Blob([data], { type: 'audio/wav' });

      const formData = new FormData();
      formData.append('chat_id', process.env.TELEGRAM_CHAT_ID);
      formData.append('audio', audioBlob, title);
      formData.append('caption', caption);

      const telegramApiUrl = `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendAudio`;

      try {
        const telegramResponse = await fetch(telegramApiUrl, {
          method: 'POST',
          body: formData,
        });

        const telegramData = await telegramResponse.json();

        res.json({ success: true, telegramResponse: telegramData });
      } catch (error) {
        console.error('Error sending audio:', error);
        res.status(500).json({ success: false, message: 'Error sending audio' });
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});



module.exports = router;