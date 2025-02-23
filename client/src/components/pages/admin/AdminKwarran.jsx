import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import AdminTemplate from "../../templates/AdminTemplate";
import TableCRUD from "../../moleculs/TableCRUD";
import SearchInput from "../../atoms/SearchInput";
import AddButton from "../../atoms/AddButton";
import { deleteKwarran, fetchKwarran } from "../../../services/KwarranService"; // Assuming the service file is set up

const AdminKwarran = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(null); // To handle errors
  const navigate = useNavigate(); // Hook for navigating to another route

  // Mengambil data Kwarran dari API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await fetchKwarran(); // Get data from the service
        setData(result.data); // Menyimpan data ke state
        setError(null); // Clear any previous error
      } catch (error) {
        setError("Error fetching data."); // Set error if the fetch fails
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array agar hanya fetch saat pertama kali render

  const headers = [
    { key: "kode", label: "Kode" },
    { key: "nama", label: "Nama" },
    { key: "ketua_kwarran", label: "Ketua Kwarran" },
    { key: "ketua_dkr", label: "Ketua DKR" },
    {
      key: "jumlah_gudep",
      label: (
        <>
          Jumlah <br /> Gudep
        </>
      ),
    },
    { key: "email", label: "Email" },
  ];

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleEdit = (item) => {
    // Navigate to the edit page with item id
    navigate(`/admin/kwarran/edit/${item.id}`); // Assuming you have an edit page for Kwarran
  };

  const handleDelete = async (id) => {
    try {
      await deleteKwarran(id); // Call the delete function from service
      setData(data.filter((item) => item.id !== id)); // Update local state after delete
      console.log("Item deleted successfully");
    } catch (error) {
      console.error("Error deleting item", error);
    }
  };

  const filteredData = data.filter(
    (item) =>
      item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.ketua_kwarran.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.ketua_dkr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminTemplate>
      <div className="ml-18 rounded-xl shadow-xl">
        <div className="p-4">
          <div className="flex bg-[#9500FF] rounded-2xl mx-2">
            <span
              className="items-center text-2xl font-bold px-12 m-auto flex justify-center text-white"
              style={{ whiteSpace: "nowrap" }}
            >
              Data Kwarran
            </span>
            <SearchInput value={searchQuery} onChange={handleSearchChange} />
            <AddButton onClick={() => navigate("/admin/kwarran/add")} />
          </div>

          {/* Loading state */}
          {loading && <p className="text-center mt-4">Loading data...</p>}

          {/* Error state */}
          {error && <p className="text-center mt-4 text-red-500">{error}</p>}

          {/* Displaying the table or message if no data found */}
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
    </AdminTemplate>
  );
};

export default AdminKwarran;
