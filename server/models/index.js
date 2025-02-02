const { Sequelize } = require("sequelize");
require("dotenv").config();

const env = process.env.NODE_ENV || "production";
const dbConfig = config[env];

const sequelize = new Sequelize(dbConfig.SUPABASE_API_URL, {
  dialect: dbConfig.SUPABASE_DIALECT,
  logging: false,
});

module.exports = sequelize;
