// src/components/OperatorPesertaDidikForm.js
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchPesertadidikById,
  createPesertadidik,
  editPesertadidik,
} from "../../../services/PesertadidikService"; // Update with your service methods
import Swal from "sweetalert2";
import OperatorTemplate from "../../templates/OperatorTemplate"; // Import the OperatorTemplate

const OperatorPesertaDidikForm = ({ isEdit }) => {
  const [formData, setFormData] = useState({
    nama: "",
    gender: "",
    ttl: "",
    detailtingkatan: "",
    gudep_id: localStorage.getItem("gudep_id") || "", // Get gudep_id from local storage
  });
  const navigate = useNavigate();
  const { id } = useParams(); // Get ID from URL

  // Fetch data if it's an edit case
  useEffect(() => {
    if (isEdit && id) {
      const fetchData = async () => {
        try {
          const result = await fetchPesertadidikById(id); // Ensure this function is correct
          const { data } = result; // Ensure data is retrieved correctly
          setFormData({
            nama: data.nama || "",
            gender: data.gender || "",
            ttl: data.ttl || "",
            detailtingkatan: data.detailtingkatan || "",
            gudep_id: data.gudep_id || "", // Set gudep_id from fetched data
          });
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Show confirmation popup
    const confirmSubmit = window.confirm(
      isEdit
        ? "Are you sure you want to update the participant data?"
        : "Are you sure you want to save this new participant?"
    );

    if (confirmSubmit) {
      try {
        if (isEdit && id) {
          // Update the participant data
          await editPesertadidik(id, formData);
        } else {
          // Create a new participant
          await createPesertadidik(formData);
        }

        // Redirect after submit
        navigate("/operator/pesertadidik");
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    } else {
      console.log("Form submission canceled.");
    }
  };

  return (
    <OperatorTemplate>
      <div className="flex flex-auto items-center justify-center">
        <div className="p-8 bg-white rounded-lg shadow-xl text-left">
          <h1 className="text-2xl font-bold mb-6 mx-96">
            {isEdit ? "Edit Peserta Didik" : "Add Peserta Didik"}
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label className="mb-1 font-semibold">Nama Peserta Didik</label>
              <input
                type="text"
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9500FF]"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-semibold">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9500FF]"
                required
              >
                <option value="" disabled>
                  Jenis Kelamin
                </option>
                <option value="Perempuan">Perempuan</option>
                <option value="Laki-laki">Laki-laki</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-semibold">
                Tempat, Tanggal Lahir
              </label>
              <input
                type="text"
                name="ttl"
                value={formData.ttl}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9500FF]"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-semibold">Detail Tingkatan</label>
              <input
                type="text"
                name="detailtingkatan"
                value={formData.detailtingkatan}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9500FF]"
                required
              />
            </div>
            <input
              type="hidden"
              name="gudep_id"
              value={formData.gudep_id} // Include gudep_id in the form data
            />
            <button
              type="submit"
              className="w-full bg-[#9500FF] text-white font-bold p-3 my-6 rounded-md hover:bg-[#9500FF] transition duration-200"
            >
              {isEdit ? "Update" : "Save"}
            </button>
          </form>
        </div>
      </div>
    </OperatorTemplate>
  );
};

export default OperatorPesertaDidikForm;
