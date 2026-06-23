exports.seed = async function (knex) {
  await knex.raw('PRAGMA foreign_keys = OFF');
  await knex('messages').del();
  await knex.raw('PRAGMA foreign_keys = ON');

  const users = await knex('users')
    .select('id', 'email')
    .whereIn('email', ['priya@example.com', 'ravi@example.com']);

  const bookings = await knex('bookings')
    .select('bookings.id')
    .join('services', 'bookings.service_id', 'services.id')
    .where('services.name', 'Pipe Repair');

  const userMap = {};
  for (const u of users) userMap[u.email] = u.id;

  await knex('messages').insert([
    {
      sender_id: userMap['priya@example.com'],
      receiver_id: userMap['ravi@example.com'],
      booking_id: bookings[0].id,
      content: 'Hi Ravi, is it possible to come earlier than 10 AM?',
    },
    {
      sender_id: userMap['ravi@example.com'],
      receiver_id: userMap['priya@example.com'],
      booking_id: bookings[0].id,
      content: 'I can try to reach by 9:30 AM. Will confirm on the day.',
    },
    {
      sender_id: userMap['priya@example.com'],
      receiver_id: userMap['ravi@example.com'],
      booking_id: bookings[0].id,
      content: 'That would be great, thank you!',
    },
  ]);
};
