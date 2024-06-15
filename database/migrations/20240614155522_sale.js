exports.up = function (knex) {
  return knex.schema.dropTableIfExists('sale')
    .then(function () {
      return knex.schema.createTable('sale', function (table) {
        table.increments('id').primary();
        table.integer('client_id').unsigned().references('id').inTable('client').onDelete('CASCADE').notNullable();
        table.decimal('total_price', 10, 4).notNullable();
        table.decimal('distribution', 10, 4).nullable();
        table.string('currency_name').nullable();
        table.timestamps(true, true)
      });
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('sale');
};
