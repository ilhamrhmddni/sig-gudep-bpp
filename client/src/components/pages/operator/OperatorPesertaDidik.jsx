import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import OperatorTemplate from "../../templates/OperatorTemplate";
import TableCRUD from "../../moleculs/TableCRUD"; // Update to use TableCRUD
import SearchInput from "../../atoms/SearchInput";
import AddButton from "../../atoms/AddButton"; // Import the AddButton component
import {
  fetchPesertadidik,
  deletePesertadidik,
} from "../../../services/PesertadidikService"; // Update to include CRUD services
import {
  editGugusdepan,
  fetchGugusdepanId,
} from "../../../services/GugusdepanService"; // Import for updating gugusdepan
import Swal from "sweetalert2";

const OperatorPesertaDidik = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook for navigating to another route

  // Retrieve gudep_id from local storage
  const gudepId = localStorage.getItem("gudep_id");

  // Fetching Peserta Didik data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const pesertaResult = await fetchPesertadidik(gudepId); // Fetch data using gudepId
        const fetchedData = Array.isArray(pesertaResult.data)
          ? pesertaResult.data.filter((item) => item.gudep_id === gudepId) // Filter data berdasarkan gudep_id
          : [];
        setData(fetchedData);
        setError(null);
      } catch (error) {
        setError("Error fetching data.");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [gudepId]);

  const headers = [
    { key: "nama", label: "Nama Peserta Didik" },
    { key: "gender", label: "Gender" },
    { key: "ttl", label: "Tempat, Tanggal Lahir" },
    { key: "detailtingkatan", label: "Detail Tingkatan" },
  ];

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleEdit = (item) => {
    navigate(`/operator/pesertadidik/edit/${item.id}`); // Navigate to edit page
  };

  const handleDelete = async (id) => {
    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmDelete.isConfirmed) {
      try {
        // Ambil data peserta yang akan dihapus untuk mengetahui gender-nya
        const pesertaToDelete = data.find((item) => item.id === id);
        const genderToDelete = pesertaToDelete.gender;

        // Hapus peserta didik
        const result = await deletePesertadidik(id);
        console.log("Delete response:", result); // Log respons dari penghapusan
        Swal.fire("Deleted!", "Peserta Didik has been deleted.", "success");

        // Ambil data lama dari gugus depan
        const gugusData = await fetchGugusdepanId(gudepId);
        const jumlahPutraLama = gugusData.data.jumlah_putra || 0; // Ambil jumlah putra lama
        const jumlahPutriLama = gugusData.data.jumlah_putri || 0; // Ambil jumlah putri lama

        // Hitung jumlah baru
        const updatedJumlahPutra =
          genderToDelete === "Laki-laki"
            ? jumlahPutraLama - 1
            : jumlahPutraLama;
        const updatedJumlahPutri =
          genderToDelete === "Perempuan"
            ? jumlahPutriLama - 1
            : jumlahPutriLama;

        // Update jumlah peserta di gugus depan
        await editGugusdepan(gudepId, {
          jumlah_putra: updatedJumlahPutra,
          jumlah_putri: updatedJumlahPutri,
        });

        // Refresh data setelah penghapusan
        const pesertaResult = await fetchPesertadidik(gudepId);
        const fetchedData = Array.isArray(pesertaResult.data)
          ? pesertaResult.data.filter((item) => item.gudep_id === gudepId)
          : [];
        setData(fetchedData); // Update state dengan data terbaru
      } catch (error) {
        Swal.fire(
          "Error!",
          "There was an error deleting the participant.",
          "error"
        );
        console.error("Error deleting participant:", error);
      }
    }
  };

  const filteredData = data.filter((item) => {
    const matchesSearch =
      item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.detailtingkatan.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  return (
    <OperatorTemplate>
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
            <AddButton route={"/operator/pesertadidik/add"} />
          </div>

          {loading && <p className="text-center mt-4">Loading data...</p>}
          {error && <p className="text-center mt-4 text-red-500">{error}</p>}
          {filteredData.length === 0 && !loading ? (
            <p className="text-center mt-4">Data tidak ditemukan</p>
          ) : (
            <TableCRUD
              headers={headers}
              data={filteredData}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>
    </OperatorTemplate>
  );
};

export default OperatorPesertaDidik;
