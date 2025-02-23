// src/pages/AdminPesertaDidik.js
import React, { useState, useEffect } from "react";
import AdminTemplate from "../../templates/AdminTemplate";
import TableR from "../../moleculs/TableR";
import SearchInput from "../../atoms/SearchInput";
import { fetchPesertadidik } from "../../../services/PesertadidikService";
import { fetchKwarran } from "../../../services/KwarranService";
import { fetchGugusdepan } from "../../../services/GugusdepanService"; // Menggunakan service untuk gudep

const AdminPesertaDidik = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);
  const [kwarranList, setKwarranList] = useState([]);
  const [gudepList, setGudepList] = useState([]); // State untuk menyimpan data gudep
  const [selectedKwarran, setSelectedKwarran] = useState("");
  const [selectedTingkatan, setSelectedTingkatan] = useState("");
  const [noGudep, setNoGudep] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetching Peserta Didik data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await fetchPesertadidik();
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

  // Fetching Gudep data for dropdown options
  useEffect(() => {
    const fetchGudepData = async () => {
      try {
        const result = await fetchGugusdepan();
        setGudepList(result.data || []);
      } catch (error) {
        console.error("Error fetching Gudep data:", error);
      }
    };

    fetchGudepData();
  }, []);

  const headers = [
    { key: "no_gudep", label: "No. Gudep" },
    { key: "nama", label: "Nama Peserta Didik" },
    { key: "gender", label: "Gender" },
    { key: "ttl", label: "Tempat, Tanggal Lahir" },
    { key: "detailtingkatan", label: "Detail Tingkatan" },
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

  const handleNoGudepChange = (e) => {
    setNoGudep(e.target.value);
  };

  const filteredData = data.filter((item) => {
    const matchesSearch =
      (item.nama ?? "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.detailtingkatan ?? "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    const matchesKwarran = selectedKwarran
      ? item.kwarran_id === selectedKwarran
      : true;

    const matchesTingkatan = selectedTingkatan
      ? item.detailtingkatan === selectedTingkatan
      : true;

    const matchesNoGudep = noGudep
      ? item.no_gudep?.toString() === noGudep
      : true;

    return (
      matchesSearch && matchesKwarran && matchesTingkatan && matchesNoGudep
    );
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
              Data Peserta Didik
            </span>
            <SearchInput value={searchQuery} onChange={handleSearchChange} />
            <select
              value={selectedKwarran}
              onChange={handleKwarranChange}
              className="m-2 p-2 border-2 border-white rounded-md text-white font-bold"
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
            <select
              value={selectedTingkatan}
              onChange={handleTingkatanChange}
              className="m-2 p-2 border-2 border-white rounded-md text-white font-bold"
            >
              <option value="" className="text-[#9500FF] font-bold">
                Tingkatan
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
            <select
              value={noGudep}
              onChange={handleNoGudepChange}
              className="m-2 p-2 border-2 border-white rounded-md text-white font-bold"
            >
              <option value="" className="text-[#9500FF] font-bold">
                No. Gudep
              </option>
              {gudepList.map((gudep) => (
                <option
                  key={gudep.id}
                  value={gudep.no_gudep}
                  className="text-[#9500FF] font-bold"
                >
                  {gudep.no_gudep}
                </option>
              ))}
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

export default AdminPesertaDidik;
