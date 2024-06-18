exports.up = function (knex) {
  return Promise.all([
    knex.schema.alterTable('client', function (table) {
      table.decimal('balance', 18, 4).alter();
    }),
    knex.schema.alterTable('currency', function (table) {
      table.decimal('distribution', 18, 4).alter();
    }),
    knex.schema.alterTable('wallet', function (table) {
      table.decimal('balance', 18, 4).alter();
    }),
    knex.schema.alterTable('sale', function (table) {
      table.decimal('total_price', 18, 4).alter();
      table.decimal('distribution', 18, 4).alter();
    }),
    knex.schema.alterTable('transaction', function (table) {
      table.decimal('amount', 18, 4).alter();
      table.decimal('distribution', 18, 4).alter();
    }),
  ]);
};

exports.down = function (knex) {
  return Promise.all([
    knex.schema.alterTable('client', function (table) {
      table.decimal('balance', 10, 4).alter();
    }),
    knex.schema.alterTable('currency', function (table) {
      table.decimal('distribution', 10, 4).alter();
    }),
    knex.schema.alterTable('wallet', function (table) {
      table.decimal('balance', 10, 4).alter();
    }),
    knex.schema.alterTable('sale', function (table) {
      table.decimal('total_price', 10, 4).alter();
      table.decimal('distribution', 10, 4).alter();
    }),
    knex.schema.alterTable('transaction', function (table) {
      table.decimal('amount', 10, 4).alter();
      table.decimal('distribution', 10, 4).alter();
    }),
  ]);
};
