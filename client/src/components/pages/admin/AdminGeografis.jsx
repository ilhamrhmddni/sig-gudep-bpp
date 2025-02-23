// src/pages/AdminGeografis.js
import React, { useState, useEffect } from "react";
import AdminTemplate from "../../templates/AdminTemplate";
import TableR from "../../moleculs/TableR";
import SearchInput from "../../atoms/SearchInput";
import { fetchGeografis } from "../../../services/GeografisService"; // Assuming the service file is set up

const AdminGeografis = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(null); // To handle errors

  // Fetching Geografis data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await fetchGeografis();
        console.log("API Response:", result); // Debugging: see the API response

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

  const headers = [
    { key: "latitude", label: "Latitude" },
    { key: "longitude", label: "Longitude" },
    { key: "titik_koordinat", label: "Titik Koordinat" }, // Gabungan dari latitude dan longitude
    { key: "alamat", label: "Alamat" },
  ];

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredData = data
    .map((item) => ({
      ...item,
      titik_koordinat: `${item.latitude}, ${item.longitude}`, // Gabungkan latitude & longitude
    }))
    .filter((item) => {
      const matchesSearch =
        (item.alamat ?? "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.latitude ?? "").toString().includes(searchQuery) ||
        (item.longitude ?? "").toString().includes(searchQuery) ||
        item.titik_koordinat.includes(searchQuery); // Cari berdasarkan titik koordinat juga

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
              Data Geografis
            </span>
            <SearchInput value={searchQuery} onChange={handleSearchChange} />
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
