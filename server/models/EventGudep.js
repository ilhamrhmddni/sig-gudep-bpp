const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const EventGudep = sequelize.define(
  "EventGudep",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    event_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "event",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
      field: "event_id",
    },
    gudep_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "gudep",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
      field: "gudep_id",
    },
    keterangan: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: "eventgudep",
  }
);

module.exports = EventGudep;
