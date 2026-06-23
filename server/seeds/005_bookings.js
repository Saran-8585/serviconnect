exports.seed = async function (knex) {
  await knex.raw('PRAGMA foreign_keys = OFF');
  await knex('bookings').del();
  await knex.raw('PRAGMA foreign_keys = ON');

  const users = await knex('users')
    .select('id', 'email')
    .whereIn('email', ['priya@example.com', 'sneha@example.com']);

  const providers = await knex('provider_profiles')
    .select('id', 'business_name');

  const services = await knex('services')
    .select('id', 'name');

  const userMap = {};
  for (const u of users) userMap[u.email] = u.id;

  const provMap = {};
  for (const p of providers) provMap[p.business_name] = p.id;

  const svcMap = {};
  for (const s of services) svcMap[s.name] = s.id;

  await knex('bookings').insert([
    {
      customer_id: userMap['priya@example.com'],
      provider_id: provMap['Ravi Plumbing Solutions'],
      service_id: svcMap['Pipe Repair'],
      booking_date: '2026-06-25',
      time_slot: '10:00-11:00',
      status: 'completed',
      address: '789 Customer Colony, Delhi',
      notes: 'Kitchen sink pipe is leaking',
      total_amount: 499.00,
    },
    {
      customer_id: userMap['priya@example.com'],
      provider_id: provMap['Amit Electrical Works'],
      service_id: svcMap['Wiring & Rewiring'],
      booking_date: '2026-07-02',
      time_slot: '14:00-17:00',
      status: 'pending',
      address: '789 Customer Colony, Delhi',
      notes: 'Need wiring for new room',
      total_amount: 1499.00,
    },
    {
      customer_id: userMap['priya@example.com'],
      provider_id: provMap['Sparkle Clean Pro'],
      service_id: svcMap['Home Deep Cleaning'],
      booking_date: '2026-06-22',
      time_slot: '09:00-12:00',
      status: 'completed',
      address: '789 Customer Colony, Delhi',
      notes: 'Full house deep cleaning before housewarming',
      total_amount: 2499.00,
    },
    {
      customer_id: userMap['priya@example.com'],
      provider_id: provMap['ColorCraft Painters'],
      service_id: svcMap['Interior Wall Painting'],
      booking_date: '2026-06-20',
      time_slot: '08:00-16:00',
      status: 'completed',
      address: '789 Customer Colony, Delhi',
      notes: 'Living room and two bedrooms painting',
      total_amount: 5999.00,
    },
    {
      customer_id: userMap['priya@example.com'],
      provider_id: provMap['WoodWorks Carpentry'],
      service_id: svcMap['Custom Furniture Making'],
      booking_date: '2026-07-05',
      time_slot: '10:00-16:00',
      status: 'confirmed',
      address: '789 Customer Colony, Delhi',
      notes: 'Need a custom bookshelf for study room',
      total_amount: 4999.00,
    },
    {
      customer_id: userMap['priya@example.com'],
      provider_id: provMap['QuickFix Appliances'],
      service_id: svcMap['AC Service & Repair'],
      booking_date: '2026-07-08',
      time_slot: '11:00-13:00',
      status: 'pending',
      address: '789 Customer Colony, Delhi',
      notes: 'AC not cooling properly',
      total_amount: 999.00,
    },
    {
      customer_id: userMap['sneha@example.com'],
      provider_id: provMap['Ravi Plumbing Solutions'],
      service_id: svcMap['Water Heater Installation'],
      booking_date: '2026-06-24',
      time_slot: '09:00-11:00',
      status: 'completed',
      address: '654 Resident Road, Hyderabad',
      notes: 'Old water heater not working',
      total_amount: 999.00,
    },
    {
      customer_id: userMap['sneha@example.com'],
      provider_id: provMap['Amit Electrical Works'],
      service_id: svcMap['Fan & Light Installation'],
      booking_date: '2026-06-27',
      time_slot: '11:00-11:45',
      status: 'cancelled',
      address: '654 Resident Road, Hyderabad',
      notes: 'Install fan in living room',
      total_amount: 199.00,
    },
    {
      customer_id: userMap['sneha@example.com'],
      provider_id: provMap['Sparkle Clean Pro'],
      service_id: svcMap['Office Cleaning'],
      booking_date: '2026-06-21',
      time_slot: '14:00-18:00',
      status: 'completed',
      address: '654 Resident Road, Hyderabad',
      notes: 'Monthly office cleaning for small business',
      total_amount: 3999.00,
    },
    {
      customer_id: userMap['sneha@example.com'],
      provider_id: provMap['ColorCraft Painters'],
      service_id: svcMap['Exterior Painting'],
      booking_date: '2026-07-10',
      time_slot: '07:00-19:00',
      status: 'pending',
      address: '654 Resident Road, Hyderabad',
      notes: 'Exterior walls need repainting before monsoon',
      total_amount: 12999.00,
    },
    {
      customer_id: userMap['sneha@example.com'],
      provider_id: provMap['WoodWorks Carpentry'],
      service_id: svcMap['Door Repair'],
      booking_date: '2026-06-23',
      time_slot: '10:00-11:30',
      status: 'completed',
      address: '654 Resident Road, Hyderabad',
      notes: 'Main door hinge broken and needs replacement',
      total_amount: 999.00,
    },
    {
      customer_id: userMap['sneha@example.com'],
      provider_id: provMap['QuickFix Appliances'],
      service_id: svcMap['Washing Machine Repair'],
      booking_date: '2026-06-19',
      time_slot: '15:00-16:30',
      status: 'completed',
      address: '654 Resident Road, Hyderabad',
      notes: 'Washing machine not spinning properly',
      total_amount: 699.00,
    },
    {
      customer_id: userMap['sneha@example.com'],
      provider_id: provMap['QuickFix Appliances'],
      service_id: svcMap['Refrigerator Repair'],
      booking_date: '2026-07-06',
      time_slot: '10:00-11:30',
      status: 'confirmed',
      address: '654 Resident Road, Hyderabad',
      notes: 'Refrigerator not cooling in the freezer section',
      total_amount: 799.00,
    },
  ]);
};
