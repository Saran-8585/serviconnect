exports.up = function (knex) {
  return knex.schema.createTable('services', (table) => {
    table.increments('id').primary();
    table.integer('provider_id').notNullable().references('id').inTable('provider_profiles').onDelete('CASCADE');
    table.integer('category_id').notNullable().references('id').inTable('categories').onDelete('CASCADE');
    table.string('name').notNullable();
    table.text('description');
    table.decimal('price', 10, 2).notNullable();
    table.integer('duration').notNullable().defaultTo(60);
    table.text('images');
    table.boolean('is_active').defaultTo(true);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());

    table.index('provider_id');
    table.index('category_id');
    table.index('is_active');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('services');
};
