const express = require('express');
const router = express.Router();
const Promo = require('../../models/Promo.model');
const Artwork = require('../../models/Artwork.model');
const Audios = require('../../models/Audio.model');
const Lyrics = require('../../models/Lyrics.model');
const fs = require('fs');
const path = require('path');
const Telegram = require('../../models/Telegram.model');

router.post('/ShareLyrics/:id', async (req, res) => {
  const _id = req.params.id;

  try {
    const getLyrics = await Lyrics.findOne({ _id });

    if (!getLyrics) {
      return res.status(400).json({ message: 'Lyrics not Found' });
    }

    const { title, lyrics, price } = getLyrics;
    const text = `A new Lyrics is Here : ${title}\n\n\n${lyrics.substring(
      0,
      70,
    )}.. \n\n\nwith price of:${price} \nGet it at \n${process.env.DOMAIN}store/Lyrics/${_id}`;
    const response = await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text,
        }),
      },
    );
    const data = await response.json();

    if (response.ok) {
      const messageId = data.result.message_id;

      const savedTelegramMessage = await new Telegram({
        type: 'Lyrics',
        Message_id: messageId,
        body: text,
      }).save();
      res.status(200).json(await response.json());
    } else {
      res.status(500).json({ message: error });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.post('/SharePromo/:id', async (req, res) => {
  const _id = req.params.id;

  try {
    const getPromo = await Promo.findOne({ _id });

    if (!getPromo) {
      return res.status(400).json({ message: 'Promo not Found' });
    }

    const { code, value } = getPromo;
    const text = `A New Promo Code is Added: ${code}\nDon't miss ${value}% discount Chance`;
    const response = await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text,
        }),
      },
    );
    const data = await response.json();

    if (response.ok) {
      const messageId = data.result.message_id;

      const savedTelegramMessage = await new Telegram({
        type: 'promo',
        Message_id: messageId,
        body: text,
      }).save();
      res.status(200).json(await response.json());
    } else {
      res.status(500).json({ message: 'Error' });
    }
  } catch (error) {
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

    const { art, title, price, description } = getArtwork;
    const caption = `A new Artwork is Here : ${title} \nwith price of:${price} \nDescription: ${description} \nGet it at \n${process.env.DOMAIN}store/artwork/${_id}`;
    const convertedImagePath = path.join(__dirname, '../../uploads/artworks/', art);

    fs.readFile(convertedImagePath, async (err, data) => {
      if (err) {
        return res.status(500).json({ message: 'Error reading image' });
      }

      const imageBlob = new Blob([data], { type: 'image/jpeg' });

      const formData = new FormData();
      formData.append('chat_id', process.env.TELEGRAM_CHAT_ID);
      formData.append('photo', imageBlob, 'image.jpg');
      formData.append('caption', caption);

      const telegramApiUrl = `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendPhoto`;

      try {
        const telegramResponse = await fetch(telegramApiUrl, {
          method: 'POST',
          body: formData,
        });

        const data = await telegramResponse.json();

        if (data.ok) {
          const messageId = data.result.message_id;

          await new Telegram({
            type: 'Artwork',
            Message_id: messageId,
            body: caption,
            asset: art,
          }).save();
          res.status(200).json({ message: 'Artwork Shared Successfully' });
        } else {
          res.status(500).json({ message: 'Artwork Could not be Shared' });
        }
      } catch (error) {
        res.status(500).json({ success: false, message: 'Error sending image' });
      }
    });
  } catch (error) {
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

    const { Audio, title, price, description } = getAudio;
    const caption = `A new Beat is Here : ${title} \nwith price of:${price} \nDescription: ${description} \nGet it at \n${process.env.DOMAIN}store/beat/${_id}`;
    const convertedAudioPath = path.join(__dirname, '../../uploads/audio/', Audio);

    fs.readFile(convertedAudioPath, async (err, data) => {
      if (err) {
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

        const data = await telegramResponse.json();
        if (data.ok) {
          const messageId = data.result.message_id;

          await new Telegram({
            type: 'Beat',
            Message_id: messageId,
            body: caption,
            asset: Audio,
          }).save();
          res.status(200).json({ message: 'Beat Shared Successfully' });
        } else {
          res.status(500).json({ message: 'Beat Could not be Shared' });
        }
      } catch (error) {
        res.status(500).json({ success: false, message: 'Error sending audio' });
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const url = `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/deleteMessage`;
  const data = new URLSearchParams({
    chat_id: process.env.TELEGRAM_CHAT_ID,
    message_id: id,
  });
  const response = await fetch(url, {
    method: 'POST',
    body: data,
  });
  if (response.ok) {
    res.status(500).json({ success: true, message: 'Deleted' });
  } else {
    res.status(500).json({ success: false, message: await response.json() });
  }
});

router.get('/', async (req, res) => {
  try {
    const getTelegramLogs = await Telegram.find();
    if (!getTelegramLogs) {
      res.status(400).json({ message: 'Could not get logs' });
    }
    res.status(200).json(getTelegramLogs);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
