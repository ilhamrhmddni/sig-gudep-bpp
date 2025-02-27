import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createPesertadidik,
  editPesertadidik,
  fetchPesertadidikById,
} from "../../../services/PesertadidikService";
import {
  editGugusdepan,
  fetchGugusdepanId,
} from "../../../services/GugusdepanService"; // Import fungsi untuk edit gugusdepan
import Swal from "sweetalert2";
import OperatorTemplate from "../../templates/OperatorTemplate";

const OperatorPesertaDidikForm = ({ isEdit }) => {
  const [formData, setFormData] = useState({
    nama: "",
    gender: "",
    ttl: "",
    detailtingkatan: "",
    gudep_id: localStorage.getItem("gudep_id") || "", // Ambil gudep_id dari local storage
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (isEdit && id) {
      const fetchData = async () => {
        try {
          const result = await fetchPesertadidikById(id);
          const { data } = result;
          setFormData({
            nama: data.nama || "",
            gender: data.gender || "",
            ttl: data.ttl || "",
            detailtingkatan: data.detailtingkatan || "",
            gudep_id: data.gudep_id || "",
          });
        } catch (error) {
          console.error("Error fetching data:", error);
          Swal.fire("Error!", "Gagal mengambil data peserta didik.", "error");
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

    const confirmSubmit = window.confirm(
      isEdit
        ? "Are you sure you want to update the participant data?"
        : "Are you sure you want to save this new participant?"
    );

    if (confirmSubmit) {
      try {
        console.log("Data yang akan dikirim:", formData); // Log data yang akan dikirim

        let result;
        if (isEdit && id) {
          // Ambil data lama dari gugus depan
          const gudepId = formData.gudep_id;
          const gugusData = await fetchGugusdepanId(gudepId);
          const jumlahPutraLama = gugusData.data.jumlah_putra || 0; // Ambil jumlah putra lama
          const jumlahPutriLama = gugusData.data.jumlah_putri || 0; // Ambil jumlah putri lama

          // Hitung jumlah baru
          const jumlahPutraBaru = formData.gender === "Laki-laki" ? 1 : 0; // Hitung jumlah putra baru
          const jumlahPutriBaru = formData.gender === "Perempuan" ? 1 : 0; // Hitung jumlah putri baru

          // Update jumlah peserta di gugus depan
          await editGugusdepan(gudepId, {
            jumlah_putra:
              jumlahPutraLama +
              jumlahPutraBaru -
              (formData.gender === "Laki-laki" ? 0 : 1),
            jumlah_putri:
              jumlahPutriLama +
              jumlahPutriBaru -
              (formData.gender === "Perempuan" ? 0 : 1),
          });

          result = await editPesertadidik(id, formData);
        } else {
          result = await createPesertadidik(formData);
          const gudepId = formData.gudep_id;
          const jumlahPutraBaru = formData.gender === "Laki-laki" ? 1 : 0; // Hitung jumlah putra baru
          const jumlahPutriBaru = formData.gender === "Perempuan" ? 1 : 0; // Hitung jumlah putri baru

          // Ambil data lama dari gugus depan
          const gugusData = await fetchGugusdepanId(gudepId);
          const jumlahPutraLama = gugusData.data.jumlah_putra || 0; // Ambil jumlah putra lama
          const jumlahPutriLama = gugusData.data.jumlah_putri || 0; // Ambil jumlah putri lama

          // Update jumlah peserta di gugus depan
          await editGugusdepan(gudepId, {
            jumlah_putra: jumlahPutraLama + jumlahPutraBaru,
            jumlah_putri: jumlahPutriLama + jumlahPutriBaru,
          });
        }

        Swal.fire("Sukses!", "Data peserta didik telah disimpan.", "success");
        navigate("/operator/pesertadidik");
      } catch (error) {
        console.error("Error saving data:", error);
        Swal.fire("Error!", "Gagal menyimpan data peserta didik.", "error");
      }
    }
  };

  return (
    <OperatorTemplate>
      <div className="ml-18 rounded-xl shadow-xl">
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">
            {isEdit ? "Edit Peserta Didik" : "Tambah Peserta Didik"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-[#9500FF] font-bold mb-2">
                Nama:
              </label>
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
              <label className="block text-[#9500FF] font-bold mb-2">
                Gender:
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="border rounded p-2 w-full"
              >
                <option value="">Pilih Gender</option>
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-[#9500FF] font-bold mb-2">
                Tempat, Tanggal Lahir:
              </label>
              <input
                type="text"
                name="ttl"
                value={formData.ttl}
                onChange={handleChange}
                required
                className="border rounded p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-[#9500FF] font-bold mb-2">
                Detail Tingkatan:
              </label>
              <input
                type="text"
                name="detailtingkatan"
                value={formData.detailtingkatan}
                onChange={handleChange}
                required
                className="border rounded p-2 w-full"
              />
            </div>
            <button
              type="submit"
              className="bg-[#9500FF] text-white px-4 py-2 rounded-2xl"
            >
              {isEdit ? "Update" : "Simpan"}
            </button>
          </form>
        </div>
      </div>
    </OperatorTemplate>
  );
};

export default OperatorPesertaDidikForm;
