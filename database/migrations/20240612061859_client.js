exports.up = function (knex) {
  return knex.schema.dropTableIfExists('client')
    .then(function () {
      return knex.schema.createTable('client', function (table) {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.decimal('balance', 10, 2).notNullable();
        table.timestamps(true, true)
      });
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('client');
};
