// src/pages/AdminGudepForm.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // For routing
import AdminTemplate from "../../templates/AdminTemplate";
import {
  createGugusdepan,
  fetchGugusdepanId,
  editGugusdepan,
} from "../../../services/GugusdepanService"; // Importing necessary services
import { fetchKwarran } from "../../../services/KwarranService";

const AdminGudepForm = () => {
  const { id } = useParams(); // Get the ID from the URL parameters
  const navigate = useNavigate(); // Hook for navigation
  const [formData, setFormData] = useState({
    kode: "",
    nama: "",
    ketua: "",
    jumlah_anggota: 0,
    email: "",
    jumlah_putra: 0,
    jumlah_putri: 0,
    tahun_update: new Date().toISOString().split("T")[0], // Set current date as default
    kwarran_id: "", // State for selected Kwarran
  });
  const [kwarranList, setKwarranList] = useState([]); // State for Kwarran list
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchKwarranData = async () => {
      try {
        const result = await fetchKwarran(); // Fetch Kwarran data
        setKwarranList(result.data || []); // Set Kwarran list
      } catch (error) {
        console.error("Error fetching Kwarran data:", error);
      }
    };

    fetchKwarranData();
  }, []);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const result = await fetchGugusdepanId(id); // Fetch existing data for editing
          setFormData({
            ...result.data,
            tahun_update: new Date().toISOString().split("T")[0], // Update the year to the current date
          });
        } catch (error) {
          setError("Error fetching Gugusdepan data.");
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    } else {
      setLoading(false); // If no ID, just set loading to false
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const gugusdepanData = {
        ...formData,
        tahun_update: new Date().toISOString().split("T")[0], // Set the current date as the last update time
      };

      if (id) {
        await editGugusdepan(id, gugusdepanData); // Edit existing Gugusdepan
      } else {
        await createGugusdepan(gugusdepanData); // Create new Gugusdepan
      }

      navigate("/admin/gugusdepan"); // Redirect after submission
    } catch (error) {
      setError("Error saving Gugusdepan data.");
      console.error("Error saving data:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>; // Loading state
  }

  return (
    <AdminTemplate>
      <div className="flex flex-auto items-center justify-center">
        <div className="p-8 bg-white rounded-lg shadow-xl text-left">
          <h1 className="text-2xl font-bold mb-6 mx-96">
            {id ? "Edit Gugusdepan" : "Tambah Gugusdepan"}
          </h1>
          {error && <p className="text-red-500">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label className="mb-1 font-semibold">Kode</label>
              <input
                type="text"
                name="kode"
                value={formData.kode}
                onChange={handleChange}
                required
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9500FF]"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-semibold">Nama</label>
              <input
                type="text"
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                required
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9500FF]"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-semibold">Ketua</label>
              <input
                type="text"
                name="ketua"
                value={formData.ketua}
                onChange={handleChange}
                required
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9500FF]"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-semibold">Jumlah Anggota</label>
              <input
                type="number"
                name="jumlah_anggota"
                value={formData.jumlah_anggota}
                onChange={handleChange}
                required
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9500FF]"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-semibold">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9500FF]"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-semibold">Jumlah Putra</label>
              <input
                type="number"
                name="jumlah_putra"
                value={formData.jumlah_putra}
                onChange={handleChange}
                required
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9500FF]"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-semibold">Jumlah Putri</label>
              <input
                type="number"
                name="jumlah_putri"
                value={formData.jumlah_putri}
                onChange={handleChange}
                required
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9500FF]"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-semibold">Tahun Update</label>
              <input
                type="date"
                name="tahun_update"
                value={formData.tahun_update}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9500FF]"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-semibold">Pilih Kwarran</label>
              <select
                name="kwarran_id"
                value={formData.kwarran_id}
                onChange={handleChange}
                required
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9500FF]"
              >
                <option value="" disabled>
                  Pilih Kwarran
                </option>
                {kwarranList.map((kwarran) => (
                  <option key={kwarran.id} value={kwarran.id}>
                    {kwarran.nama}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="mt-4 bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 transition duration-200"
            >
              {id ? "Update Gugusdepan" : "Buat Gugusdepan"}
            </button>
          </form>
        </div>
      </div>
    </AdminTemplate>
  );
};

export default AdminGudepForm;
