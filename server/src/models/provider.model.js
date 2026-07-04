const db = require('../config/database');

const Provider = {
  findById(id) {
    return db('provider_profiles')
      .join('users', 'provider_profiles.user_id', 'users.id')
      .where('provider_profiles.id', id)
      .select(
        'provider_profiles.*',
        'users.name',
        'users.email',
        'users.phone',
        'users.avatar'
      )
      .first();
  },

  findByUserId(userId) {
    return db('provider_profiles').where({ user_id: userId }).first();
  },

  findAll({ page = 1, limit = 20, is_verified, is_approved } = {}) {
    const query = db('provider_profiles')
      .join('users', 'provider_profiles.user_id', 'users.id')
      .select(
        'provider_profiles.*',
        'users.name',
        'users.email',
        'users.avatar'
      );
    if (is_verified !== undefined) query.where({ is_verified });
    if (is_approved !== undefined) query.where({ is_approved });
    return query
      .orderBy('provider_profiles.rating', 'desc')
      .limit(limit)
      .offset((page - 1) * limit);
  },

  findByCategoryId(categoryId, { page = 1, limit = 20 } = {}) {
    return db('provider_profiles')
      .join('users', 'provider_profiles.user_id', 'users.id')
      .join('services', 'provider_profiles.id', 'services.provider_id')
      .where('services.category_id', categoryId)
      .where('provider_profiles.is_approved', true)
      .distinct('provider_profiles.*', 'users.name', 'users.email', 'users.avatar')
      .orderBy('provider_profiles.rating', 'desc')
      .limit(limit)
      .offset((page - 1) * limit);
  },

  create(data) {
    return db('provider_profiles')
      .insert(data)
      .then((ids) => this.findById(ids[0]));
  },

  update(id, data) {
    return db('provider_profiles')
      .where({ id })
      .update(data)
      .then(() => this.findById(id));
  },
};

module.exports = Provider;
