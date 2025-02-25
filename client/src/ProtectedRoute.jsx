import React, { useEffect, useState } from "react";
import NotFound from "./components/pages/NotFound";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ token, role, allowedRole, children }) => {
  const [loading, setLoading] = useState(true); // State to manage loading
  const [hasAccess, setHasAccess] = useState(false); // State to manage access

  useEffect(() => {
    const checkAccess = async () => {
      // Simulate an asynchronous operation (e.g., fetching role from an API)
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay

      // Check if the role matches the allowed role
      if (role === allowedRole) {
        setHasAccess(true);
      } else {
        setHasAccess(false);
      }

      setLoading(false); // Set loading to false after the check
    };

    checkAccess();
  }, [role, allowedRole]);

  if (loading) {
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
          </div>
          <br />
        </div>
      </div>
    ); // You can replace this with a loading spinner or animation
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
