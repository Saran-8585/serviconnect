exports.up = function (knex) {
  return knex.schema.createTable('bookings', (table) => {
    table.increments('id').primary();
    table.integer('customer_id').notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.integer('provider_id').notNullable().references('id').inTable('provider_profiles').onDelete('CASCADE');
    table.integer('service_id').notNullable().references('id').inTable('services').onDelete('CASCADE');
    table.date('booking_date').notNullable();
    table.string('time_slot').notNullable();
    table.string('status', 20).notNullable().defaultTo('pending');
    table.text('address');
    table.text('notes');
    table.decimal('total_amount', 10, 2);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());

    table.index('customer_id');
    table.index('provider_id');
    table.index('status');
    table.index(['provider_id', 'booking_date', 'time_slot']);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('bookings');
};
