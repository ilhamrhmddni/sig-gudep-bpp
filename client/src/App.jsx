import React, { useMemo } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import jwtDecode from "jwt-decode";
import ProtectedRoute from "./ProtectedRoute";
import LoginPage from "./components/pages/LoginPage";
import OperatorGugusDepan from "./components/pages/operator/OperatorGugusDepan";
import OperatorGeografis from "./components/pages/operator/OperatorGeografis";
import OperatorPesertaDidik from "./components/pages/operator/OperatorPesertaDidik";
import OperatorEvent from "./components/pages/operator/OperatorEvent";
import AdminKwarran from "./components/pages/admin/AdminKwarran";
import NotFound from "./components/pages/NotFound";
import AdminGugusDepan from "./components/pages/admin/AdminGugusDepan";
import AdminGeografis from "./components/pages/admin/AdminGeografis";
import AdminPesertaDidik from "./components/pages/admin/AdminPesertaDidik";
import AdminEvent from "./components/pages/admin/AdminEvent";
import AdminOperator from "./components/pages/admin/AdminOperator";
import AdminRequestLaporanGudep from "./components/pages/admin/AdminRequestLaporanGudep";

const App = () => {
  const token = localStorage.getItem("token");

  // Gunakan useMemo untuk mencegah decoding ulang setiap render
  const roleUser = useMemo(() => {
    if (token) {
      try {
        return jwtDecode(token).role;
      } catch (error) {
        console.error("Invalid token");
        return "";
      }
    }
    return "";
  }, [token]);

  return (
    <Router>
      <Routes>
        <Route path="/authlogin" element={<LoginPage />} />

        {/* Operator Routes */}
        <Route
          path="/operator/gugusdepan"
          element={
            <ProtectedRoute
              token={token}
              role={roleUser}
              allowedRole="operator"
            >
              <OperatorGugusDepan />
            </ProtectedRoute>
          }
        />
        <Route
          path="/operator/geografis"
          element={
            <ProtectedRoute
              token={token}
              role={roleUser}
              allowedRole="operator"
            >
              <OperatorGeografis />
            </ProtectedRoute>
          }
        />
        <Route
          path="/operator/event"
          element={
            <ProtectedRoute
              token={token}
              role={roleUser}
              allowedRole="operator"
            >
              <OperatorEvent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/operator/pesertadidik"
          element={
            <ProtectedRoute
              token={token}
              role={roleUser}
              allowedRole="operator"
            >
              <OperatorPesertaDidik />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin/kwarran"
          element={
            <ProtectedRoute token={token} role={roleUser} allowedRole="admin">
              <AdminKwarran />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/operator"
          element={
            <ProtectedRoute token={token} role={roleUser} allowedRole="admin">
              <AdminOperator />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/pesertadidik"
          element={
            <ProtectedRoute token={token} role={roleUser} allowedRole="admin">
              <AdminPesertaDidik />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/gugusdepan"
          element={
            <ProtectedRoute token={token} role={roleUser} allowedRole="admin">
              <AdminGugusDepan />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/geografis"
          element={
            <ProtectedRoute token={token} role={roleUser} allowedRole="admin">
              <AdminGeografis />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/event"
          element={
            <ProtectedRoute token={token} role={roleUser} allowedRole="admin">
              <AdminEvent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/requestlaporangudep"
          element={
            <ProtectedRoute token={token} role={roleUser} allowedRole="admin">
              <AdminRequestLaporanGudep />
            </ProtectedRoute>
          }
        />

        {/* Catch-all route for 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
