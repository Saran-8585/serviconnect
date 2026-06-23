exports.seed = async function (knex) {
  await knex.raw('PRAGMA foreign_keys = OFF');
  await knex('categories').del();
  await knex.raw('PRAGMA foreign_keys = ON');

  await knex('categories').insert([
    {
      name: 'Plumbing',
      slug: 'plumbing',
      description: 'Pipe repairs, installation, and maintenance services',
      icon: 'wrench',
      sort_order: 1,
      is_active: true,
    },
    {
      name: 'Electrical',
      slug: 'electrical',
      description: 'Wiring, fixture installation, and electrical repairs',
      icon: 'zap',
      sort_order: 2,
      is_active: true,
    },
    {
      name: 'Cleaning',
      slug: 'cleaning',
      description: 'Home and office cleaning services',
      icon: 'sparkles',
      sort_order: 3,
      is_active: true,
    },
    {
      name: 'Painting',
      slug: 'painting',
      description: 'Interior and exterior painting services',
      icon: 'paintbrush',
      sort_order: 4,
      is_active: true,
    },
    {
      name: 'Carpentry',
      slug: 'carpentry',
      description: 'Furniture making, repair, and woodwork',
      icon: 'hammer',
      sort_order: 5,
      is_active: true,
    },
    {
      name: 'Appliance Repair',
      slug: 'appliance-repair',
      description: 'Repair and servicing of home appliances',
      icon: 'tool',
      sort_order: 6,
      is_active: true,
    },
  ]);
};
