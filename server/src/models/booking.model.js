const db = require('../config/database');

const Booking = {
  findById(id) {
    return db('bookings')
      .join('users as customer', 'bookings.customer_id', 'customer.id')
      .join('provider_profiles', 'bookings.provider_id', 'provider_profiles.id')
      .join('users as provider_user', 'provider_profiles.user_id', 'provider_user.id')
      .join('services', 'bookings.service_id', 'services.id')
      .where('bookings.id', id)
      .select(
        'bookings.*',
        'customer.name as customer_name',
        'customer.phone as customer_phone',
        'customer.email as customer_email',
        'provider_profiles.business_name',
        'provider_profiles.rating',
        'provider_profiles.service_area',
        'provider_user.name as provider_name',
        'provider_user.phone as provider_phone',
        'services.name as service_name',
        'services.price',
        'services.duration'
      )
      .first();
  },

  findByCustomerId(customerId) {
    return db('bookings')
      .join('provider_profiles', 'bookings.provider_id', 'provider_profiles.id')
      .join('users as provider_user', 'provider_profiles.user_id', 'provider_user.id')
      .join('services', 'bookings.service_id', 'services.id')
      .where('bookings.customer_id', customerId)
      .select(
        'bookings.*',
        'provider_profiles.business_name',
        'provider_profiles.rating',
        'provider_user.name as provider_name',
        'provider_user.phone as provider_phone',
        'services.name as service_name',
        'services.price',
        'services.duration'
      )
      .orderBy('bookings.created_at', 'desc');
  },

  findByProviderId(providerId) {
    return db('bookings')
      .join('users as customer', 'bookings.customer_id', 'customer.id')
      .join('services', 'bookings.service_id', 'services.id')
      .where('bookings.provider_id', providerId)
      .select(
        'bookings.*',
        'customer.name as customer_name',
        'customer.phone as customer_phone',
        'services.name as service_name',
        'services.price',
        'services.duration'
      )
      .orderBy('bookings.created_at', 'desc');
  },

  async create(data) {
    const conflict = await db('bookings')
      .where({
        provider_id: data.provider_id,
        booking_date: data.booking_date,
        time_slot: data.time_slot,
      })
      .whereNot('status', 'cancelled')
      .first();

    if (conflict) {
      const error = new Error('This time slot is already booked.');
      error.statusCode = 409;
      throw error;
    }

    return db('bookings')
      .insert(data)
      .then((ids) => this.findById(ids[0]));
  },

  updateStatus(id, status) {
    return db('bookings')
      .where({ id })
      .update({ status, updated_at: db.fn.now() })
      .then(() => this.findById(id));
  },

  getTimeSlots(providerId, date) {
    const slots = [];
    for (let h = 8; h < 18; h++) {
      slots.push(`${String(h).padStart(2, '0')}:00-${String(h + 1).padStart(2, '0')}:00`);
    }

    return db('bookings')
      .where({ provider_id: providerId, booking_date: date })
      .whereNot('status', 'cancelled')
      .pluck('time_slot')
      .then((booked) => slots.filter((s) => !booked.includes(s)));
  },
};

module.exports = Booking;
