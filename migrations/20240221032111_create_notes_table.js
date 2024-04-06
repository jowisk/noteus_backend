// ./migrations/20240221120100_create_notes_table.js

exports.up = function (knex) {
    return knex.schema.createTable('notes', function (table) {
      table.uuid('uuid').primary();
      table.text('text').notNullable();
      table.specificType('tags', 'varchar[]');
      table.boolean('archived').defaultTo(false);
      table.string('color', 50);
      table.integer('user_id').unsigned().references('user_id').inTable('users');
      table.specificType('categories', 'varchar[]');
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('notes');
  };
  