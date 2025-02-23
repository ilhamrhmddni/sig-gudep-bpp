// src/pages/AdminLaporan.jsx
import React, { useState, useEffect } from "react";
import AdminTemplate from "../../templates/AdminTemplate";
import TableR from "../../moleculs/TableR";
import SearchInput from "../../atoms/SearchInput";
import { fetchLaporan } from "../../../services/LaporanService"; // Menggunakan service untuk laporan

const AdminLaporanGudep = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(""); // State untuk status

  // Fetching Laporan data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await fetchLaporan();
        setData(Array.isArray(result.data) ? result.data : []);
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

  const headers = [
    { key: "nama", label: "Nama" },
    { key: "asal", label: "Asal" },
    { key: "no_hp", label: "No. HP" },
    { key: "email", label: "Email" },
    { key: "status", label: "Status" },
  ];

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const filteredData = data.filter((item) => {
    const matchesSearch =
      (item.nama ?? "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.asal ?? "").toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = selectedStatus
      ? item.status === selectedStatus
      : true;

    return matchesSearch && matchesStatus;
  });

  return (
    <AdminTemplate>
      <div className="ml-18 rounded-xl shadow-xl">
        <div className="p-4">
          <div className="flex bg-[#9500FF] rounded-2xl mx-2">
            <span
              className="items-center text-2xl font-bold px-12 m-auto flex justify-center text-white"
              style={{ whiteSpace: "nowrap" }}
            >
              Data Laporan
            </span>
            <SearchInput value={searchQuery} onChange={handleSearchChange} />
            <select
              value={selectedStatus}
              onChange={handleStatusChange}
              className="m-2 p-2 border-2 border-white rounded-md text-white font-bold"
            >
              <option value="" className="text-[#9500FF] font-bold">
                Semua Status
              </option>
              <option value="diproses" className="text-[#9500FF] font-bold">
                Diproses
              </option>
              <option value="selesai" className="text-[#9500FF] font-bold">
                Selesai
              </option>
            </select>
          </div>

          {loading && <p className="text-center mt-4">Loading data...</p>}
          {error && <p className="text-center mt-4 text-red-500">{error}</p>}
          {filteredData.length === 0 && !loading ? (
            <p className="text-center mt-4">Data tidak ditemukan</p>
          ) : (
            <TableR headers={headers} data={filteredData} />
          )}
        </div>
      </div>
    </AdminTemplate>
  );
};

export default AdminLaporanGudep;
