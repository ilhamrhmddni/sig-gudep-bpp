import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState("/default-profile.png");
  const [isImageError, setIsImageError] = useState(false);

  // Ambil role & username dari localStorage
  const username = localStorage.getItem("username") || "User";
  const role = localStorage.getItem("role") || "Guest";
  const userId = localStorage.getItem("user_id");

  // Ambil URL API dari .env (gunakan REACT_APP jika pakai React, atau VITE_ jika pakai Vite)
  const API_URL = "https://sig-gudep-bpp-server.vercel.app";

  // Fetch foto profil dari database
  useEffect(() => {
    const fetchProfilePic = async () => {
      if (!userId) return;

      try {
        const response = await fetch(`${API_URL}/user/${userId}`);
        const data = await response.json();

        if (response.ok && data.data && data.data.photo_path) {
          let imageUrl = data.data.photo_path.trim();

          setProfilePic(imageUrl);
        } else {
          console.warn(
            "⚠️ Gagal mengambil foto profil:",
            data.error || "photo_path kosong"
          );
        }
      } catch (error) {
        console.error("❌ Error fetching profile picture:", error);
      }
    };

    fetchProfilePic();
  }, [API_URL, userId]);

  return (
    <header className="w-full p-4 bg-white text-[#9500FF] flex items-center justify-between shadow-md">
      {/* Logo */}
      <div className="flex items-center gap-2 ml-20">
        <span className="text-xl font-bold">
          Sistem Informasi Geografis Pemetaan Gugus Depan Kota Balikpapan
        </span>
      </div>

      {/* Profil User */}
      <div className="flex items-center gap-3">
        <div className="flex flex-col text-right">
          <p className="text-sm font-semibold">{username}</p>
          <p className="text-[12px] text-[#9500FF]">{role}</p>
        </div>
        <button
          onClick={() => navigate("/admin/profile")}
          className="rounded-full border border-white p-1 transition-transform hover:border-gray-200"
        >
          <img
            src={isImageError ? "/default-profile.png" : profilePic}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover"
            referrerPolicy="no-referrer"
            onError={() => {
              setIsImageError(true); // Pakai default jika error
              console.warn("⚠️ Gambar gagal dimuat, menggunakan default.");
            }}
          />
        </button>
      </div>
    </header>
  );
};

export default Header;
