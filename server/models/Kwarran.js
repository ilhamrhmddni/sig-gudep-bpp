const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Kwarran = sequelize.define(
  "Kwarran",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    kode: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ketua_kwarran: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ketua_dkr: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    jumlah_gudep: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isEmail: true,
      },
    },
  },
  {
    tableName: "Kwarrans",
    timestamps: true,
  }
);

Kwarran.sync()
  .then(() => console.log("Tabel Kwarran berhasil dibuat di database"))
  .catch((err) => console.error("Gagal membuat tabel Kwarran:", err));

module.exports = Kwarran;
