import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddUserPage = () => {
  const [userData, setUserData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    role: "operator", // Default role
    no_telp: "",
    asal: "",
    photo_path: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Mengirim data ke API
      await axios.post(
        "https://sig-gudep-bpp-server.vercel.app/users",
        userData
      );
      navigate("/users"); // Redirect ke halaman user setelah berhasil tambah
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <div>
      <h1>Add New User</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name:</label>
          <input
            type="text"
            name="fullname"
            value={userData.fullname}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={userData.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Role:</label>
          <select name="role" value={userData.role} onChange={handleChange}>
            <option value="admin">Admin</option>
            <option value="operator">Operator</option>
          </select>
        </div>
        <div>
          <label>Phone Number (optional):</label>
          <input
            type="tel"
            name="no_telp"
            value={userData.no_telp}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default AddUserPage;
