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
    {
      provider_id: provMap['Sparkle Clean Pro'],
      category_id: catMap['cleaning'],
      name: 'Home Deep Cleaning',
      description: 'Thorough deep cleaning of entire home including kitchen, bathrooms, and bedrooms',
      price: 2499.00,
      duration: 180,
      is_active: true,
    },
    {
      provider_id: provMap['Sparkle Clean Pro'],
      category_id: catMap['cleaning'],
      name: 'Office Cleaning',
      description: 'Professional cleaning for office spaces and commercial establishments',
      price: 3999.00,
      duration: 240,
      is_active: true,
    },
    {
      provider_id: provMap['ColorCraft Painters'],
      category_id: catMap['painting'],
      name: 'Interior Wall Painting',
      description: 'Complete interior wall painting with premium quality paints and smooth finish',
      price: 5999.00,
      duration: 480,
      is_active: true,
    },
    {
      provider_id: provMap['ColorCraft Painters'],
      category_id: catMap['painting'],
      name: 'Exterior Painting',
      description: 'Weather-resistant exterior painting for walls and facades',
      price: 12999.00,
      duration: 720,
      is_active: true,
    },
    {
      provider_id: provMap['WoodWorks Carpentry'],
      category_id: catMap['carpentry'],
      name: 'Custom Furniture Making',
      description: 'Design and build custom furniture pieces including tables, shelves, and cabinets',
      price: 4999.00,
      duration: 360,
      is_active: true,
    },
    {
      provider_id: provMap['WoodWorks Carpentry'],
      category_id: catMap['carpentry'],
      name: 'Door Repair',
      description: 'Fix squeaky doors, repair hinges, and replace handles or locks',
      price: 999.00,
      duration: 90,
      is_active: true,
    },
    {
      provider_id: provMap['QuickFix Appliances'],
      category_id: catMap['appliance-repair'],
      name: 'AC Service & Repair',
      description: 'Complete AC servicing, gas refill, and repair of all air conditioner brands',
      price: 999.00,
      duration: 120,
      is_active: true,
    },
    {
      provider_id: provMap['QuickFix Appliances'],
      category_id: catMap['appliance-repair'],
      name: 'Washing Machine Repair',
      description: 'Diagnose and repair all types of washing machine issues',
      price: 699.00,
      duration: 90,
      is_active: true,
    },
    {
      provider_id: provMap['QuickFix Appliances'],
      category_id: catMap['appliance-repair'],
      name: 'Refrigerator Repair',
      description: 'Cooling issues, gas leaks, and compressor repair for all refrigerator brands',
      price: 799.00,
      duration: 90,
      is_active: true,
    },
  ]);
};
