const bcrypt = require('bcryptjs');

exports.seed = async function (knex) {
  await knex.raw('PRAGMA foreign_keys = OFF');
  await knex('users').del();
  await knex.raw('PRAGMA foreign_keys = ON');

  const password = await bcrypt.hash('password123', 12);

  await knex('users').insert([
    {
      name: 'Admin User',
      email: 'admin@serviconnect.com',
      password,
      phone: '9876543210',
      role: 'admin',
      address: '123 Admin Street, Mumbai',
      is_active: true,
    },
    {
      name: 'Ravi Sharma',
      email: 'ravi@example.com',
      password,
      phone: '9876543211',
      role: 'provider',
      address: '456 Provider Nagar, Pune',
      is_active: true,
    },
    {
      name: 'Priya Patel',
      email: 'priya@example.com',
      password,
      phone: '9876543212',
      role: 'customer',
      address: '789 Customer Colony, Delhi',
      is_active: true,
    },
    {
      name: 'Amit Singh',
      email: 'amit@example.com',
      password,
      phone: '9876543213',
      role: 'provider',
      address: '321 Service Lane, Bangalore',
      is_active: true,
    },
    {
      name: 'Sneha Reddy',
      email: 'sneha@example.com',
      password,
      phone: '9876543214',
      role: 'customer',
      address: '654 Resident Road, Hyderabad',
      is_active: true,
    },
    {
      name: 'Vikram Joshi',
      email: 'vikram@example.com',
      password,
      phone: '9876543215',
      role: 'provider',
      address: '111 Clean Street, Delhi',
      is_active: true,
    },
    {
      name: 'Ananya Gupta',
      email: 'ananya@example.com',
      password,
      phone: '9876543216',
      role: 'provider',
      address: '222 Color Lane, Bangalore',
      is_active: true,
    },
    {
      name: 'Rajesh Kumar',
      email: 'rajesh@example.com',
      password,
      phone: '9876543217',
      role: 'provider',
      address: '333 Wood Avenue, Pune',
      is_active: true,
    },
    {
      name: 'Meera Iyer',
      email: 'meera@example.com',
      password,
      phone: '9876543218',
      role: 'provider',
      address: '444 Fixit Road, Mumbai',
      is_active: true,
    },
  ]);
};
