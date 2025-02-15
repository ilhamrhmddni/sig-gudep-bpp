const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Kwarran = require("./Kwarran");

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
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "user",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
      field: "user_id", // Tambahkan ini
    },
    kwarran_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "kwarran",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
      field: "kwarran_id", // Tambahkan ini
    },
    no_gudep: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tingkatan: {
      type: DataTypes.ENUM("Siaga", "Penggalang", "Penegak", "Pandega"),
      defaultValue: "Penegak",
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
      validate: {
        isEmail: true, // Validasi agar hanya menerima email yang valid
      },
    },
    tahun_update: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.NOW,
    },
    jumlah_putra: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 0, // Tidak boleh negatif
      },
    },
    jumlah_putri: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 0, // Tidak boleh negatif
      },
    },
  },
  {
    sequelize,
    timestamps: true, // Tambahkan createdAt & updatedAt
    freezeTableName: true, // Table name tidak akan diubah ke bentuk jamak
    tableName: "gudep",
  }
);

// 🔹 **Function untuk update jumlah_gudep di Kwarran**
async function updateJumlahGudep(kwarran_id) {
  if (!kwarran_id) return;

  const jumlahGudep = await Gudep.count({ where: { kwarran_id } });
  await Kwarran.update(
    { jumlah_gudep: jumlahGudep },
    { where: { id: kwarran_id } }
  );
}

// 🔹 **Hook setelah CREATE Gudep**
Gudep.afterCreate(async (gudep, options) => {
  await updateJumlahGudep(gudep.kwarran_id);
});

// 🔹 **Hook setelah DELETE Gudep**
Gudep.afterDestroy(async (gudep, options) => {
  await updateJumlahGudep(gudep.kwarran_id);
});

// 🔹 **Hook setelah UPDATE Gudep (jika pindah Kwarran)**
Gudep.afterUpdate(async (gudep, options) => {
  if (gudep.changed("kwarran_id")) {
    await updateJumlahGudep(gudep.previous("kwarran_id")); // Kwarran lama
    await updateJumlahGudep(gudep.kwarran_id); // Kwarran baru
  }
});

module.exports = Gudep;
