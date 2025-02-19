import React from "react";
import AdminTemplate from "../../templates/AdminTemplate";

const AdminEvent = () => {
  return (
    <AdminTemplate>
      <div className="p-4 mx-16">
        <h1 className="text-2xl font-bold">Dashboard Event</h1>
        <p className="mt-4">Selamat datang di dashboard Event!</p>
        {/* Tambahkan konten dashboard lainnya di sini */}
      </div>
    </AdminTemplate>
  );
};

export default AdminEvent;
