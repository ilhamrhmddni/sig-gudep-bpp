import React, { useState } from "react";
import SidebarMenuUser from "../organisms/SidebarMenuUser"; // Mengimpor Sidebar
import HeaderUser from "../organisms/HeaderUser";

const UserTemplate = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Array menu dengan ikon
  const menuItems = [
    {
      name: "Dashboard",
      icon: "home", // Nama ikon dari Google Icons
      path: "/",
    },
    {
      name: "Data Gugus Depan",
      icon: "map", // Nama ikon dari Google Icons
      path: "/gugusdepan",
    },
    {
      name: "Form Laporan",
      icon: "star", // Nama ikon dari Google Icons
      path: "/laporan",
    },
  ];
  // Mendapatkan path saat ini
  const currentPath = window.location.pathname;

  return (
    <div className="h-screen flex">
      {/* Sidebar Menu */}
      <SidebarMenuUser
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
        <HeaderUser title="Dashboard User" />
        {/* Konten halaman utama */}
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default UserTemplate;
