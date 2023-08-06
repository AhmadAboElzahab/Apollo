const express = require("express");
const adminAuthorization = require("../../middleware/adminAuthorization.middleware");
const router = express.Router();
const Category = require("../../models/Category.model");

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
    const deletedCategory = await Category.findByIdAndRemove(req.params.id);
    if (!deletedCategory) {
      return res.status(404).json({ error: "Category not found." });
    }
    res.json({ message: "Category deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete  Category." });
  }
});

module.exports = router;
