// models/User.js
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Geographical = sequelize.define(
  "Geographical",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    titik_koordinat: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    longitude: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    alamat: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "Geographicals",
    timestamps: true,
  }
);

// Sinkronisasi model dengan tabel di database
Geographical.sync()
  .then(() => console.log("Tabel Geografis berhasil dibuat di database"))
  .catch((err) => console.error("Gagal membuat tabel Geografis:", err));

module.exports = Geographical;
