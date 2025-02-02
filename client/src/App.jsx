// src/App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import UserPage from "./pages/userPage";
import EditUserPage from "./pages/editUserPage";
import AddUserPage from "./pages/addUserPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/users" element={<UserPage />} />
        <Route path="/edit-user/:id" element={<EditUserPage />} />
        <Route path="/add-user" element={<AddUserPage />} />
      </Routes>
    </>
  );
}

export default App;
