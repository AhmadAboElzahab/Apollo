const Category = require('../models/Category.model');
const Audio = require('../models/Audio.model');
const Artwork = require('../models/Artwork.model');
const Lyrics = require('../models/Lyrics.model');

const createCategory = async (req, res) => {
  try {
    const { title, type } = req.body;
    const existingCategory = await Category.findOne({ title, type });

    if (existingCategory) {
      res.status(400).json({ error: 'Category with the same title and type already exists.' });
      return;
    }
    const newCategory = new Category({ title, type });
    const savedCategory = await newCategory.save();
    res.json(savedCategory).status(200);
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
    const categoryToUpdate = await Category.findById(req.params.id);

    if (!categoryToUpdate) {
      return res.status(404).json({ error: 'Category not found.' });
    }
    if (title !== categoryToUpdate.title) {
      const existingCategory = await Category.findOne({ title });

      if (existingCategory) {
        return res.status(400).json({ error: 'Category with the same title already exists.' });
      }
    }

    categoryToUpdate.title = title;
    const updatedCategory = await categoryToUpdate.save();
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
const getProductsByCategory = async (req, res) => {
  try {
    const { type, title } = req.params;
    const formattedTitle = title.replace(/-/g, ' ');
    const category = await Category.findOne({
      type: { $regex: new RegExp(type, 'i') },
      title: { $regex: new RegExp(formattedTitle, 'i') },
    });

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    let products;
    switch (type.toLowerCase()) {
      case 'artworks':
        products = await Artwork.find({ category: category._id });
        break;
      case 'lyrics':
        products = await Lyrics.find({ category: category._id });
        break;
      case 'beats':
        products = await Audio.find({ category: category._id });
        break;
      default:
        break;
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createCategory,
  getCategories,
  getCategoriesByType,
  getProductsByCategory,
  updateCategory,
  deleteCategory,
};
