exports.up = function (knex) {
  return knex.schema.dropTableIfExists('currency')
    .then(function () {
      return knex.schema.createTable('currency', function (table) {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('symbol').nullable();
        table.decimal('distribution', 10, 4).notNullable();
        table.timestamps(true, true)
      });
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('currency');
};
