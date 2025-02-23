// src/pages/AdminGeografis.js
import React, { useState, useEffect } from "react";
import AdminTemplate from "../../templates/AdminTemplate";
import TableR from "../../moleculs/TableR";
import SearchInput from "../../atoms/SearchInput";
import { fetchGeografis } from "../../../services/GeografisService"; // Assuming the service file is set up
import { fetchKwarran } from "../../../services/KwarranService"; // Assuming the service file is set up

const AdminGeografis = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);
  const [kwarranList, setKwarranList] = useState([]); // State for Kwarran list
  const [selectedKwarran, setSelectedKwarran] = useState(""); // State for selected Kwarran
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(null); // To handle errors

  // Fetching Geografis data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await fetchGeografis();
        setData(Array.isArray(result.data) ? result.data : []); // Ensure `data` is always an array
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
        const result = await fetchKwarran(); // Fetch Kwarran data
        setKwarranList(result.data || []); // Set Kwarran list
      } catch (error) {
        console.error("Error fetching Kwarran data:", error);
      }
    };

    fetchKwarranData();
  }, []);

  const headers = [
    { key: "no_gudep", label: "No. Gudep" }, // Menambahkan header No. Gudep
    { key: "latitude", label: "Latitude" },
    { key: "longitude", label: "Longitude" },
    { key: "titik_koordinat", label: "Titik Koordinat" }, // Gabungan dari latitude dan longitude
    { key: "alamat", label: "Alamat" },
    { key: "maps_link", label: "Aksi" },
  ];

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleKwarranChange = (e) => {
    setSelectedKwarran(e.target.value);
  };

  const filteredData = data
    .map((item) => ({
      ...item,
      no_gudep: item.Gudep?.no_gudep || "-", // Pastikan tidak error jika Gudep kosong
      maps_link: (
        <a
          href={`https://www.google.com/maps?q=${item.latitude},${item.longitude}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
            📍 Lihat di Maps
          </button>
        </a>
      ),
    }))
    .filter((item) => {
      const matchesSearch =
        (item.alamat ?? "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.latitude ?? "").toString().includes(searchQuery) ||
        (item.longitude ?? "").toString().includes(searchQuery) ||
        (item.no_gudep ?? "").toLowerCase().includes(searchQuery.toLowerCase());

      const matchesKwarran = selectedKwarran
        ? item.Gudep?.kwarran_id === selectedKwarran // Filter berdasarkan kwarran_id
        : true;

      return matchesSearch && matchesKwarran;
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
              Data Geografis
            </span>
            <SearchInput value={searchQuery} onChange={handleSearchChange} />
            <select
              value={selectedKwarran}
              onChange={handleKwarranChange}
              className="m-2 p-2 border-2 border-white rounded-md text-white font-bold "
            >
              <option value="" className="text-[#9500FF] font-bold">
                Kwarran
              </option>
              {kwarranList.map((kwarran) => (
                <option
                  key={kwarran.id}
                  value={kwarran.id}
                  className="text-[#9500FF] font-bold"
                >
                  {kwarran.nama}
                </option>
              ))}
            </select>
          </div>

          {/* Loading state */}
          {loading && <p className="text-center mt-4">Loading data...</p>}

          {/* Error state */}
          {error && <p className="text-center mt-4 text-red-500">{error}</p>}

          {/* Displaying the table or message if no data found */}
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

export default AdminGeografis;
