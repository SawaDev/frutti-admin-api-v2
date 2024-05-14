exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('user').then(function () {
      // Inserts seed entries
      return knex('user').insert([
        {user_name: 'user3', permissions: JSON.stringify(['read', 'write']), password: 'password45644', email: "dddd@ffs.com"}
      ]);
    });
};
