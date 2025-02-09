const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Gudep = sequelize.define(
  "Gudep",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    kwarran_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "kwarran",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    geografis_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "geografis",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    no_gudep: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tingkatan: {
      type: DataTypes.ENUM("Siaga", "Penggalang", "Penegak", "Pandega"),
      allowNull: false,
    },
    mabigus: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pembina: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pelatih: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tahun_update: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    jumlah_putra: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    jumlah_putri: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "Gudeps",
    timestamps: true,
  }
);

module.exports = Gudep;
