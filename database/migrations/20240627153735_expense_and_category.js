exports.up = function (knex) {
  return knex.schema
    .createTable('expense_category', function (table) {
      table.increments('id').primary();
      table.string('name');
    })
    .then(() => {
      return knex.schema.createTable('expense', function (table) {
        table.increments('id').primary();
        table.integer('wallet_id').unsigned().references('id').inTable('wallet').onDelete('CASCADE');
        table.integer('category_id').unsigned().references('id').inTable('expense_category').onDelete('CASCADE').nullable();
        table.decimal('amount', 18, 4).notNullable();
        table.string('comment');
      });
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('expense')
    .then(() => {
      return knex.schema.dropTableIfExists('expense_category');
    });
};
