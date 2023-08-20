const Category = require('../models/Category.model');
const Audio = require('../models/Audio.model');
const Artwork = require('../models/Artwork.model');
const Lyrics = require('../models/Lyrics.model');

const createCategory = async (req, res) => {
  try {
    const { title, type } = req.body;
    const newCategory = new Category({ title, type });
    const savedCategory = await newCategory.save();
    res.json(savedCategory);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create a new Category.' });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Categories.' });
  }
};

const getCategoriesByType = async (req, res) => {
  try {
    const categories = await Category.find({ type: req.params.type });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Categories.' });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { title } = req.body;
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { title },
      { new: true },
    );
    if (!updatedCategory) {
      return res.status(404).json({ error: 'Category not found.' });
    }
    res.json(updatedCategory);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update Category.' });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const Art = await Artwork.find({ category: req.params.id });
    const Aud = await Audio.find({ category: req.params.id });
    const Lyric = await Lyrics.find({ category: req.params.id });

    let messages = [];
    if (Art.length > 0) {
      messages.push("Can't Delete it holds Artworks");
    }
    if (Aud.length > 0) {
      messages.push("Can't Delete it holds Beats");
    }
    if (Lyric.length > 0) {
      messages.push("Can't Delete it holds Lyrics");
    }

    if (messages.length > 0) {
      return res.status(500).json({ messages });
    }

    const deletedCategory = await Category.findByIdAndRemove(req.params.id);
    if (!deletedCategory) {
      return res.status(404).json({ error: 'Category not found.' });
    }

    res.json({ message: 'Category deleted successfully.' });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  createCategory,
  getCategories,
  getCategoriesByType,
  updateCategory,
  deleteCategory,
};
