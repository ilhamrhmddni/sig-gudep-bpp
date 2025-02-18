import React from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/AuthService";

const SidebarMenu = ({
  isOpen,
  toggleMenu,
  menuItems,
  currentPath,
  rightIcon,
}) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await logout(); // Panggil fungsi logout
    console.log("Logout result:", result); // Log hasil logout

    if (result.message === "Logout berhasil") {
      localStorage.clear(); // Hapus semua item dari local storage
      navigate("/"); // Arahkan ke halaman utama
    } else {
      console.error("Logout failed:", result.message); // Tampilkan pesan kesalahan jika ada
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-[#9500FF] shadow-lg p-4 z-40 transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-[210px]"
      }`}
      style={{ width: "280px" }}
    >
      {/* Logo yang sebagian terlihat */}
      <div className="">
        <div
          className="w-auto h-16 bg-no-repeat"
          style={{
            backgroundImage: "url('/logo2.png')",
          }}
        ></div>
      </div>
      {/* Tombol Toggle di Dalam Sidebar */}
      <button
        onClick={toggleMenu}
        className={`absolute top-6 right-4 p-2 text-white rounded z-50 transition-all duration-300`}
      >
        {isOpen ? (
          <X size={24} className="font-bold" />
        ) : (
          <Menu size={24} className="font-bold" />
        )}
      </button>
      {/* Daftar menu */}
      <ul className="mt-10 space-y-3 text-md font-bold">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={`flex justify-between items-center cursor-pointer text-[#9500FF] hover:bg-white hover:text-[#9500FF] rounded-full p-2 pl-4 ${
              currentPath === item.path
                ? "bg-white text-[#9500FF]"
                : "text-white"
            }`} // Menambahkan kelas untuk item aktif
            onClick={() => navigate(item.path)}
          >
            <span className="flex-grow">{item.name}</span>
            {/* Menampilkan ikon di sebelah kanan nama menu */}
            <span className="material-icons">{item.icon}</span>
          </li>
        ))}
      </ul>
      {/* Menampilkan ikon di kanan */}
      <div className="mt-10">{rightIcon}</div>
      {/* Menampilkan tombol logout di bawah ikon */}
      <button
        onClick={handleLogout}
        className="mt-10 w-full p-2 text-[#9500FF] font-bold bg-white rounded hover:bg-red-600 transition duration-300"
      >
        Logout
      </button>
    </div>
  );
};

export default SidebarMenu;
