const { User } = require("../models/User.js");

module.exports = {
  getAllUser: async (req, res) => {
    try {
      const allUser = await User.findAll({ include: Product });

      return res.status(200).json({
        message: "Data user berhasil didapatkan",
        data: allUser,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Terjadi kesalah server",
        error: error.message,
      });
    }
  },
};
