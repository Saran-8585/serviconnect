exports.seed = async function (knex) {
  await knex.raw('PRAGMA foreign_keys = OFF');
  await knex('messages').del();
  await knex.raw('PRAGMA foreign_keys = ON');

  const users = await knex('users')
    .select('id', 'email')
    .whereIn('email', [
      'priya@example.com',
      'ravi@example.com',
      'sneha@example.com',
      'vikram@example.com',
      'rajesh@example.com',
    ]);

  const userMap = {};
  for (const u of users) userMap[u.email] = u.id;

  const bookings = await knex('bookings')
    .select('bookings.id', 'services.name as service_name', 'users.email as customer_email')
    .join('services', 'bookings.service_id', 'services.id')
    .join('users', 'bookings.customer_id', 'users.id')
    .whereIn('services.name', ['Pipe Repair', 'Home Deep Cleaning', 'Door Repair']);

  const bookingMap = {};
  for (const b of bookings) bookingMap[`${b.service_name}|${b.customer_email}`] = b.id;

  await knex('messages').insert([
    {
      sender_id: userMap['priya@example.com'],
      receiver_id: userMap['ravi@example.com'],
      booking_id: bookingMap['Pipe Repair|priya@example.com'],
      content: 'Hi Ravi, is it possible to come earlier than 10 AM?',
    },
    {
      sender_id: userMap['ravi@example.com'],
      receiver_id: userMap['priya@example.com'],
      booking_id: bookingMap['Pipe Repair|priya@example.com'],
      content: 'I can try to reach by 9:30 AM. Will confirm on the day.',
    },
    {
      sender_id: userMap['priya@example.com'],
      receiver_id: userMap['ravi@example.com'],
      booking_id: bookingMap['Pipe Repair|priya@example.com'],
      content: 'That would be great, thank you!',
    },
    {
      sender_id: userMap['ravi@example.com'],
      receiver_id: userMap['priya@example.com'],
      booking_id: bookingMap['Pipe Repair|priya@example.com'],
      content: 'On my way! Will be there by 9:30 AM.',
    },
    {
      sender_id: userMap['priya@example.com'],
      receiver_id: userMap['vikram@example.com'],
      booking_id: bookingMap['Home Deep Cleaning|priya@example.com'],
      content: 'Hi Vikram, do you provide carpet cleaning as part of deep cleaning?',
    },
    {
      sender_id: userMap['vikram@example.com'],
      receiver_id: userMap['priya@example.com'],
      booking_id: bookingMap['Home Deep Cleaning|priya@example.com'],
      content: 'Yes, we do! We have professional-grade carpet cleaning equipment. No extra charges.',
    },
    {
      sender_id: userMap['priya@example.com'],
      receiver_id: userMap['vikram@example.com'],
      booking_id: bookingMap['Home Deep Cleaning|priya@example.com'],
      content: 'Perfect, looking forward to the service!',
    },
    {
      sender_id: userMap['sneha@example.com'],
      receiver_id: userMap['rajesh@example.com'],
      booking_id: bookingMap['Door Repair|sneha@example.com'],
      content: 'Hi Rajesh, the main door hinge is completely broken. Do you have replacement hinges?',
    },
    {
      sender_id: userMap['rajesh@example.com'],
      receiver_id: userMap['sneha@example.com'],
      booking_id: bookingMap['Door Repair|sneha@example.com'],
      content: 'Yes, I carry a variety of hinges. I will assess the door and fix it with the right hardware.',
    },
    {
      sender_id: userMap['sneha@example.com'],
      receiver_id: userMap['rajesh@example.com'],
      booking_id: bookingMap['Door Repair|sneha@example.com'],
      content: 'Great, see you tomorrow at 10 AM!',
    },
  ]);
};
