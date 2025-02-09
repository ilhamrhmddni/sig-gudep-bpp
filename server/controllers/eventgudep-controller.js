const { EventGudep, Event, Gudep } = require("../models");

module.exports = {
  // Ambil semua data event_gudep
  getAllEventGudeps: async (req, res) => {
    try {
      const allEventGudeps = await EventGudep.findAll({
        include: [
          { model: Event, attributes: ["id", "nama"] },
          { model: Gudep, attributes: ["id", "nama"] },
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

  // Ambil satu data event_gudep berdasarkan eventId dan gudepId
  getEventGudepById: async (req, res) => {
    const { eventId, gudepId } = req.params;

    try {
      const eventGudep = await EventGudep.findOne({
        where: { eventId, gudepId },
        include: [
          { model: Event, attributes: ["id", "nama"] },
          { model: Gudep, attributes: ["id", "nama"] },
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
    const { eventId, gudepId } = req.body;

    if (!eventId || !gudepId) {
      return res.status(400).json({
        message: "Event ID dan Gudep ID wajib diisi",
      });
    }

    try {
      const newEventGudep = await EventGudep.create({ eventId, gudepId });
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
    const { eventId, gudepId } = req.params;
    const { newEventId, newGudepId } = req.body;

    try {
      const eventGudep = await EventGudep.findOne({
        where: { eventId, gudepId },
      });

      if (!eventGudep) {
        return res.status(404).json({
          message: "Relasi event dan gudep tidak ditemukan",
        });
      }

      eventGudep.eventId = newEventId || eventGudep.eventId;
      eventGudep.gudepId = newGudepId || eventGudep.gudepId;

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
    const { eventId, gudepId } = req.params;

    try {
      const eventGudep = await EventGudep.findOne({
        where: { eventId, gudepId },
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
