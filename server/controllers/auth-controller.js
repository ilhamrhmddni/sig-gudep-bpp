const { User, Gudep, Geografis } = require("../models");
const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET || "secretKey";

module.exports = {
  login: async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email dan password wajib diisi" });
    }

    try {
      // Cari user berdasarkan email
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(404).json({ message: "User tidak ditemukan" });
      }

      // Cek password langsung tanpa enkripsi
      if (user.password !== password) {
        return res.status(401).json({ message: "Password salah" });
      }

      // Cek apakah user sudah login di perangkat lain
      if (user.isLoggedIn) {
        return res
          .status(403)
          .json({ message: "Akun ini sedang digunakan di perangkat lain" });
      }

      // Tandai user sebagai login
      await user.update({ isLoggedIn: true });

      // Cari Gudep yang berelasi dengan user
      const gudep = await Gudep.findOne({ where: { user_id: user.id } });
      if (!gudep) {
        return res.status(404).json({ message: "Gudep tidak ditemukan" });
      }

      // Cari Geografis berdasarkan gudep_id
      const geografis = await Geografis.findOne({
        where: { gudep_id: gudep.id },
      });
      if (!geografis) {
        return res.status(404).json({ message: "Geografis tidak ditemukan" });
      }

      // Buat token JWT
      const token = jwt.sign({ user_id: user.id, role: user.role }, secretKey);

      // Tentukan URL tujuan berdasarkan peran
      const redirectUrl =
        user.role === "admin" ? "admin/kwarran" : "operator/gugusdepan";

      // Kirim respons ke front-end dengan ID user, gudep, dan geografis
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
      const userId = req.user.user_id; // Ambil user_id dari token

      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: "User  tidak ditemukan" });
      }

      await user.update({ isLoggedIn: false }); // Perbarui status isLoggedIn
      res.status(200).json({ message: "Logout berhasil" });
    } catch (error) {
      console.error("Error during logout:", error);
      res.status(500).json({ message: "Gagal logout", error: error.message });
    }
  },
};
