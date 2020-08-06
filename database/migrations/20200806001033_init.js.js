
exports.up = function(knex) {
  return knex.schema.createTable('users', tbl => {
      tbl.increments();
      tbl.string('firstName', 50).notNullable();
      tbl.string('lastName', 50).notNullable();
      tbl.string('username', 20).notNullable().unique();
      tbl.string('password', 12).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExits('users');
};
