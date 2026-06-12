exports.up = function (knex) {
  return knex.schema.createTable('messages', (table) => {
    table.increments('id').primary();
    table.integer('sender_id').notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.integer('receiver_id').notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.integer('booking_id').references('id').inTable('bookings').onDelete('SET NULL');
    table.text('content').notNullable();
    table.string('attachment');
    table.timestamp('read_at');
    table.timestamp('created_at').defaultTo(knex.fn.now());

    table.index(['sender_id', 'receiver_id']);
    table.index('booking_id');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('messages');
};
