const express = require("express");
const adminAuthorization = require("../../middleware/adminAuthorization.middleware");
const router = express.Router();
const Category = require("../../models/Category.model");
const Audio = require("../../models/Audio.model");
const Artwork = require("../../models/Artwork.model");
const Lyrics = require("../../models/Lyrics.model");

router.post("/", async (req, res) => {
  try {
    const { title, type } = req.body;
    const newCategory = new Category({ title, type });
    const savedCategory = await newCategory.save();
    res.json(savedCategory);
  } catch (error) {
    res.status(500).json({ error: "Failed to create a new Category." });
  }
});

router.get("/", async (req, res) => {
  try {
    const Categories = await Category.find();
    res.json(Categories);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Categoris." });
  }
});

router.get("/:type", async (req, res) => {
  try {
    const Categories = await Category.find({ type: req.params.type });
    res.json(Categories);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Categoris." });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { title } = req.body;
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { title },
      { new: true }
    );
    if (!updatedCategory) {
      return res.status(404).json({ error: "Category not found." });
    }
    res.json(updatedCategory);
  } catch (error) {
    res.status(500).json({ error: "Failed to update Category." });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const Art = await Artwork.find({ category: req.params.id });
    const Aud = await Audio.find({ category: req.params.id });
    const Lyric = await Lyrics.find({ category: req.params.id });
    if (Art) {
      res.json({ message: "Can't Delete it holds Artworks", Art });
    }
    if (Aud) {
      res.json({ message: "Can't Delete it holds Beats", Aud });
    }
    if (Lyric) {
      res.json({ message: "Can't Delete it holds Lyrics", Lyric });
    }
    const deletedCategory = await Category.findByIdAndRemove(req.params.id);
    if (!deletedCategory) {
      return res.status(404).json({ error: "Category not found." });
    }
    res.json({ message: "Category deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Categoris." });
  }
});

module.exports = router;
