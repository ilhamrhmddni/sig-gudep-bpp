import React from "react";
import AdminTemplate from "../../templates/AdminTemplate";

const AdminOperator = () => {
  return (
    <AdminTemplate>
      <div className="p-4 mx-16">
        <h1 className="text-2xl font-bold">Dashboard Operator</h1>
        <p className="mt-4">Selamat datang di dashboard Operator!</p>
        {/* Tambahkan konten dashboard lainnya di sini */}
      </div>
    </AdminTemplate>
  );
};

export default AdminOperator;
