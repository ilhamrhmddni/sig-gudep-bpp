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
      const user = await User.findByPk(id);

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

  deleteUser: async (req, res) => {
    const { id } = req.params;

    try {
      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({
          message: "User tidak ditemukan",
        });
      }

      await user.destroy();

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

  updateUser: async (req, res) => {
    const { id } = req.params;
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

      await user.update({
        username,
        email,
        password,
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
