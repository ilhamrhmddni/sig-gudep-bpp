import NotFound from "./components/pages/NotFound";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ token, role, allowedRole, children }) => {
  // Jika tidak ada token, redirect ke login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Jika role tidak sesuai, tampilkan halaman NotFound
  if (role !== allowedRole) {
    return <NotFound />;
  }

  return children;
};

export default ProtectedRoute;
