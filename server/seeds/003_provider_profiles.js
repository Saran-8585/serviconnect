exports.seed = async function (knex) {
  await knex.raw('PRAGMA foreign_keys = OFF');
  await knex('provider_profiles').del();
  await knex.raw('PRAGMA foreign_keys = ON');

  const users = await knex('users')
    .select('id', 'email')
    .whereIn('email', ['ravi@example.com', 'amit@example.com']);

  const userMap = {};
  for (const u of users) userMap[u.email] = u.id;

  await knex('provider_profiles').insert([
    {
      user_id: userMap['ravi@example.com'],
      business_name: 'Ravi Plumbing Solutions',
      description: 'Expert plumbing services with 10+ years of experience. Specializing in pipe repairs, water heater installation, and bathroom fittings.',
      rating: 4.5,
      total_reviews: 28,
      service_area: 'Pune, Mumbai',
      is_verified: true,
      is_approved: true,
    },
    {
      user_id: userMap['amit@example.com'],
      business_name: 'Amit Electrical Works',
      description: 'Licensed electrician offering wiring, installation, and troubleshooting services for homes and offices.',
      rating: 4.2,
      total_reviews: 15,
      service_area: 'Bangalore',
      is_verified: true,
      is_approved: true,
    },
  ]);
};
