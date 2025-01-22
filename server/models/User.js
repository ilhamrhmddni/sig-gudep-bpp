const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db"); // Mengimpor koneksi dari db.js

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
  },
  {
    timestamps: true, // Menambahkan kolom createdAt dan updatedAt
  }
);

// Sinkronisasi model dengan tabel di database
User.sync()
  .then(() => console.log("Tabel User berhasil dibuat di database"))
  .catch((err) => console.error("Gagal membuat tabel User:", err));

module.exports = User;
