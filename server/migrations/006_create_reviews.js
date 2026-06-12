exports.up = function (knex) {
  return knex.schema.createTable('reviews', (table) => {
    table.increments('id').primary();
    table.integer('booking_id').notNullable().references('id').inTable('bookings').onDelete('CASCADE');
    table.integer('customer_id').notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.integer('provider_id').notNullable().references('id').inTable('provider_profiles').onDelete('CASCADE');
    table.integer('rating').notNullable().defaultTo(5);
    table.text('comment');
    table.timestamp('created_at').defaultTo(knex.fn.now());

    table.index('provider_id');
    table.unique('booking_id');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('reviews');
};
