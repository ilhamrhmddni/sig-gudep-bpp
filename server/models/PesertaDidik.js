const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const PesertaDidik = sequelize.define(
  "PesertaDidik",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_gudep: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM("Laki-laki", "Perempuan"),
      allowNull: false,
    },
    ttl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    detailtingkatan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "PesertaDidiks",
    timestamps: true,
  }
);

PesertaDidik.sync()
  .then(() => console.log("Tabel PesertaDidik berhasil dibuat di database"))
  .catch((err) => console.error("Gagal membuat tabel PesertaDidik:", err));

module.exports = PesertaDidik;
