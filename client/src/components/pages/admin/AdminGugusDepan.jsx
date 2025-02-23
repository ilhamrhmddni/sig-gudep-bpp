import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import AdminTemplate from "../../templates/AdminTemplate";
import Table from "../../moleculs/Table";
import SearchInput from "../../atoms/SearchInput";
import AddButton from "../../atoms/AddButton";
import {
  deleteGugusdepan,
  fetchGugusdepan,
} from "../../../services/GugusdepanService"; // Assuming the service file is set up

const AdminGugusdepan = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(null); // To handle errors
  const navigate = useNavigate(); // Hook for navigating to another route

  // Fetching Gugusdepan data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await fetchGugusdepan(); // Get data from the service
        setData(result.data); // Store data in state
        setError(null); // Clear any previous error
      } catch (error) {
        setError("Error fetching data."); // Set error if the fetch fails
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array to fetch only on the first render

  const headers = [
    { key: "kode", label: "Kode" },
    { key: "nama", label: "Nama" },
    { key: "ketua", label: "Ketua" },
    { key: "jumlah_anggota", label: "Jumlah Anggota" },
    { key: "email", label: "Email" },
  ];

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleEdit = (item) => {
    // Navigate to the edit page with item id
    navigate(`/admin/gugusdepan/edit/${item.id}`); // Assuming you have an edit page for Gugusdepan
  };

  const handleDelete = async (id) => {
    try {
      await deleteGugusdepan(id); // Call the delete function from service
      setData(data.filter((item) => item.id !== id)); // Update local state after delete
      console.log("Item deleted successfully");
    } catch (error) {
      console.error("Error deleting item", error);
    }
  };

  const filteredData = data.filter(
    (item) =>
      item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.ketua.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
              Data Gugusdepan
            </span>
            <SearchInput value={searchQuery} onChange={handleSearchChange} />
            <AddButton route="/admin/gugusdepan/add" />
          </div>

          {/* Loading state */}
          {loading && <p className="text-center mt-4">Loading data...</p>}

          {/* Error state */}
          {error && <p className="text-center mt-4 text-red-500">{error}</p>}

          {/* Displaying the table or message if no data found */}
          {filteredData.length === 0 && !loading ? (
            <p className="text-center mt-4">Data tidak ditemukan</p>
          ) : (
            <Table
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

export default AdminGugusdepan;
