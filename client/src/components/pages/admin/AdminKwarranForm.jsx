// src/pages/KwarranForm.js
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchKwarranId,
  createKwarran,
  editKwarran,
} from "../../../services/KwarranService";
import AdminTemplate from "../../templates/AdminTemplate";

const KwarranForm = ({ isEdit }) => {
  const [kode, setKode] = useState("");
  const [nama, setNama] = useState("");
  const [ketuaKwarran, setKetuaKwarran] = useState("");
  const [ketuaDkr, setKetuaDkr] = useState("");
  const [jumlahGudep, setJumlahGudep] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { id } = useParams(); // Ambil ID dari URL

  // Fetch data if it's an edit case
  useEffect(() => {
    if (isEdit && id) {
      const fetchData = async () => {
        try {
          const result = await fetchKwarranId(id); // Pastikan ini memanggil fungsi yang benar
          const { data } = result; // Pastikan data diambil dengan benar
          console.log(result); // Debugging: lihat hasil yang diterima
          setKode(data.kode);
          setNama(data.nama);
          setKetuaKwarran(data.ketua_kwarran);
          setKetuaDkr(data.ketua_dkr);
          setJumlahGudep(data.jumlah_gudep);
          setEmail(data.email);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }
  }, [id, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Show confirmation popup
    const confirmSubmit = window.confirm(
      isEdit
        ? "Are you sure you want to update the Kwarran data?"
        : "Are you sure you want to save this new Kwarran?"
    );

    if (confirmSubmit) {
      const newData = {
        kode,
        nama,
        ketua_kwarran: ketuaKwarran,
        ketua_dkr: ketuaDkr,
        jumlah_gudep: jumlahGudep,
        email,
      };

      try {
        if (isEdit && id) {
          // Update the Kwarran data
          await editKwarran(id, newData);
          console.log("Updated Kwarran data:", newData);
        } else {
          // Create a new Kwarran
          await createKwarran(newData);
          console.log("New Kwarran data:", newData);
        }

        // Redirect after submit
        navigate("/admin/kwarran");
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    } else {
      console.log("Form submission canceled.");
    }
  };

  return (
    <AdminTemplate>
      <div className="flex flex-auto items-center justify-center">
        <div className="p-8 bg-white rounded-lg shadow-xl text-left">
          <h1 className="text-2xl font-bold mb-6 mx-96">
            {isEdit ? "Edit Data Kwarran" : "Tambah Data Kwarran"}
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4 ">
            <div className="flex flex-col">
              <label className="mb-1 font-semibold ">Kode</label>
              <input
                type="text"
                value={kode || ""}
                onChange={(e) => setKode(e.target.value)}
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9500FF]"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-semibold">Name</label>
              <input
                type="text"
                value={nama || ""}
                onChange={(e) => setNama(e.target.value)}
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9500FF]"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-semibold">Ketua Kwarran</label>
              <input
                type="text"
                value={ketuaKwarran || ""}
                onChange={(e) => setKetuaKwarran(e.target.value)}
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9500FF]"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-semibold">Ketua DKR</label>
              <input
                type="text"
                value={ketuaDkr || ""}
                onChange={(e) => setKetuaDkr(e.target.value)}
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9500FF]"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-semibold">Jumlah Gudep</label>
              <input
                type="number"
                value={jumlahGudep || ""}
                onChange={(e) => setJumlahGudep(e.target.value)}
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9500FF]"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-semibold">Email</label>
              <input
                type="email"
                value={email || ""}
                onChange={(e) => setEmail(e.target.value)}
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9500FF]"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#9500FF] text-white font-bold p-3 my-6 rounded-md hover:bg-[#9500FF] transition duration-200"
            >
              {isEdit ? "Update" : "Save"}
            </button>
          </form>
        </div>
      </div>
    </AdminTemplate>
  );
};

export default KwarranForm;
