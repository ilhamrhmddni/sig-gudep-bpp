// models/User.js
const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../models/index");

const User = sequelize.define(
  "User",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false, // Tidak boleh kosong
      unique: true, // Username harus unik
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "moderator"),
      allowNull: false,
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: true, // Diperbolehkan kosong
    },
    asal: {
      type: DataTypes.STRING,
      allowNull: true, // Diperbolehkan kosong
    },
    no_telp: {
      type: DataTypes.INTEGER,
      allowNull: true, // Diperbolehkan kosong
    },
    photo_path: {
      type: DataTypes.STRING,
      allowNull: true, // Diperbolehkan kosong
    },
  },
  {
    timestamps: true,
  }
);

// Sinkronisasi model dengan tabel di database
User.sync()
  .then(() => console.log("Tabel User berhasil dibuat di database"))
  .catch((err) => console.error("Gagal membuat tabel User:", err));

module.exports = User;
