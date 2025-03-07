import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import ProtectedRoute from "./ProtectedRoute";
import LoginPage from "./components/pages/LoginPage";
import OperatorGugusDepan from "./components/pages/operator/OperatorGugusDepan";
import OperatorGeografis from "./components/pages/operator/OperatorGeografis";
import OperatorPesertaDidik from "./components/pages/operator/OperatorPesertaDidik";
import OperatorPrestasi from "./components/pages/operator/OperatorPrestasi";
import AdminKwarran from "./components/pages/admin/AdminKwarran";
import NotFound from "./components/pages/NotFound";
import AdminGugusDepan from "./components/pages/admin/AdminGugusDepan";
import AdminGeografis from "./components/pages/admin/AdminGeografis";
import AdminPesertaDidik from "./components/pages/admin/AdminPesertaDidik";
import AdminEvent from "./components/pages/admin/AdminEvent";
import AdminOperator from "./components/pages/admin/AdminOperator";
import AdminRequestLaporanGudep from "./components/pages/admin/AdminLaporanGudep";
import AdminKwarranForm from "./components/pages/admin/AdminKwarranForm";
import AdminOperatorForm from "./components/pages/admin/AdminOperatorForm";
import AdminPrestasi from "./components/pages/admin/AdminPrestasi";
import AdminEventForm from "./components/pages/admin/AdminEventForm";
import AdminProfile from "./components/pages/admin/AdminProfile";
import OperatorPrestasiForm from "./components/pages/operator/OperatorPrestasiForm";
import OperatorEventForm from "./components/pages/operator/OperatorEventForm";
import OperatorPesertaDidikForm from "./components/pages/operator/OperatorPesertaDidikForm";
import OperatorProfile from "./components/pages/operator/OperatorProfile";
import UserDashboard from "./components/pages/user/UserDashboard";
import UserGugusdepan from "./components/pages/user/UserGugusdepan";
import UserLaporan from "./components/pages/user/UserLaporan";

const App = () => {
  const token = localStorage.getItem("token");
  let roleUser = "";

  if (token) {
    try {
      const decoded = jwtDecode(token);
      console.log("Decoded Token:", decoded);
      roleUser = decoded.role;
    } catch (error) {
      console.error("Invalid token");
    }
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

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
          path="/operator/prestasi"
          element={
            <ProtectedRoute
              token={token}
              role={roleUser}
              allowedRole="operator"
            >
              <OperatorPrestasi />
            </ProtectedRoute>
          }
        />
        <Route
          path="/operator/prestasi/add"
          element={
            <ProtectedRoute
              token={token}
              role={roleUser}
              allowedRole="operator"
            >
              <OperatorPrestasiForm isEdit={false} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/operator/prestasi/edit/:id"
          element={
            <ProtectedRoute
              token={token}
              role={roleUser}
              allowedRole="operator"
            >
              <OperatorPrestasiForm isEdit={true} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/operator/event/add"
          element={
            <ProtectedRoute
              token={token}
              role={roleUser}
              allowedRole="operator"
            >
              <OperatorEventForm />
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
        <Route
          path="/operator/pesertadidik/add"
          element={
            <ProtectedRoute
              token={token}
              role={roleUser}
              allowedRole="operator"
            >
              <OperatorPesertaDidikForm isEdit={false} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/operator/pesertadidik/edit/:id"
          element={
            <ProtectedRoute
              token={token}
              role={roleUser}
              allowedRole="operator"
            >
              <OperatorPesertaDidikForm isEdit={true} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/operator/profile"
          element={
            <ProtectedRoute
              token={token}
              role={roleUser}
              allowedRole="operator"
            >
              <OperatorProfile />
            </ProtectedRoute>
          }
        />
        {/* Admin Routes */}
        <Route
          path="/admin/kwarran/add"
          element={
            <ProtectedRoute token={token} role={roleUser} allowedRole="admin">
              <AdminKwarranForm isEdit={false} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/kwarran/edit/:id"
          element={
            <ProtectedRoute token={token} role={roleUser} allowedRole="admin">
              <AdminKwarranForm isEdit={true} />
            </ProtectedRoute>
          }
        />
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
          path="/admin/operator/add"
          element={
            <ProtectedRoute token={token} role={roleUser} allowedRole="admin">
              <AdminOperatorForm isEdit={false} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/operator/edit/:id"
          element={
            <ProtectedRoute token={token} role={roleUser} allowedRole="admin">
              <AdminOperatorForm isEdit={true} />
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
          path="/admin/event/add"
          element={
            <ProtectedRoute token={token} role={roleUser} allowedRole="admin">
              <AdminEventForm isEdit={false} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/event/edit/:id"
          element={
            <ProtectedRoute token={token} role={roleUser} allowedRole="admin">
              <AdminEventForm isEdit={true} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/laporangudep"
          element={
            <ProtectedRoute token={token} role={roleUser} allowedRole="admin">
              <AdminRequestLaporanGudep />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/prestasi"
          element={
            <ProtectedRoute token={token} role={roleUser} allowedRole="admin">
              <AdminPrestasi />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/profile"
          element={
            <ProtectedRoute token={token} role={roleUser} allowedRole="admin">
              <AdminProfile />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<UserDashboard />} />
        <Route path="/gugusdepan" element={<UserGugusdepan />} />
        <Route path="/laporan" element={<UserLaporan />} />
        {/* Catch-all route for 404 */}
        <Route path="*" element={<NotFound role={roleUser} />} />
      </Routes>
    </Router>
  );
};

export default App;
