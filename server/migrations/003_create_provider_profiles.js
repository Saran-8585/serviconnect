exports.up = function (knex) {
  return knex.schema.createTable('provider_profiles', (table) => {
    table.increments('id').primary();
    table.integer('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.string('business_name').notNullable();
    table.text('description');
    table.string('logo');
    table.decimal('rating', 3, 2).defaultTo(0);
    table.integer('total_reviews').defaultTo(0);
    table.string('service_area');
    table.boolean('is_verified').defaultTo(false);
    table.boolean('is_approved').defaultTo(false);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());

    table.index('user_id');
    table.index('is_verified');
    table.index('is_approved');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('provider_profiles');
};
