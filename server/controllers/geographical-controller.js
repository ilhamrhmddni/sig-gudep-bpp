const { Geographical } = require("../models");

module.exports = {
  // Ambil semua data geografis
  getAllGeographical: async (req, res) => {
    try {
      const allGeographical = await Geographical.findAll();
      return res.status(200).json({
        message: "Data geografis berhasil didapatkan",
        data: allGeographical,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Terjadi kesalahan server",
        error: error.message,
      });
    }
  },

  // Ambil satu data geografis berdasarkan ID
  getGeographical: async (req, res) => {
    const { id } = req.params;

    try {
      const geographical = await Geographical.findByPk(id);

      if (!geographical) {
        return res
          .status(404)
          .json({ message: "Data geografis tidak ditemukan" });
      }

      return res.status(200).json({
        message: "Data geografis berhasil didapatkan",
        data: geographical,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Terjadi kesalahan server",
        error: error.message,
      });
    }
  },

  // Tambah data geografis
  addGeographical: async (req, res) => {
    const { titik_koordinat, longitude, latitude, alamat } = req.body;

    if (!longitude || !latitude) {
      return res.status(400).json({
        message: "Longitude dan Latitude wajib diisi",
      });
    }

    try {
      const newGeographical = await Geographical.create({
        titik_koordinat,
        longitude,
        latitude,
        alamat,
      });
      return res.status(201).json({
        message: "Data geografis berhasil ditambahkan",
        data: newGeographical,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Terjadi kesalahan server",
        error: error.message,
      });
    }
  },

  // Hapus data geografis berdasarkan ID
  deleteGeographical: async (req, res) => {
    const { id } = req.params;
    try {
      const geographical = await Geographical.findByPk(id);
      if (!geographical) {
        return res
          .status(404)
          .json({ message: "Data geografis tidak ditemukan" });
      }
      await geographical.destroy();
      return res
        .status(200)
        .json({ message: "Data geografis berhasil dihapus" });
    } catch (error) {
      return res.status(500).json({
        message: "Terjadi kesalahan server",
        error: error.message,
      });
    }
  },

  // Edit data geografis berdasarkan ID
  updateGeographical: async (req, res) => {
    const { id } = req.params;
    const { titik_koordinat, longitude, latitude, alamat } = req.body;

    try {
      const geographical = await Geographical.findByPk(id);

      if (!geographical) {
        return res
          .status(404)
          .json({ message: "Data geografis tidak ditemukan" });
      }

      if (!longitude || !latitude) {
        return res.status(400).json({
          message: "Longitude dan Latitude wajib diisi",
        });
      }

      await geographical.update({
        titik_koordinat,
        longitude,
        latitude,
        alamat,
      });

      return res.status(200).json({
        message: "Data geografis berhasil diperbarui",
        data: geographical,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Terjadi kesalahan server",
        error: error.message,
      });
    }
  },
};
