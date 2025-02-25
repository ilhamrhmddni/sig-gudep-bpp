// src/pages/AdminGugusdepan.js
import React, { useState, useEffect } from "react";
import { fetchGugusdepanId } from "../../../services/GugusdepanService"; // Updated to fetch by ID
import { fetchKwarran } from "../../../services/KwarranService";
import { editGugusdepan } from "../../../services/GugusdepanService"; // Import the edit function
import Swal from "sweetalert2";
import OperatorTemplate from "../../templates/OperatorTemplate";

const OperatorGugusdepan = () => {
  const [data, setData] = useState(null); // State for single Gugusdepan data
  const [kwarranList, setKwarranList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetching Gugusdepan data by ID from local storage
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const userId = localStorage.getItem("gudep_id"); // Retrieve gudep_id from local storage
        if (!userId) {
          throw new Error("User  ID not found in local storage.");
        }

        const result = await fetchGugusdepanId(userId); // Fetch data by user ID
        setData(result.data); // Set the fetched data
        setError(null);
      } catch (error) {
        setError("Error fetching data.");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fetching Kwarran data for filter options
  useEffect(() => {
    const fetchKwarranData = async () => {
      try {
        const result = await fetchKwarran();
        setKwarranList(result.data || []);
      } catch (error) {
        console.error("Error fetching Kwarran data:", error);
      }
    };

    fetchKwarranData();
  }, []);

  const handleSave = async () => {
    Swal.fire({
      title: "Konfirmasi",
      text: "Apakah Anda yakin ingin menyimpan data ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, simpan!",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const userId = localStorage.getItem("gudep_id");
          await editGugusdepan(userId, data); // Update the data
          Swal.fire("Sukses!", "Data Anda telah disimpan.", "success");
        } catch (error) {
          Swal.fire("Error!", "Gagal menyimpan data.", "error");
        }
      }
    });
  };

  return (
    <OperatorTemplate>
      <div className="ml-18 rounded-xl shadow-xl">
        <div className="p-4">
          <div className="flex justify-between items-center bg-[#9500FF] rounded-2xl px-8 py-2 ">
            <span
              className="text-2xl font-bold text-white"
              style={{ whiteSpace: "nowrap" }}
            >
              Data Gugusdepan
            </span>
            <button
              onClick={handleSave}
              className="bg-[#9500FF] text-white px-4 py-2 rounded-2xl border-2 rounded-white cursor-pointer font-bold flex gap-2"
            >
              <span className="material-icons">save</span>
              Simpan
            </button>
          </div>

          {loading && <p className="text-center mt-4">Loading data...</p>}
          {error && <p className="text-center mt-4 text-red-500">{error}</p>}

          {data ? (
            <div className="m-4 grid grid-cols-2 gap-4 text-xl my-8">
              {/* Left Column */}
              <div className="flex flex-col px-4">
                {/* Jumlah Putra and Putri (Disabled) */}
                <div className="flex gap-8 my-4 justify-between">
                  <label
                    className="text-[#9500FF] font-bold"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    {" "}
                    Jumlah Putra:
                  </label>

                  <input
                    type="number"
                    value={data.jumlah_putra || 0} // Default to 0 if null
                    disabled
                    className=" rounded p-1 w-full text-right "
                  />
                </div>
                <div className="flex gap-9 my-4">
                  <label
                    className="text-[#9500FF] font-bold"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    Jumlah Putri:
                  </label>
                  <input
                    type="number"
                    value={data.jumlah_putri || 0} // Default to 0 if null
                    disabled
                    className="rounded p-1 w-full text-right"
                  />
                </div>

                {/* Kwarran Dropdown */}
                <div className="flex justify-between my-4 gap-24">
                  <label className="text-[#9500FF] font-bold">Kwarran:</label>
                  <select
                    value={data.kwarran_id || ""}
                    onChange={(e) =>
                      setData({ ...data, kwarran_id: e.target.value })
                    }
                    className="border rounded p-1 w-full"
                  >
                    <option value="">Pilih Kwarran</option>
                    {kwarranList.map((kwarran) => (
                      <option key={kwarran.id} value={kwarran.id}>
                        {kwarran.nama}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Tingkatan Dropdown */}
                <div className="flex justify-between my-4 gap-19">
                  <label className="text-[#9500FF] font-bold">Tingkatan:</label>
                  <select
                    value={data.tingkatan || ""}
                    onChange={(e) =>
                      setData({ ...data, tingkatan: e.target.value })
                    }
                    className="border rounded p-1 w-full"
                  >
                    <option value="">Pilih Tingkatan</option>
                    <option value="Siaga">Siaga</option>
                    <option value="Penggalang">Penggalang</option>
                    <option value="Penegak">Penegak</option>
                    <option value="Pandega">Pandega</option>
                  </select>
                </div>
              </div>

              {/* Right Column */}
              <div className="flex flex-col px-4">
                <div className="flex justify-between my-4 gap-24">
                  <label className="text-[#9500FF] font-bold">Email:</label>
                  <input
                    type="email"
                    value={data.email || ""}
                    onChange={(e) =>
                      setData({ ...data, email: e.target.value })
                    }
                    className="border rounded p-1 w-full"
                  />
                </div>
                <div className="flex justify-between my-4 gap-16">
                  <label className="text-[#9500FF] font-bold">Mabigus:</label>
                  <input
                    type="text"
                    value={data.mabigus || ""}
                    onChange={(e) =>
                      setData({ ...data, mabigus: e.target.value })
                    }
                    className="border rounded p-1 w-full"
                  />
                </div>
                <div className="flex justify-between my-4 gap-16">
                  <label className="text-[#9500FF] font-bold">Pembina:</label>
                  <input
                    type="text"
                    value={data.pembina || ""}
                    onChange={(e) =>
                      setData({ ...data, pembina: e.target.value })
                    }
                    className="border rounded p-1 w-full"
                  />
                </div>
                <div className="flex justify-between my-4 gap-20">
                  <label className="text-[#9500FF] font-bold">Pelatih:</label>
                  <input
                    type="text"
                    value={data.pelatih || ""}
                    onChange={(e) =>
                      setData({ ...data, pelatih: e.target.value })
                    }
                    className="border rounded p-1 w-full"
                  />
                </div>
              </div>
            </div>
          ) : (
            <p className="text-center mt-4">Data tidak ditemukan</p>
          )}
        </div>
      </div>
    </OperatorTemplate>
  );
};

export default OperatorGugusdepan;
