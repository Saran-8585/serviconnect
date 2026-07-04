const Provider = require('../models/provider.model');
const Category = require('../models/category.model');
const Service = require('../models/service.model');
const AppError = require('../utils/appError');

exports.getAll = async (req, res, next) => {
  try {
    const { category_id, category_slug, page = 1, limit = 20 } = req.query;

    let providers;
    if (category_id) {
      providers = await Provider.findByCategoryId(category_id, { page, limit });
    } else if (category_slug) {
      const category = await Category.findBySlug(category_slug);
      if (!category) {
        return res.json({ providers: [] });
      }
      providers = await Provider.findByCategoryId(category.id, { page, limit });
    } else {
      providers = await Provider.findAll({ page, limit, is_approved: true });
    }

    const result = await Promise.all(
      providers.map(async (p) => {
        const services = await Service.findByProviderId(p.id, { is_active: true });
        return { ...p, services };
      })
    );

    res.json({ providers: result });
  } catch (error) {
    next(error);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const provider = await Provider.findById(req.params.id);
    if (!provider) {
      throw new AppError('Provider not found.', 404);
    }

    const services = await Service.findByProviderId(provider.id, { is_active: true });
    provider.services = services;

    res.json({ provider });
  } catch (error) {
    next(error);
  }
};
