const express = require('express');
const router = express.Router();
const {
  createCategory,
  getCategories,
  getCategoriesByType,
  updateCategory,
  deleteCategory,
} = require('../../controllers/Category.controller');

router.post('/', createCategory);

router.get('/', getCategories);

router.get('/:type', getCategoriesByType);

router.put('/:id', updateCategory);

router.delete('/:id', deleteCategory);

module.exports = router;
