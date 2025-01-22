require("dotenv").config();

module.exports = {
  development: {
    username: process.env.SUPABASE_DB_USER,
    password: process.env.SUPABASE_DB_PASSWORD,
    database: process.env.SUPABASE_DB_NAME,
    host: process.env.SUPABASE_DB_HOST,
    dialect: process.env.SUPABASE_DB_DIALECT,
    port: process.env.SUPABASE_DB_PORT,
    logging: false,
  },
  production: {
    username: process.env.SUPABASE_DB_USER,
    password: process.env.SUPABASE_DB_PASSWORD,
    database: process.env.SUPABASE_DB_NAME,
    host: process.env.SUPABASE_DB_HOST,
    dialect: process.env.SUPABASE_DB_DIALECT,
    port: process.env.SUPABASE_DB_PORT,
    logging: false,
  },
};
