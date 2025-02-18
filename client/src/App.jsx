import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/pages/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import OperatorGugusDepan from "./components/pages/operator/OperatorGugusDepan";
import OperatorGeografis from "./components/pages/operator/OperatorGeografis";
import OperatorPesertaDidik from "./components/pages/operator/OperatorPesertaDidik";
import OperatorEvent from "./components/pages/operator/OperatorEvent";
import AdminKwarran from "./components/pages/admin/AdminKwarran";
import NotFound from "./components/pages/NotFound"; // Import komponen NotFound

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
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
          path="/admin/pesertadidik"
          element={
            <ProtectedRoute>
              <AdminKwarran />
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
