const db = require('../config/database');

const Category = {
  findAll({ is_active } = {}) {
    const query = db('categories').orderBy('sort_order', 'asc');
    if (is_active !== undefined) query.where({ is_active });
    return query;
  },

  findById(id) {
    return db('categories').where({ id }).first();
  },

  findBySlug(slug) {
    return db('categories').where({ slug }).first();
  },

  create(data) {
    return db('categories')
      .insert(data)
      .then((ids) => this.findById(ids[0]));
  },

  update(id, data) {
    return db('categories')
      .where({ id })
      .update(data)
      .then(() => this.findById(id));
  },

  findSubcategories(parentId) {
    return db('categories')
      .where({ parent_id: parentId, is_active: true })
      .orderBy('sort_order', 'asc');
  },
};

module.exports = Category;
