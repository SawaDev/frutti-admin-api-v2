exports.up = function (knex) {
  return knex.schema.dropTableIfExists('wallet')
    .then(function () {
      return knex.schema.createTable('wallet', function (table) {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.decimal('balance', 10, 4).notNullable();
        table.timestamps(true, true)
      });
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('wallet');
};
