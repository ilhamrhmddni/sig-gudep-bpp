import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const NotFound = ({ role }) => {
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Check if the role is not recognized
    if (!role) {
      navigate("/404"); // Redirect to /dashboard if no role is provided
    }
  }, [role, navigate]);

  const handleBack = () => {
    // Navigate based on the user's role
    if (role === "admin") {
      navigate("/admin/kwarran"); // Redirect admin to the kwarran page
    } else if (role === "operator") {
      navigate("/operator/gugusdepan"); // Redirect operator to the gugusdepan page
    } else {
      navigate("/404"); // Default redirect if role is not recognized
    }
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
