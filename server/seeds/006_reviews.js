exports.seed = async function (knex) {
  await knex.raw('PRAGMA foreign_keys = OFF');
  await knex('reviews').del();
  await knex.raw('PRAGMA foreign_keys = ON');

  const bookings = await knex('bookings')
    .select('bookings.id', 'services.name as service_name', 'users.email as customer_email')
    .join('services', 'bookings.service_id', 'services.id')
    .join('users', 'bookings.customer_id', 'users.id');

  const providers = await knex('provider_profiles')
    .select('id', 'business_name');

  const users = await knex('users')
    .select('id', 'email')
    .whereIn('email', ['priya@example.com', 'sneha@example.com']);

  const userMap = {};
  for (const u of users) userMap[u.email] = u.id;

  const provMap = {};
  for (const p of providers) provMap[p.business_name] = p.id;

  const bookingMap = {};
  for (const b of bookings) bookingMap[`${b.service_name}|${b.customer_email}`] = b.id;

  await knex('reviews').insert([
    {
      booking_id: bookingMap['Pipe Repair|priya@example.com'],
      customer_id: userMap['priya@example.com'],
      provider_id: provMap['Ravi Plumbing Solutions'],
      rating: 4,
      comment: 'Good work, but arrived a bit late. Fixed the pipe properly.',
    },
    {
      booking_id: bookingMap['Water Heater Installation|sneha@example.com'],
      customer_id: userMap['sneha@example.com'],
      provider_id: provMap['Ravi Plumbing Solutions'],
      rating: 5,
      comment: 'Excellent service! Ravi was prompt and fixed the water heater quickly.',
    },
    {
      booking_id: bookingMap['Home Deep Cleaning|priya@example.com'],
      customer_id: userMap['priya@example.com'],
      provider_id: provMap['Sparkle Clean Pro'],
      rating: 5,
      comment: 'Incredible cleaning! The house looks brand new. Vikram and his team were very thorough.',
    },
    {
      booking_id: bookingMap['Interior Wall Painting|priya@example.com'],
      customer_id: userMap['priya@example.com'],
      provider_id: provMap['ColorCraft Painters'],
      rating: 4,
      comment: 'Beautiful finish and great color selection advice. Slight delay in starting but quality was excellent.',
    },
    {
      booking_id: bookingMap['Office Cleaning|sneha@example.com'],
      customer_id: userMap['sneha@example.com'],
      provider_id: provMap['Sparkle Clean Pro'],
      rating: 4,
      comment: 'Very professional cleaning service. Our office looks spotless. Will book again.',
    },
    {
      booking_id: bookingMap['Door Repair|sneha@example.com'],
      customer_id: userMap['sneha@example.com'],
      provider_id: provMap['WoodWorks Carpentry'],
      rating: 5,
      comment: 'Rajesh did an amazing job with the door repair. Fixed the hinge, realigned the door, and it works perfectly now.',
    },
    {
      booking_id: bookingMap['Washing Machine Repair|sneha@example.com'],
      customer_id: userMap['sneha@example.com'],
      provider_id: provMap['QuickFix Appliances'],
      rating: 3,
      comment: 'The washing machine is working now but it took two visits to fix. Decent service overall.',
    },
  ]);
};
