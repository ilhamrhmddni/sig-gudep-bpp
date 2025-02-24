const { EventGudep, Event, Gudep } = require("../models");

module.exports = {
  // Ambil semua data event_gudep
  getAllEventGudeps: async (req, res) => {
    try {
      const allEventGudeps = await EventGudep.findAll({
        include: [
          { model: Event, attributes: ["id", "nama"], required: true },
          { model: Gudep, attributes: ["id", "no_gudep"], required: true },
        ],
      });
      return res.status(200).json({
        message: "Data event-gudep berhasil didapatkan",
        data: allEventGudeps,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Terjadi kesalahan server",
        error: error.message,
      });
    }
  },

  // Ambil satu data event_gudep berdasarkan eventgudep_id
  getEventGudepById: async (req, res) => {
    const { id } = req.params; // Extract the parameter

    console.log("Received eventgudep_id:", id); // Log the parameter

    try {
      const eventGudep = await EventGudep.findOne({
        where: { id: id }, // Use the parameter in the query
        include: [
          { model: Event, attributes: ["id", "nama"] },
          { model: Gudep, attributes: ["id", "no_gudep"] },
        ],
      });

      if (!eventGudep) {
        return res.status(404).json({
          message: "Relasi event dan gudep tidak ditemukan",
        });
      }

      return res.status(200).json({
        message: "Data event-gudep berhasil ditemukan",
        data: eventGudep,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Terjadi kesalahan server",
        error: error.message,
      });
    }
  },

  // Tambah hubungan event dengan gudep
  addEventGudep: async (req, res) => {
    const { event_id, gudep_id } = req.body;

    if (!event_id || !gudep_id) {
      return res.status(400).json({
        message: "Event ID dan Gudep ID wajib diisi",
      });
    }

    try {
      const newEventGudep = await EventGudep.create({ event_id, gudep_id });
      return res.status(201).json({
        message: "Relasi event dan gudep berhasil ditambahkan",
        data: newEventGudep,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Terjadi kesalahan server",
        error: error.message,
      });
    }
  },

  // Edit hubungan event dengan gudep
  updateEventGudep: async (req, res) => {
    const { id } = req.params; // Get eventgudep_id from params
    const { newevent_id, newgudep_id, keterangan } = req.body;

    try {
      const eventGudep = await EventGudep.findOne({
        where: { id: id }, // Use eventgudep_id to find the record
      });

      if (!eventGudep) {
        return res.status(404).json({
          message: "Relasi event dan gudep tidak ditemukan",
        });
      }

      // Update only if new values are provided
      if (newevent_id !== undefined) {
        eventGudep.event_id = newevent_id;
      }
      if (newgudep_id !== undefined) {
        eventGudep.gudep_id = newgudep_id;
      }
      if (keterangan !== undefined) {
        eventGudep.keterangan = keterangan; // Update keterangan if provided
      }

      await eventGudep.save();

      return res.status(200).json({
        message: "Relasi event dan gudep berhasil diperbarui",
        data: eventGudep,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Terjadi kesalahan server",
        error: error.message,
      });
    }
  },

  // Hapus hubungan event dengan gudep
  deleteEventGudep: async (req, res) => {
    const { id } = req.params; // Get eventgudep_id from params

    try {
      const eventGudep = await EventGudep.findOne({
        where: { id: id }, // Use eventgudep_id to find the record
      });

      if (!eventGudep) {
        return res.status(404).json({
          message: "Relasi event dan gudep tidak ditemukan",
        });
      }

      await eventGudep.destroy();
      return res.status(200).json({
        message: "Relasi event dan gudep berhasil dihapus",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Terjadi kesalahan server",
        error: error.message,
      });
    }
  },
};
