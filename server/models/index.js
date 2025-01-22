require("dotenv").config();
const { Sequelize } = require("sequelize");
const config = require("../config/config.js");

const env = process.env.NODE_ENV || "development";
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    port: dbConfig.port,
    logging: false,
  }
);

// Cek koneksi database
sequelize
  .authenticate()
  .then(() => console.log("✅ Koneksi ke Supabase PostgreSQL berhasil! 🚀"))
  .catch((err) => console.error("❌ Koneksi gagal:", err));

module.exports = { sequelize };
