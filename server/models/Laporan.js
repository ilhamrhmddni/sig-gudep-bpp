const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Laporan = sequelize.define(
  "Laporan",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    asal: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    no_hp: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    status: {
      type: DataTypes.ENUM("diproses", "selesai"),
      allowNull: false,
      defaultValue: "diproses",
    },
  },
  {
    tableName: "Laporans",
    timestamps: true,
  }
);

Laporan.sync()
  .then(() => console.log("Tabel Kwarran berhasil dibuat di database"))
  .catch((err) => console.error("Gagal membuat tabel Kwarran:", err));

module.exports = Laporan;
