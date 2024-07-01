exports.up = function (knex) {
  return knex.schema.alterTable('expense_category', function (table) {
    table.timestamps(true, true);
  })
  .then(() => {
    return knex.schema.alterTable('expense', function (table) {
      table.timestamps(true, true);
    });
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable('expense', function (table) {
    table.dropTimestamps();
  })
  .then(() => {
    return knex.schema.alterTable('expense_category', function (table) {
      table.dropTimestamps();
    });
  });
};
