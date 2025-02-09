const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const EventGudep = sequelize.define(
  "EventGudep",
  {
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "events",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    gudepId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "gudep",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    keterangan: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "EventGudeps",
    timestamps: false,
  }
);

module.exports = EventGudep;
