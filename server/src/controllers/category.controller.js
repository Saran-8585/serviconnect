const Category = require('../models/category.model');
const AppError = require('../utils/appError');

exports.getAll = async (req, res, next) => {
  try {
    const categories = await Category.findAll({ is_active: true });
    res.json({ categories });
  } catch (error) {
    next(error);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      throw new AppError('Category not found.', 404);
    }
    res.json({ category });
  } catch (error) {
    next(error);
  }
};

exports.getBySlug = async (req, res, next) => {
  try {
    const category = await Category.findBySlug(req.params.slug);
    if (!category) {
      throw new AppError('Category not found.', 404);
    }
    res.json({ category });
  } catch (error) {
    next(error);
  }
};
