import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/operator/gugusdepan"
          element={
            <ProtectedRoute>
              <OperatorGugusDepan />
            </ProtectedRoute>
          }
        />
        <Route
          path="/operator/geografis"
          element={
            <ProtectedRoute>
              <OperatorGeografis />
            </ProtectedRoute>
          }
        />
        <Route
          path="/operator/event"
          element={
            <ProtectedRoute>
              <OperatorEvent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/operator/pesertadidik"
          element={
            <ProtectedRoute>
              <OperatorPesertaDidik />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/kwarran"
          element={
            <ProtectedRoute>
              <AdminKwarran />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/operator"
          element={
            <ProtectedRoute>
              <AdminOperator />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/pesertadidik"
          element={
            <ProtectedRoute>
              <AdminPesertaDidik />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/gugusdepan"
          element={
            <ProtectedRoute>
              <AdminGugusDepan />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/geografis"
          element={
            <ProtectedRoute>
              <AdminGeografis />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/event"
          element={
            <ProtectedRoute>
              <AdminEvent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/requestlaporangudep"
          element={
            <ProtectedRoute>
              <AdminRequestLaporanGudep />
            </ProtectedRoute>
          }
        />
        {/* Catch-all route for 404 */}
        <Route path="/" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
