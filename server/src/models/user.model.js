const db = require('../config/database');

const User = {
  findByEmail(email) {
    return db('users').where({ email }).first();
  },

  findById(id) {
    return db('users').where({ id }).first();
  },

  create(data) {
    return db('users').insert(data).then((ids) => this.findById(ids[0]));
  },

  update(id, data) {
    data.updated_at = db.fn.now();
    return db('users').where({ id }).update(data).then(() => this.findById(id));
  },

  findAll({ page = 1, limit = 20, role, is_active } = {}) {
    const query = db('users');
    if (role) query.where({ role });
    if (is_active !== undefined) query.where({ is_active });
    return query
      .orderBy('created_at', 'desc')
      .limit(limit)
      .offset((page - 1) * limit);
  },

  count({ role, is_active } = {}) {
    const query = db('users');
    if (role) query.where({ role });
    if (is_active !== undefined) query.where({ is_active });
    return query.count({ count: '*' }).first();
  },
};

module.exports = User;
