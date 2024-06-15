exports.up = function (knex) {
  return knex.schema.dropTableIfExists('transaction')
    .then(function () {
      return knex.schema.createTable('transaction', function (table) {
        table.increments('id').primary();
        table.integer('wallet_id').unsigned().references('id').inTable('wallet').onDelete('CASCADE');
        table.integer('sale_id').unsigned().references('id').inTable('sale').onDelete('CASCADE').nullable();
        table.integer('client_id').unsigned().references('id').inTable('client').onDelete('CASCADE').nullable();
        table.enum("type", ["cash", "card"]).defaultTo("cash")
        table.decimal('amount', 10, 4).notNullable();
        table.decimal('distribution', 10, 4).nullable();
        table.string('currency_name').nullable();
        table.timestamps(true, true)
      });
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('transaction');
};
