exports.up = function (knex) {
  return knex.schema.createTable('notifications', (table) => {
    table.increments('id').primary();
    table.integer('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.string('type', 50).notNullable();
    table.string('title').notNullable();
    table.text('message');
    table.integer('related_id');
    table.boolean('is_read').defaultTo(false);
    table.timestamp('created_at').defaultTo(knex.fn.now());

    table.index('user_id');
    table.index('is_read');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('notifications');
};
