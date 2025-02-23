const Sequelize = require("sequelize");
const sequelize = require("../config/db");

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// ✅ Import models
db.User = require("./User");
db.Kwarran = require("./Kwarran");
db.Gudep = require("./Gudep");
db.Geografis = require("./Geografis");
db.PesertaDidik = require("./PesertaDidik");
db.Event = require("./Event");
db.EventGudep = require("./EventGudep");
db.Laporan = require("./Laporan");

// ======================================================================
// ✅ Relasi Gudep dengan User & Kwarran (Many-to-One)
// ======================================================================

// 🔹 Setiap Gudep dimiliki oleh satu User
db.User.hasOne(db.Gudep, {
  foreignKey: "user_id",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});
db.Gudep.belongsTo(db.User, {
  foreignKey: "user_id",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});

// 🔹 Setiap Gudep hanya bisa masuk ke satu Kwarran
db.Gudep.belongsTo(db.Kwarran, {
  foreignKey: "kwarran_id",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});

// ======================================================================
// ✅ Relasi Gudep dengan Geografis (One-to-One)
// ======================================================================

// 🔹 Setiap Gudep hanya memiliki satu Geografis
db.Gudep.hasOne(db.Geografis, {
  foreignKey: "gudep_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.Geografis.belongsTo(db.Gudep, {
  foreignKey: "gudep_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

// ======================================================================
// ✅ Relasi Gudep dengan PesertaDidik (One-to-Many)
// ======================================================================

db.Gudep.hasMany(db.PesertaDidik, {
  foreignKey: "gudep_id",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});
db.PesertaDidik.belongsTo(db.Gudep, {
  foreignKey: "gudep_id",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});

// ======================================================================
// ✅ Relasi Many-to-Many Gudep dengan Event melalui EventGudep
// ======================================================================

db.EventGudep.belongsTo(db.Event, {
  foreignKey: "event_id",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});
db.EventGudep.belongsTo(db.Gudep, {
  foreignKey: "gudep_id",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});

db.Event.belongsToMany(db.Gudep, {
  through: db.EventGudep,
  foreignKey: "event_id",
});
db.Gudep.belongsToMany(db.Event, {
  through: db.EventGudep,
  foreignKey: "gudep_id",
});

// ======================================================================
// ✅ Hook untuk pembuatan otomatis Gudep dan Geografis
// ======================================================================

db.User.afterCreate(async (user) => {
  try {
    console.log(
      `🛠️ Membuat Gudep dan Geografis untuk user ${user.username}...`
    );

    const gudep = await db.Gudep.create({ user_id: user.id });
    await db.Geografis.create({ gudep_id: gudep.id });

    console.log(
      `✅ Gudep dan Geografis berhasil dibuat untuk user ${user.username}`
    );
  } catch (error) {
    console.error(`❌ Gagal membuat Gudep dan Geografis: ${error.message}`);
  }
});

// ======================================================================
// ✅ Sinkronisasi Database
// ======================================================================

(async () => {
  try {
    await sequelize.sync({ alter: true }); // Pastikan struktur tabel diperbarui
    console.log("✅ Semua tabel berhasil disinkronkan!");
  } catch (error) {
    console.error("❌ Gagal menyinkronkan tabel:", error);
  }
})();

module.exports = db;
