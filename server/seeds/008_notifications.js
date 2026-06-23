exports.seed = async function (knex) {
  await knex.raw('PRAGMA foreign_keys = OFF');
  await knex('notifications').del();
  await knex.raw('PRAGMA foreign_keys = ON');

  const users = await knex('users')
    .select('id', 'email')
    .whereIn('email', ['ravi@example.com', 'priya@example.com']);

  const bookings = await knex('bookings')
    .select('bookings.id')
    .join('services', 'bookings.service_id', 'services.id')
    .where('services.name', 'Pipe Repair');

  const userMap = {};
  for (const u of users) userMap[u.email] = u.id;

  await knex('notifications').insert([
    {
      user_id: userMap['ravi@example.com'],
      type: 'new_booking',
      title: 'New Booking Received',
      message: 'You have a new booking for Pipe Repair on 2026-06-25.',
      related_id: bookings[0].id,
      is_read: false,
    },
    {
      user_id: userMap['priya@example.com'],
      type: 'booking_confirmed',
      title: 'Booking Confirmed',
      message: 'Your booking for Pipe Repair has been confirmed for 2026-06-25 at 10:00 AM.',
      related_id: bookings[0].id,
      is_read: true,
    },
    {
      user_id: userMap['ravi@example.com'],
      type: 'review',
      title: 'New Review Received',
      message: 'You received a 5-star review from Sneha Reddy.',
      related_id: bookings[0].id,
      is_read: false,
    },
  ]);
};
