// models/User.js
const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Gudep = require("./Gudep");
const Geografis = require("./Geografis");

class User extends Model {}

User.init(
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
      defaultValue: "operator",
      allowNull: false,
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    asal: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    no_telp: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    photo_path: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isLoggedIn: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    timestamps: true,
    tableName: "user",
  }
);

module.exports = User;
