exports.seed = async function (knex) {
  await knex.raw('PRAGMA foreign_keys = OFF');
  await knex('notifications').del();
  await knex.raw('PRAGMA foreign_keys = ON');

  const users = await knex('users')
    .select('id', 'email')
    .whereIn('email', [
      'ravi@example.com',
      'priya@example.com',
      'amit@example.com',
      'vikram@example.com',
      'ananya@example.com',
      'sneha@example.com',
      'rajesh@example.com',
      'meera@example.com',
    ]);

  const userMap = {};
  for (const u of users) userMap[u.email] = u.id;

  const bookings = await knex('bookings')
    .select('bookings.id', 'services.name as service_name', 'users.email as customer_email')
    .join('services', 'bookings.service_id', 'services.id')
    .join('users', 'bookings.customer_id', 'users.id');

  const bookingMap = {};
  for (const b of bookings) bookingMap[`${b.service_name}|${b.customer_email}`] = b.id;

  await knex('notifications').insert([
    {
      user_id: userMap['ravi@example.com'],
      type: 'new_booking',
      title: 'New Booking Received',
      message: 'You have a new booking for Pipe Repair on 2026-06-25.',
      related_id: bookingMap['Pipe Repair|priya@example.com'],
      is_read: false,
    },
    {
      user_id: userMap['priya@example.com'],
      type: 'booking_confirmed',
      title: 'Booking Confirmed',
      message: 'Your booking for Pipe Repair has been confirmed for 2026-06-25 at 10:00 AM.',
      related_id: bookingMap['Pipe Repair|priya@example.com'],
      is_read: true,
    },
    {
      user_id: userMap['ravi@example.com'],
      type: 'review',
      title: 'New Review Received',
      message: 'You received a 4-star review from Priya Patel.',
      related_id: bookingMap['Pipe Repair|priya@example.com'],
      is_read: false,
    },
    {
      user_id: userMap['vikram@example.com'],
      type: 'new_booking',
      title: 'New Booking Received',
      message: 'You have a new booking for Home Deep Cleaning on 2026-06-22.',
      related_id: bookingMap['Home Deep Cleaning|priya@example.com'],
      is_read: false,
    },
    {
      user_id: userMap['priya@example.com'],
      type: 'booking_completed',
      title: 'Service Completed',
      message: 'Your Home Deep Cleaning has been marked as completed. Please leave a review!',
      related_id: bookingMap['Home Deep Cleaning|priya@example.com'],
      is_read: false,
    },
    {
      user_id: userMap['ananya@example.com'],
      type: 'new_booking',
      title: 'New Booking Received',
      message: 'You have a new booking for Interior Wall Painting on 2026-06-20.',
      related_id: bookingMap['Interior Wall Painting|priya@example.com'],
      is_read: true,
    },
    {
      user_id: userMap['sneha@example.com'],
      type: 'booking_confirmed',
      title: 'Booking Confirmed',
      message: 'Your Refrigerator Repair booking has been confirmed for 2026-07-06 at 10:00 AM.',
      related_id: bookingMap['Refrigerator Repair|sneha@example.com'],
      is_read: false,
    },
    {
      user_id: userMap['meera@example.com'],
      type: 'new_booking',
      title: 'New Booking Received',
      message: 'You have a new booking for Washing Machine Repair on 2026-06-19.',
      related_id: bookingMap['Washing Machine Repair|sneha@example.com'],
      is_read: false,
    },
    {
      user_id: userMap['rajesh@example.com'],
      type: 'review',
      title: 'New Review Received',
      message: 'You received a 5-star review from Sneha Reddy.',
      related_id: bookingMap['Door Repair|sneha@example.com'],
      is_read: false,
    },
    {
      user_id: userMap['sneha@example.com'],
      type: 'booking_completed',
      title: 'Service Completed',
      message: 'Your Door Repair has been marked as completed. Please leave a review!',
      related_id: bookingMap['Door Repair|sneha@example.com'],
      is_read: false,
    },
  ]);
};
