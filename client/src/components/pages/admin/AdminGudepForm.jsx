import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // For routing
import AdminTemplate from "../../templates/AdminTemplate";
import {
  createGugusdepan,
  fetchGugusdepanId,
  editGugusdepan,
} from "../../../services/GugusdepanService"; // Importing necessary services

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
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const data = await fetchGugusdepanId(id); // Fetch existing data for editing
          setFormData({
            ...data,
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
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">
          {id ? "Edit Gugusdepan" : "Add Gugusdepan"}
        </h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Kode</label>
            <input
              type="text"
              name="kode"
              value={formData.kode}
              onChange={handleChange}
              required
              className="border rounded p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Nama</label>
            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              required
              className="border rounded p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Ketua</label>
            <input
              type="text"
              name="ketua"
              value={formData.ketua}
              onChange={handleChange}
              required
              className="border rounded p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Jumlah Anggota</label>
            <input
              type="number"
              name="jumlah_anggota"
              value={formData.jumlah_anggota}
              onChange={handleChange}
              required
              className="border rounded p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="border rounded p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Jumlah Putra</label>
            <input
              type="number"
              name="jumlah_putra"
              value={formData.jumlah_putra}
              onChange={handleChange}
              required
              className="border rounded p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Jumlah Putri</label>
            <input
              type="number"
              name="jumlah_putri"
              value={formData.jumlah_putri}
              onChange={handleChange}
              required
              className="border rounded p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Tahun Update</label>
            <input
              type="date"
              name="tahun_update"
              value={formData.tahun_update}
              onChange={handleChange}
              required
              className="border rounded p-2 w-full"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white rounded p-2">
            {id ? "Update Gugusdepan" : "Add Gugusdepan"}
          </button>
        </form>
      </div>
    </AdminTemplate>
  );
};

export default AdminGudepForm;
