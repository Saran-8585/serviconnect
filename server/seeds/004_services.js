exports.seed = async function (knex) {
  await knex.raw('PRAGMA foreign_keys = OFF');
  await knex('services').del();
  await knex.raw('PRAGMA foreign_keys = ON');

  const providers = await knex('provider_profiles')
    .select('id', 'business_name');

  const categories = await knex('categories')
    .select('id', 'slug');

  const provMap = {};
  for (const p of providers) provMap[p.business_name] = p.id;

  const catMap = {};
  for (const c of categories) catMap[c.slug] = c.id;

  await knex('services').insert([
    {
      provider_id: provMap['Ravi Plumbing Solutions'],
      category_id: catMap['plumbing'],
      name: 'Pipe Repair',
      description: 'Fix leaking or burst pipes',
      price: 499.00,
      duration: 60,
      is_active: true,
    },
    {
      provider_id: provMap['Ravi Plumbing Solutions'],
      category_id: catMap['plumbing'],
      name: 'Water Heater Installation',
      description: 'Install new water heaters and geysers',
      price: 999.00,
      duration: 120,
      is_active: true,
    },
    {
      provider_id: provMap['Ravi Plumbing Solutions'],
      category_id: catMap['plumbing'],
      name: 'Drain Cleaning',
      description: 'Clear clogged drains and sewage lines',
      price: 349.00,
      duration: 45,
      is_active: true,
    },
    {
      provider_id: provMap['Amit Electrical Works'],
      category_id: catMap['electrical'],
      name: 'Wiring & Rewiring',
      description: 'Complete electrical wiring for homes and offices',
      price: 1499.00,
      duration: 180,
      is_active: true,
    },
    {
      provider_id: provMap['Amit Electrical Works'],
      category_id: catMap['electrical'],
      name: 'Switchboard Installation',
      description: 'Install new switchboards and sockets',
      price: 299.00,
      duration: 30,
      is_active: true,
    },
    {
      provider_id: provMap['Amit Electrical Works'],
      category_id: catMap['electrical'],
      name: 'Fan & Light Installation',
      description: 'Install ceiling fans, tube lights, and chandeliers',
      price: 199.00,
      duration: 45,
      is_active: true,
    },
  ]);
};
