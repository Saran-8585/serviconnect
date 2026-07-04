const db = require('../config/database');

const Service = {
  findById(id) {
    return db('services').where({ id }).first();
  },

  findByProviderId(providerId, { is_active } = {}) {
    const query = db('services').where({ provider_id: providerId });
    if (is_active !== undefined) query.where({ is_active });
    return query;
  },

  findByCategoryId(categoryId, { is_active } = {}) {
    const query = db('services').where({ category_id: categoryId });
    if (is_active !== undefined) query.where({ is_active });
    return query;
  },

  findAll({ page = 1, limit = 20, category_id, is_active } = {}) {
    const query = db('services');
    if (category_id) query.where({ category_id });
    if (is_active !== undefined) query.where({ is_active });
    return query
      .orderBy('created_at', 'desc')
      .limit(limit)
      .offset((page - 1) * limit);
  },

  create(data) {
    return db('services')
      .insert(data)
      .then((ids) => this.findById(ids[0]));
  },

  update(id, data) {
    return db('services')
      .where({ id })
      .update(data)
      .then(() => this.findById(id));
  },
};

module.exports = Service;
