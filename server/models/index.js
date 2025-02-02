const { Sequelize } = require("sequelize");
require("dotenv").config();
const config = require("../config/configurations");

const env = process.env.NODE_ENV || "production";
const dbConfig = config[env];

const sequelize = new Sequelize(dbConfig.api, {
  dialect: dbConfig.dialect,
  logging: false,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Koneksi ke database berhasil!");
  })
  .catch((err) => {
    console.error("Tidak dapat terhubung ke database:", err);
  });

module.exports = sequelize;
