const { User, Gudep, Geografis } = require("../models");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const secretKey = process.env.JWT_SECRET || "secretKey";
const apiKey = process.env.API_KEY; // Access the API key

module.exports = {
  login: async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email dan password wajib diisi" });
    }

    try {
      // Example of using the API key to make a request to an external service
      const apiResponse = await fetch(
        "https://sig-gudep-bpp-server.vercel.app/auth/login",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${apiKey}`, // Use the API key in the request
          },
        }
      );

      // Check if the API request was successful
      if (!apiResponse.ok) {
        return res
          .status(500)
          .json({ message: "Failed to authenticate with external API" });
      }

      // Check user credentials
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(404).json({ message: "User  tidak ditemukan" });
      }

      // Check password directly without encryption (not recommended for production)
      if (user.password !== password) {
        return res.status(401).json({ message: "Password salah" });
      }

      // Check if user is already logged in on another device
      if (user.isLoggedIn) {
        return res
          .status(403)
          .json({ message: "Akun ini sedang digunakan di perangkat lain" });
      }

      // Mark user as logged in
      await user.update({ isLoggedIn: true });

      // Find related Gudep
      const gudep = await Gudep.findOne({ where: { user_id: user.id } });
      if (!gudep) {
        return res.status(404).json({ message: "Gudep tidak ditemukan" });
      }

      // Find Geografis based on gudep_id
      const geografis = await Geografis.findOne({
        where: { gudep_id: gudep.id },
      });
      if (!geografis) {
        return res.status(404).json({ message: "Geografis tidak ditemukan" });
      }

      // Create JWT token
      const token = jwt.sign({ user_id: user.id, role: user.role }, secretKey, {
        expiresIn: "7d",
      });

      // Determine redirect URL based on role
      const redirectUrl =
        user.role === "admin" ? "admin/kwarran" : "operator/gugusdepan";

      // Send response to front-end with user ID, gudep, and geografis
      res.status(200).json({
        message: "Login berhasil",
        token,
        redirectUrl,
        gudep_id: gudep.id,
        geografis_id: geografis.id,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Terjadi kesalahan server", error: error.message });
    }
  },
  logout: async (req, res) => {
    try {
      const userId = req.user.user_id; // Get user_id from token

      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: "User  tidak ditemukan" });
      }

      await user.update({ isLoggedIn: false }); // Update isLoggedIn status
      res.status(200).json({ message: "Logout berhasil" });
    } catch (error) {
      console.error("Error during logout:", error);
      res.status(500).json({ message: "Gagal logout", error: error.message });
    }
  },
};
