exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable().unique();
    table.string('password').notNullable();
    table.string('phone', 20);
    table.string('role', 20).notNullable().defaultTo('customer');
    table.string('avatar');
    table.text('address');
    table.boolean('is_active').defaultTo(true);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());

    table.index('email');
    table.index('role');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users');
};
