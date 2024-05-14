exports.up = function(knex) {
  return knex.schema.createTable('user', function(table) {
    table.increments('id').primary();
    table.string('user_name').notNullable();
    table.json('permissions').defaultTo('[]');
    table.string('password').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('user');
};
