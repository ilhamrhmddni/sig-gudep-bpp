import React from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/AuthService";
import Swal from "sweetalert2";

const SidebarMenu = ({
  isOpen,
  toggleMenu,
  menuItems,
  currentPath,
  rightIcon,
}) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const result = await logout(); // Call the logout function

      if (result.success) {
        // Check if the logout was successful
        localStorage.clear(); // Clear all items from local storage
        navigate("/login"); // Redirect to the login page

        // Optionally, show a success message
        Swal.fire({
          icon: "success",
          title: "Logout Berhasil",
          text: "Anda telah berhasil logout.",
        });
      } else {
        console.error("Logout failed:", result.message); // Log the error message
        Swal.fire({
          icon: "error",
          title: "Logout Gagal",
          text: result.message || "Terjadi kesalahan saat logout.",
        });
      }
    } catch (error) {
      console.error("Error during logout:", error); // Log any unexpected errors
      Swal.fire({
        icon: "error",
        title: "Terjadi Kesalahan",
        text: "Terjadi kesalahan saat logout: " + error.message,
      });
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
      <div>
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
      </div>{" "}
      {/* Menampilkan ikon di kanan */}
      <div className="md:mt-48 lg:mt-54 xl:mt-96 flex-grow">{rightIcon}</div>
      {/* Tombol Logout di bagian bawah */}
      <div className="flex flex-col items-center mb-4">
        <button
          onClick={handleLogout}
          className="w-[50%] p-1 text-[#9500FF] font-bold bg-white rounded hover:bg-[#9500FF] hover:text-white hover:border-white border-1 transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default SidebarMenu;
