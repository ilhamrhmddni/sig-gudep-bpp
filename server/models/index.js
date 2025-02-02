const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.SUPABASE_API_URL, {
  dialect: SUPABASE_DIALECT,
  logging: false,
});

module.exports = sequelize;
