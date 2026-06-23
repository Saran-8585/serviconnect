exports.seed = async function (knex) {
  await knex.raw('PRAGMA foreign_keys = OFF');
  await knex('reviews').del();
  await knex.raw('PRAGMA foreign_keys = ON');

  const bookings = await knex('bookings')
    .select('bookings.id', 'services.name as service_name')
    .join('services', 'bookings.service_id', 'services.id')
    .whereIn('services.name', ['Water Heater Installation', 'Pipe Repair']);

  const users = await knex('users')
    .select('id', 'email')
    .whereIn('email', ['sneha@example.com', 'priya@example.com']);

  const providers = await knex('provider_profiles')
    .select('id', 'business_name');

  const userMap = {};
  for (const u of users) userMap[u.email] = u.id;

  const provMap = {};
  for (const p of providers) provMap[p.business_name] = p.id;

  const bookingMap = {};
  for (const b of bookings) bookingMap[b.service_name] = b.id;

  await knex('reviews').insert([
    {
      booking_id: bookingMap['Water Heater Installation'],
      customer_id: userMap['sneha@example.com'],
      provider_id: provMap['Ravi Plumbing Solutions'],
      rating: 5,
      comment: 'Excellent service! Ravi was prompt and fixed the water heater quickly.',
    },
    {
      booking_id: bookingMap['Pipe Repair'],
      customer_id: userMap['priya@example.com'],
      provider_id: provMap['Ravi Plumbing Solutions'],
      rating: 4,
      comment: 'Good work, but arrived a bit late. Fixed the pipe properly.',
    },
  ]);
};
