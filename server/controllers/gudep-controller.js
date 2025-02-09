const { Gudep } = require("../models");

module.exports = {
  // ✅ Ambil semua Gudep
  getAllGudep: async (req, res) => {
    try {
      const allGudep = await Gudep.findAll();
      return res.status(200).json({
        message: "Data Gudep berhasil didapatkan",
        data: allGudep,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Terjadi kesalahan server",
        error: error.message,
      });
    }
  },

  // ✅ Ambil Gudep berdasarkan ID
  getGudep: async (req, res) => {
    const { id } = req.params;

    try {
      const gudep = await Gudep.findByPk(id);

      if (!gudep) {
        return res.status(404).json({ message: "Gudep tidak ditemukan" });
      }

      return res.status(200).json({
        message: "Data Gudep berhasil didapatkan",
        data: gudep,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Terjadi kesalahan server",
        error: error.message,
      });
    }
  },

  // ✅ Tambah Gudep
  addGudep: async (req, res) => {
    const {
      user_id,
      kwarran_id,
      geografis_id,
      no_gudep,
      tingkatan,
      mabigus,
      pembina,
      pelatih,
      email,
      tahun_update,
      jumlah_putra,
      jumlah_putri,
    } = req.body;

    if (!no_gudep || !tingkatan) {
      return res
        .status(400)
        .json({ message: "Nomor Gudep dan Tingkatan wajib diisi" });
    }

    try {
      const newGudep = await Gudep.create({
        user_id,
        kwarran_id,
        geografis_id,
        no_gudep,
        tingkatan,
        mabigus,
        pembina,
        pelatih,
        email,
        tahun_update,
        jumlah_putra,
        jumlah_putri,
      });

      return res.status(201).json({
        message: "Gudep berhasil ditambahkan",
        data: newGudep,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Terjadi kesalahan server",
        error: error.message,
      });
    }
  },

  // ✅ Update Gudep berdasarkan ID
  updateGudep: async (req, res) => {
    const { id } = req.params;
    const {
      user_id,
      kwarran_id,
      geografis_id,
      no_gudep,
      tingkatan,
      mabigus,
      pembina,
      pelatih,
      email,
      tahun_update,
      jumlah_putra,
      jumlah_putri,
    } = req.body;

    try {
      const gudep = await Gudep.findByPk(id);

      if (!gudep) {
        return res.status(404).json({ message: "Gudep tidak ditemukan" });
      }

      await gudep.update({
        user_id,
        kwarran_id,
        geografis_id,
        no_gudep,
        tingkatan,
        mabigus,
        pembina,
        pelatih,
        email,
        tahun_update,
        jumlah_putra,
        jumlah_putri,
      });

      return res.status(200).json({
        message: "Data Gudep berhasil diperbarui",
        data: gudep,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Terjadi kesalahan server",
        error: error.message,
      });
    }
  },

  // ✅ Hapus Gudep berdasarkan ID
  deleteGudep: async (req, res) => {
    const { id } = req.params;
    try {
      const gudep = await Gudep.findByPk(id);
      if (!gudep) {
        return res.status(404).json({ message: "Gudep tidak ditemukan" });
      }
      await gudep.destroy();
      return res.status(200).json({ message: "Data Gudep berhasil dihapus" });
    } catch (error) {
      return res.status(500).json({
        message: "Terjadi kesalahan server",
        error: error.message,
      });
    }
  },
};
