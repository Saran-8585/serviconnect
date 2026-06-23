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
      status: 'confirmed',
      address: '789 Customer Colony, Delhi',
      notes: 'Kitchen sink pipe is leaking',
      total_amount: 499.00,
    },
    {
      customer_id: userMap['priya@example.com'],
      provider_id: provMap['Amit Electrical Works'],
      service_id: svcMap['Wiring & Rewiring'],
      booking_date: '2026-06-26',
      time_slot: '14:00-17:00',
      status: 'pending',
      address: '789 Customer Colony, Delhi',
      notes: 'Need wiring for new room',
      total_amount: 1499.00,
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
  ]);
};
