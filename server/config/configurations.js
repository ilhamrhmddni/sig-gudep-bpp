require("dotenv").config();

module.exports = {
  development: {
    username: "root",
    password: null,
    database: "test",
    host: "127.0.0.1",
    dialect: "postgres",
    port: 3000,
  },
  production: {
    username: process.env.SUPABASE_USER,
    password: process.env.SUPABASE_PASSWORD,
    database: process.env.SUPABASE_DATABASE,
    host: process.env.SUPABASE_HOST,
    dialect: process.env.SUPABASE_DIALECT,
    api: process.env.SUPABASE_API_URL,
  },
};
