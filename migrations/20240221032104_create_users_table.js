// ./migrations/20240221120000_create_users_table.js

exports.up = function (knex) {
    return knex.schema.createTable('users', function (table) {
      table.increments('user_id').primary();
      table.string('username', 255).notNullable();
      table.string('password', 255).notNullable();
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('users');
  };
  