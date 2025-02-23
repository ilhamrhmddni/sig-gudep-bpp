// src/pages/AdminGugusdepan.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import AdminTemplate from "../../templates/AdminTemplate";
import TableR from "../../moleculs/TableR";
import SearchInput from "../../atoms/SearchInput";
import { fetchGugusdepan } from "../../../services/GugusdepanService"; // Assuming the service file is set up
import { fetchKwarran } from "../../../services/KwarranService";

const AdminGugusdepan = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);
  const [kwarranList, setKwarranList] = useState([]); // State for Kwarran list
  const [selectedKwarran, setSelectedKwarran] = useState(""); // State for selected Kwarran
  const [selectedTingkatan, setSelectedTingkatan] = useState(""); // State for selected Tingkatan
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(null); // To handle errors
  const [showDetails, setShowDetails] = useState(false); // Toggle for showing details

  // Fetching Gugusdepan data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await fetchGugusdepan();
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
    { key: "no_gudep", label: "No. Gudep" },
    { key: "kwarran_id", label: "Kwarran" },
    { key: "tingkatan", label: "Tingkatan" },
    { key: "jumlah_putra", label: "Jumlah Putra" },
    { key: "jumlah_putri", label: "Jumlah Putri" },
    { key: "email", label: "Email" },
    { key: "tahun_update", label: "Tanggal Update" },
    { key: "mabigus", label: "Mabigus" },
    { key: "pembina", label: "Pembina" },
    { key: "pelatih", label: "Pelatih" },
  ];

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleKwarranChange = (e) => {
    setSelectedKwarran(e.target.value);
  };

  const handleTingkatanChange = (e) => {
    setSelectedTingkatan(e.target.value);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`; // Format: DD-MM-YYYY
  };

  const filteredData = data
    .filter((item) => {
      const matchesSearch =
        (item.nama ?? "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.ketua ?? "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.email ?? "").toLowerCase().includes(searchQuery.toLowerCase());

      const matchesKwarran = selectedKwarran
        ? item.kwarran_id === selectedKwarran
        : true;

      const matchesTingkatan = selectedTingkatan
        ? item.tingkatan === selectedTingkatan
        : true;

      return matchesSearch && matchesKwarran && matchesTingkatan;
    })
    .map((item) => ({
      ...item,
      tahun_update: formatDate(item.tahun_update), // Format the date for display
    }));

  return (
    <AdminTemplate>
      <div className="ml-18 rounded-xl shadow-xl">
        <div className="p-4">
          <div className="flex bg-[#9500FF] rounded-2xl mx-2">
            <span
              className="items-center text-2xl font-bold px-12 m-auto flex justify-center text-white"
              style={{ whiteSpace: "nowrap" }}
            >
              Data Gugusdepan
            </span>
            <SearchInput value={searchQuery} onChange={handleSearchChange} />
            <select
              value={selectedKwarran}
              onChange={handleKwarranChange}
              className="m-2 p-2 border-2 border-white rounded-md text-white font-bold "
            >
              <option value="" className="text-[#9500FF] font-bold">
                Semua Kwarran
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
            <select
              value={selectedTingkatan}
              onChange={handleTingkatanChange}
              className="m-2 p-2 border-2 border-white rounded-md text-white font-bold"
            >
              <option value="" className="text-[#9500FF] font-bold">
                Semua Tingkatan
              </option>
              <option value="Siaga" className="text-[#9500FF] font-bold">
                Siaga
              </option>
              <option value="Penggalang" className="text-[#9500FF] font-bold">
                Penggalang
              </option>
              <option value="Penegak" className="text-[#9500FF] font-bold">
                Penegak
              </option>
              <option value="Pandega" className="text-[#9500FF] font-bold">
                Pandega
              </option>
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
            <TableR
              headers={headers}
              data={filteredData}
              hiddenColumns={
                showDetails ? [] : ["mabigus", "pembina", "pelatih"]
              } // Menyembunyikan kolom jika detail tidak ditampilkan
            />
          )}
        </div>
      </div>
    </AdminTemplate>
  );
};

export default AdminGugusdepan;
