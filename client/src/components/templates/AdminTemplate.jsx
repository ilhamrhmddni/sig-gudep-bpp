import React, { useState } from "react";
import SidebarMenu from "../organisms/SidebarMenu"; // Sidebar
import Header from "../organisms/Header"; // Import Header

const AdminTemplate = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Array menu dengan ikon
  const menuItems = [
    { name: "Kwarran", icon: "splitscreen", path: "/admin/kwarran" },
    { name: "Operator", icon: "person", path: "/admin/operator" },
    { name: "Gugus Depan", icon: "school", path: "/admin/gugusdepan" },
    { name: "Geografis", icon: "map", path: "/admin/geografis" },
    { name: "Event", icon: "event", path: "/admin/event" },
    { name: "Prestasi", path: "/admin/prestasi", icon: "star" },
    { name: "Peserta Didik", icon: "people", path: "/admin/pesertadidik" },
    {
      name: "Laporan Gudep",
      icon: "assignment",
      path: "/admin/laporangudep",
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
      >
        {/* Header */}
        <Header title="Dashboard Admin" />

        {/* Konten halaman utama */}
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default AdminTemplate;
