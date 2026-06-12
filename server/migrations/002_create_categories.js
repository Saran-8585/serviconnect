exports.up = function (knex) {
  return knex.schema.createTable('categories', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('slug').notNullable().unique();
    table.text('description');
    table.string('icon');
    table.string('image');
    table.integer('parent_id').references('id').inTable('categories').onDelete('SET NULL');
    table.integer('sort_order').defaultTo(0);
    table.boolean('is_active').defaultTo(true);
    table.timestamp('created_at').defaultTo(knex.fn.now());

    table.index('slug');
    table.index('parent_id');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('categories');
};
