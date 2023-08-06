const express = require("express");
const adminAuthorization = require("../../middleware/adminAuthorization.middleware");
const router = express.Router();

const Lyrics = require("../../models/Lyrics.model");
const Category = require("../../models/Category.model");

router.post("/", async (req, res) => {
  try {
    const { title, lyrics, category, price } = req.body;
    const newLyric = new Lyrics({ title, lyrics, category, price });
    const savedLyric = await newLyric.save();
    res.json(savedLyric);
  } catch (error) {
    res.status(500).json({ error: "Failed to create a new lyric." });
  }
});

router.get("/", async (req, res) => {
  try {
    const allLyrics = await Lyrics.find();

    const categoryIds = [...new Set(allLyrics.map((lyric) => lyric.category))];

    const categories = await Category.find({ _id: { $in: categoryIds } });

    const categoryMap = {};
    categories.forEach((category) => {
      categoryMap[category._id.toString()] = category.title;
    });

    const lyricsWithCategories = allLyrics.map((lyric) => ({
      _id: lyric._id,
      title: lyric.title,
      lyrics: lyric.lyrics,
      category: categoryMap[lyric.category.toString()], // Map category name using category ID
      price: lyric.price,
    }));

    res.json(lyricsWithCategories);
  } catch (error) {
    console.error("Error fetching lyrics:", error);
    res.status(500).json({ error: "Failed to fetch lyrics." });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const lyric = await Lyrics.findById(req.params.id);
    if (!lyric) {
      return res.status(404).json({ error: "Lyric not found." });
    }
    res.json(lyric);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the lyric." });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const { title, lyrics, price } = req.body;
    const updatedFields = {};

    if (title) {
      updatedFields.title = title;
    }

    if (lyrics) {
      updatedFields.lyrics = lyrics;
    }

    if (price) {
      updatedFields.price = price;
    }

    const updatedLyric = await Lyrics.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      { new: true }
    );

    if (!updatedLyric) {
      return res.status(404).json({ error: "Lyric not found." });
    }

    res.json(updatedLyric);
  } catch (error) {
    res.status(500).json({ error: "Failed to update the lyric." });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedLyric = await Lyrics.findByIdAndRemove(req.params.id);
    if (!deletedLyric) {
      return res.status(404).json({ error: "Lyric not found." });
    }
    res.json({ message: "Lyric deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the lyric." });
  }
});

module.exports = router;
