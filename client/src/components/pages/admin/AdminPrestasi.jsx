// src/pages/AdminPrestasi.jsx
import React, { useState, useEffect } from "react";
import AdminTemplate from "../../templates/AdminTemplate";
import TableR from "../../moleculs/TableR";
import SearchInput from "../../atoms/SearchInput";
import { fetchEventGudeps } from "../../../services/PrestasiService"; // Menggunakan service untuk prestasi

const AdminPrestasi = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetching Prestasi data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await fetchEventGudeps();
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
    { key: "nama", label: "Nama Prestasi" },
    { key: "tingkatan", label: "Tingkatan" },
    { key: "tahun", label: "Tahun" },
    { key: "deskripsi", label: "Deskripsi" },
  ];

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredData = data.filter((item) => {
    const matchesSearch =
      (item.nama ?? "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.tingkatan ?? "").toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
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
              Data Prestasi
            </span>
            <SearchInput value={searchQuery} onChange={handleSearchChange} />
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

export default AdminPrestasi;
