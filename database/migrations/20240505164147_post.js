exports.up = function(knex) {
  return knex.schema.dropTableIfExists('post')
    .then(function() {
      return knex.schema.createTable('post', function(table) {
        table.increments('id').primary()
        table.jsonb('name')
        table.jsonb('description')
        table.boolean("published").defaultTo(false)
        table.jsonb('details').defaultTo([])
        table.timestamps(true, true)
      });
    });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('post');
};
