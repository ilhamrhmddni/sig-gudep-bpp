import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://sig-gudep-bpp-server.vercel.app/users"
        );
        console.log("Response Data:", response.data);
        setUsers(response.data.data);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Gagal memuat data pengguna.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm(
      "Apakah Anda yakin ingin menghapus user ini?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `https://sig-gudep-bpp-server.vercel.app/users/${userId}`
      );
      setUsers(users.filter((user) => user.id !== userId));
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Gagal menghapus user.");
    }
  };

  const handleEdit = (userId) => {
    navigate(`/edit-user/${userId}`);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
      <button
        onClick={() => navigate("/add-user")}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add New User
      </button>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Full Name</th>
                <th className="border px-4 py-2">Username</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Role</th>
                <th className="border px-4 py-2">Phone Number</th>
                <th className="border px-4 py-2">Asal</th>
                <th className="border px-4 py-2">Photo</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id} className="border">
                    <td className="border px-4 py-2">{user.fullname}</td>
                    <td className="border px-4 py-2">{user.username}</td>
                    <td className="border px-4 py-2">{user.email}</td>
                    <td className="border px-4 py-2">{user.role}</td>
                    <td className="border px-4 py-2">
                      {user.no_telp || "Not provided"}
                    </td>
                    <td className="border px-4 py-2">{user.asal || "-"}</td>
                    <td className="border px-4 py-2">
                      {user.photo_path ? (
                        <img
                          src={user.photo_path}
                          alt="User"
                          className="w-12 h-12 rounded-full mx-auto"
                        />
                      ) : (
                        "No photo"
                      )}
                    </td>
                    <td className="border px-4 py-2 flex gap-2">
                      <button
                        onClick={() => handleEdit(user.id)}
                        className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-4">
                    Tidak ada data user.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserPage;
