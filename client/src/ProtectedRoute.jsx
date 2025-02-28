import React from "react";
import { Navigate } from "react-router-dom";
import NotFound from "./components/pages/NotFound";

const ProtectedRoute = ({ children, allowedRole }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Debugging Log
  console.log("ProtectedRoute Mounted");
  console.log("Token:", token);
  console.log("Role:", role);
  console.log("Allowed Role:", allowedRole);

  // Jika token tidak ada, redirect ke login
  if (!token) {
    console.log("Tidak ada token, redirect ke login.");
    return <Navigate to="/login" replace />;
  }

  // Cek apakah role pengguna termasuk dalam daftar role yang diizinkan
  const hasAccess = Array.isArray(allowedRole)
    ? allowedRole.includes(role)
    : role === allowedRole;

  if (!hasAccess) {
    console.log("Akses ditolak, menampilkan NotFound.");
    return <NotFound />;
  }

  console.log("Akses diberikan, menampilkan halaman.");
  return children;
};

export default ProtectedRoute;
