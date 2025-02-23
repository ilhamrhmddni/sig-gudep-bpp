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

// Ketika User dibuat, otomatis buat Geografis dan Gudep
User.afterCreate(async (user, options) => {
  console.log(`🟢 User Created Hook Triggered for: ${user.id}`);

  const transaction = await sequelize.transaction(); // Buat transaksi

  try {
    // Cek apakah Gudep sudah ada untuk user ini
    const existingGudep = await Gudep.findOne({
      where: { user_id: user.id },
      transaction,
    });

    if (!existingGudep) {
      const gudep = await Gudep.create({ user_id: user.id }, { transaction });
      console.log("🟢 Gudep Created:", gudep.id);

      const geografis = await Geografis.create(
        { gudep_id: gudep.id },
        { transaction }
      );
      console.log("🟢 Geografis Created for Gudep:", geografis.id);

      await transaction.commit(); // Simpan semua perubahan
      console.log("✅ Geografis dan Gudep berhasil dibuat secara otomatis.");
    } else {
      console.log("⚠️ Gudep sudah ada, tidak membuat lagi.");
      await transaction.rollback(); // Batalkan jika tidak perlu membuat
    }
  } catch (error) {
    console.error("❌ Error creating Gudep/Geografis:", error);
    await transaction.rollback(); // Rollback jika ada error
  }
});

module.exports = User;
