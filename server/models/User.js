// models/User.js
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
      type: DataTypes.ENUM("admin", "operator"),
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
      type: DataTypes.STRING,
      allowNull: true, // Diperbolehkan kosong
    },
    photo_path: {
      type: DataTypes.STRING,
      allowNull: true, // Diperbolehkan kosong
    },
  },
  {
    tableName: "Users",
    timestamps: true,
  }
);

// Sinkronisasi model dengan tabel di database
User.sync()
  .then(() => console.log("Tabel User berhasil dibuat di database"))
  .catch((err) => console.error("Gagal membuat tabel User:", err));

module.exports = User;
