const Sequelize = require("sequelize");
const sequelize = require("../config/db");

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./User");
db.PesertaDidik = require("./PesertaDidik");
db.Geographical = require("./Geographical");
db.Kwarran = require("./Kwarran");
db.Laporan = require("./Laporan");
db.Gudep = require("./Gudep");
db.Event = require("./Event");
db.EventGudep = require("./EventGudep");

// **Relasi Foreign Key**
db.Gudep.belongsTo(db.User, { foreignKey: "user_id", onDelete: "CASCADE" });
db.Gudep.belongsTo(db.Kwarran, {
  foreignKey: "kwarran_id",
  onDelete: "CASCADE",
});
db.Gudep.belongsTo(db.Geografis, {
  foreignKey: "geografis_id",
  onDelete: "CASCADE",
});

// Relasi Many-to-Many
db.Event.belongsToMany(db.Gudep, {
  through: db.EventGudep,
  foreignKey: "eventId",
});
db.Gudep.belongsToMany(db.Event, {
  through: db.EventGudep,
  foreignKey: "gudepId",
});

module.exports = db;
