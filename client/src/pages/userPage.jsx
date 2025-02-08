import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Ambil data user dari API
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://sig-gudep-bpp-server.vercel.app/users"
        ); // Sesuaikan dengan endpoint API
        setUsers(response.data); // Pastikan format data yang diterima sesuai
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      await axios.delete(
        `https://sig-gudep-bpp-server.vercel.app/users/${userId}`
      );
      setUsers(users.filter((user) => user.id !== userId)); // Menghapus user dari state
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleEdit = (userId) => {
    navigate(`/edit-user/${userId}`); // Mengarahkan ke halaman edit user
  };

  return (
    <div>
      <h1>Manage Users</h1>
      <button onClick={() => navigate("/add-user")}>Add New User</button>
      <table>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Phone Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.fullname}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.no_telp || "Not provided"}</td>
              <td>
                <button onClick={() => handleEdit(user.id)}>Edit</button>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserPage;
