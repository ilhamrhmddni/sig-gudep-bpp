// src/components/atoms/AddButton.js
import React from "react";
import { useNavigate } from "react-router-dom";

const AddButton = ({ route }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(route); // Ganti dengan rute halaman tambah data
  };

  return (
    <button
      onClick={handleClick}
      className="bg-[#9500FF] text-white rounded-md m-2 border-2"
    >
      <span className="material-icons m-2" style={{ color: "white" }}>
        add
      </span>
    </button>
  );
};

export default AddButton;
