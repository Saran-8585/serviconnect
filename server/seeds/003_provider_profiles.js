exports.seed = async function (knex) {
  await knex.raw('PRAGMA foreign_keys = OFF');
  await knex('provider_profiles').del();
  await knex.raw('PRAGMA foreign_keys = ON');

  const users = await knex('users')
    .select('id', 'email')
    .whereIn('email', [
      'ravi@example.com',
      'amit@example.com',
      'vikram@example.com',
      'ananya@example.com',
      'rajesh@example.com',
      'meera@example.com',
    ]);

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
    {
      user_id: userMap['vikram@example.com'],
      business_name: 'Sparkle Clean Pro',
      description: 'Professional cleaning services for homes and offices. We use eco-friendly products and ensure spotless results every time.',
      rating: 4.7,
      total_reviews: 12,
      service_area: 'Delhi, NCR',
      is_verified: true,
      is_approved: true,
    },
    {
      user_id: userMap['ananya@example.com'],
      business_name: 'ColorCraft Painters',
      description: 'Transforming spaces with beautiful colors. Interior and exterior painting with premium finishes and attention to detail.',
      rating: 4.3,
      total_reviews: 8,
      service_area: 'Bangalore',
      is_verified: true,
      is_approved: true,
    },
    {
      user_id: userMap['rajesh@example.com'],
      business_name: 'WoodWorks Carpentry',
      description: 'Master carpenters crafting custom furniture, repairs, and woodwork. 15+ years of experience in residential and commercial projects.',
      rating: 4.6,
      total_reviews: 20,
      service_area: 'Pune, Mumbai',
      is_verified: true,
      is_approved: true,
    },
    {
      user_id: userMap['meera@example.com'],
      business_name: 'QuickFix Appliances',
      description: 'Authorized service provider for all major appliance brands. Fast, reliable repairs for AC, refrigerators, washing machines, and more.',
      rating: 4.4,
      total_reviews: 10,
      service_area: 'Mumbai, Thane',
      is_verified: true,
      is_approved: true,
    },
  ]);
};
