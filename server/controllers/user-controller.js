const { User } = require("../models");

module.exports = {
  // Ambil semua user
  getAllUser: async (req, res) => {
    try {
      const allUser = await User.findAll();
      return res.status(200).json({
        message: "Data users berhasil didapatkan",
        data: allUser,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Terjadi kesalahan server",
        error: error.message,
      });
    }
  },

  getUser: async (req, res) => {
    const { id } = req.params;

    try {
      const user = await User.findByPk(id); // Mengambil semua user tanpa produk terkait

      return res.status(200).json({
        message: `Data user berhasil didapatkan`,
        data: user,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Terjadi kesalahan server",
        error: error.message,
      });
    }
  },

  // Tambah user oleh admin
  addUser: async (req, res) => {
    const {
      username,
      email,
      password,
      role,
      fullname,
      asal,
      no_telp,
      photo_path,
    } = req.body;

    try {
      // Cek jika email atau username sudah ada
      const existingUser = await User.findOne({
        where: { email },
      });

      if (existingUser) {
        return res.status(400).json({
          message: "Email sudah terdaftar",
        });
      }

      const newUser = await User.create({
        username,
        email,
        password, // Tidak perlu mengenkripsi password
        role,
        fullname,
        asal,
        no_telp,
        photo_path,
      });

      return res.status(201).json({
        message: "User berhasil ditambahkan",
        data: newUser,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Terjadi kesalahan server",
        error: error.message,
      });
    }
  },

  // Hapus user oleh admin
  deleteUser: async (req, res) => {
    const { id } = req.params; // Ambil ID user dari parameter

    try {
      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({
          message: "User tidak ditemukan",
        });
      }

      await user.destroy(); // Menghapus user

      return res.status(200).json({
        message: "User berhasil dihapus",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Terjadi kesalahan server",
        error: error.message,
      });
    }
  },

  // Edit user oleh admin
  updateUser: async (req, res) => {
    const { id } = req.params; // Ambil ID user dari parameter
    const {
      username,
      email,
      password,
      role,
      fullname,
      asal,
      no_telp,
      photo_path,
    } = req.body;

    try {
      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({
          message: "User tidak ditemukan",
        });
      }

      // Perbarui data user
      await user.update({
        username,
        email,
        password, // Tidak perlu mengenkripsi password
        role,
        fullname,
        asal,
        no_telp,
        photo_path,
      });

      return res.status(200).json({
        message: "User berhasil diperbarui",
        data: user,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Terjadi kesalahan server",
        error: error.message,
      });
    }
  },
};
