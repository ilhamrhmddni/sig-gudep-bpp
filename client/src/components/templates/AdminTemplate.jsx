import React, { useState } from "react";
import SidebarMenu from "../moleculs/SidebarMenu"; // Mengimpor Sidebar

const AdminTemplate = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Array menu dengan ikon
  const menuItems = [
    {
      name: "Kwarran",
      icon: "splitscreen", // Nama ikon dari Google Icons
      path: "/admin/kwarran", // Ganti dengan path yang sesuai
    },
    {
      name: "Operator",
      icon: "person", // Nama ikon dari Google Icons
      path: "/admin/operator", // Ganti dengan path yang sesuai
    },
    {
      name: "Gugus Depan",
      icon: "school", // Nama ikon dari Google Icons
      path: "/admin/gugus-depan", // Ganti dengan path yang sesuai
    },
    {
      name: "Geografis",
      icon: "map", // Nama ikon dari Google Icons
      path: "/admin/geografis", // Ganti dengan path yang sesuai
    },
    {
      name: "Event",
      icon: "event", // Nama ikon dari Google Icons
      path: "/admin/event", // Ganti dengan path yang sesuai
    },
    {
      name: "Peserta Didik",
      icon: "people", // Nama ikon dari Google Icons
      path: "/admin/pesertadidik", // Ganti dengan path yang sesuai
    },
    {
      name: "Request Laporan Gudep",
      icon: "assignment", // Nama ikon dari Google Icons
      path: "/admin/request-laporan-gudep", // Ganti dengan path yang sesuai
    },
  ];

  // Mendapatkan path saat ini
  const currentPath = window.location.pathname;

  return (
    <div className="h-screen flex">
      {/* Sidebar Menu */}
      <SidebarMenu
        isOpen={isOpen}
        toggleMenu={toggleMenu}
        menuItems={menuItems}
        currentPath={currentPath}
      />
      {/* Konten utama */}
      <div
        className={`transition-all duration-300 w-full ${
          isOpen ? "ml-[210px]" : "ml-0"
        }`}
        style={{
          transition: "margin-left 0.3s ease",
        }}
      >
        {/* Konten halaman utama */}
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default AdminTemplate;
