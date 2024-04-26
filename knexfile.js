
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
require('dotenv').config();


module.exports = {
  development: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST,
      port: 5432,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: false,
    },
  },
};