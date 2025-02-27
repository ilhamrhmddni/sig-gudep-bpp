import React, { useState, useEffect } from "react";
import OperatorTemplate from "../../templates/OperatorTemplate";
import TableR from "../../moleculs/TableR";
import {
  fetchEventGudeps,
  deleteEventGudep,
} from "../../../services/PrestasiService"; // Adjust the import based on your file structure
import { useNavigate } from "react-router-dom";

const OperatorPrestasi = () => {
  const [data, setData] = useState([]); // State to hold the fetched data
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null); // State to manage error messages
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await fetchEventGudeps();
        const gudepId = localStorage.getItem("gudep_id");

        // Filter data berdasarkan gudep_id
        const filteredData = result.data.filter(
          (item) => item.gudep_id === gudepId
        );
        setData(filteredData);
        setError(null);
      } catch (error) {
        setError("Error fetching data.");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData(); // Call the fetch function
  }, []); // Empty dependency array means this runs once on mount

  // Define the headers for the table
  const headers = [
    { key: "tingkatan", label: "Tingkatan" },
    { key: "nama_event", label: "Nama Event" },
    { key: "keterangan", label: "Keterangan" },
    { key: "actions", label: "Actions" }, // Add an actions column
  ];

  // Function to handle adding a new achievement
  const handleAddPrestasi = () => {
    navigate("/operator/prestasi/add"); // Navigate to the form for adding a new achievement
  };

  // Function to handle editing an achievement
  const handleEditPrestasi = (id) => {
    navigate(`/operator/prestasi/edit/${id}`); // Navigate to the edit form for the selected achievement
  };

  // Function to handle deleting an achievement
  const handleDeletePrestasi = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this achievement?"
    );
    if (confirmDelete) {
      try {
        await deleteEventGudep(id); // Call the delete function
        setData(data.filter((item) => item.id !== id)); // Update the state to remove the deleted item
      } catch (error) {
        console.error("Error deleting achievement:", error);
        setError("Error deleting achievement."); // Set error message if deletion fails
      }
    }
  };

  // Transform data to include actions
  const transformedData = data.map((item) => ({
    tingkatan: item.Gudep.tingkatan, // Accessing nested property
    nama_event: item.Event.nama, // Accessing nested property
    keterangan: item.keterangan, // Direct access
    actions: (
      <div className="flex space-x-2 justify-center">
        <button
          onClick={() => handleEditPrestasi(item.id)}
          className="text-blue-500 mr-2"
        >
          <span className="material-icons cursor-pointer">edit</span>{" "}
          {/* Ganti dengan ikon */}
        </button>
        <button
          onClick={() => handleDeletePrestasi(item.id)}
          className="text-red-500"
        >
          <span className="material-icons cursor-pointer">delete</span>{" "}
          {/* Ikon untuk delete */}
        </button>
      </div>
    ),
  }));

  return (
    <OperatorTemplate>
      <div className="ml-18 rounded-xl shadow-xl ">
        <div className="p-4">
          <div className="flex justify-between items-center bg-[#9500FF] rounded-2xl px-8 py-2 font-bold">
            <span
              className="text-2xl font-bold text-white"
              style={{ whiteSpace: "nowrap" }}
            >
              Data Prestasi
            </span>
            <button
              onClick={handleAddPrestasi}
              className="flex items-center bg-white text-[#9500FF] rounded px-4 py-2 cursor-pointer"
            >
              <span className="material-icons mr-2">add</span>{" "}
              {/* Google Material Icon */}
              Tambah Prestasi
            </button>
          </div>
          {loading && <p className="text-center mt-4">Loading data...</p>}
          {error && <p className="text-center mt-4 text-red-500">{error}</p>}
          {transformedData.length === 0 && !loading ? (
            <p className="text-center mt-4">Data tidak ditemukan</p>
          ) : (
            <TableR headers={headers} data={transformedData} />
          )}
        </div>
      </div>
    </OperatorTemplate>
  );
};

export default OperatorPrestasi;
