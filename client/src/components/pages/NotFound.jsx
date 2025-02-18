import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const NotFound = () => {
  const navigate = useNavigate(); // Inisialisasi useNavigate

  const handleBack = () => {
    navigate(-1); // Kembali ke halaman sebelumnya
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-[#9500FF] bg-[length:60%] md:bg-[length:50%] bg-no-repeat bg-center"
      style={{
        backgroundImage: "url('/bg-siluet.png')",
      }}
    >
      <div className="w-full max-w-md flex flex-col md:space-y-24 my-8">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 bg-[url('/logo.png')] bg-contain bg-no-repeat bg-center"></div>
          <h2 className="text-2xl font-bold text-center text-white">
            404 Not Found
          </h2>
          <p className="text-lg text-white">
            Halaman yang Anda cari tidak ditemukan.
          </p>
          <div className="mt-4">
            <button
              onClick={handleBack}
              className="px-4 py-2 bg-white text-[#9500FF] rounded hover:bg-blue-600"
            >
              Kembali
            </button>
          </div>
        </div>
        <br />
      </div>
    </div>
  );
};

export default NotFound;
