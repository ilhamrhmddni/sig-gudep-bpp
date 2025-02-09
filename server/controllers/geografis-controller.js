const { Geografis } = require("../models");

module.exports = {
  // Ambil semua data geografis
  getAllGeografis: async (req, res) => {
    try {
      const allGeografis = await Geografis.findAll();
      return res.status(200).json({
        message: "Data geografis berhasil didapatkan",
        data: allGeografis,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Terjadi kesalahan server",
        error: error.message,
      });
    }
  },

  // Ambil satu data geografis berdasarkan ID
  getGeografis: async (req, res) => {
    const { id } = req.params;

    try {
      const geografis = await Geografis.findByPk(id);

      if (!geografis) {
        return res
          .status(404)
          .json({ message: "Data geografis tidak ditemukan" });
      }

      return res.status(200).json({
        message: "Data geografis berhasil didapatkan",
        data: Geografis,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Terjadi kesalahan server",
        error: error.message,
      });
    }
  },

  // Tambah data geografis
  addGeografis: async (req, res) => {
    const { titik_koordinat, longitude, latitude, alamat } = req.body;

    if (!longitude || !latitude) {
      return res.status(400).json({
        message: "Longitude dan Latitude wajib diisi",
      });
    }

    try {
      const newGeografis = await Geografis.create({
        titik_koordinat,
        longitude,
        latitude,
        alamat,
      });
      return res.status(201).json({
        message: "Data geografis berhasil ditambahkan",
        data: newGeografis,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Terjadi kesalahan server",
        error: error.message,
      });
    }
  },

  // Hapus data geografis berdasarkan ID
  deleteGeografis: async (req, res) => {
    const { id } = req.params;
    try {
      const geografis = await Geografis.findByPk(id);
      if (!geografis) {
        return res
          .status(404)
          .json({ message: "Data geografis tidak ditemukan" });
      }
      await geografis.destroy();
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
  updateGeografis: async (req, res) => {
    const { id } = req.params;
    const { titik_koordinat, longitude, latitude, alamat } = req.body;

    try {
      const geografis = await Geografis.findByPk(id);

      if (!geografis) {
        return res
          .status(404)
          .json({ message: "Data geografis tidak ditemukan" });
      }

      if (!longitude || !latitude) {
        return res.status(400).json({
          message: "Longitude dan Latitude wajib diisi",
        });
      }

      await geografis.update({
        titik_koordinat,
        longitude,
        latitude,
        alamat,
      });

      return res.status(200).json({
        message: "Data geografis berhasil diperbarui",
        data: geografis,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Terjadi kesalahan server",
        error: error.message,
      });
    }
  },
};
