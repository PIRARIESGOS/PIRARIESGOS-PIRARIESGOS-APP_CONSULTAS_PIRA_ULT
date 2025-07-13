// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./auth/authStore";
import Login from "./pages/Login";
import Coincidencias from "./pages/Coincidencias";
import HistorialTareas from "./pages/HistorialTareas";
import Auditoria from "./pages/Auditoria";
import Ayuda from "./pages/wiki/WikiAyuda";
import Sidebar from "./components/layout/Sidebar";
import useAuth from "./hooks/useAuth";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 bg-gray-100 p-4">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<ProtectedRoute><Coincidencias /></ProtectedRoute>} />
              <Route path="/tareas" element={<ProtectedRoute><HistorialTareas /></ProtectedRoute>} />
              <Route path="/auditoria" element={<ProtectedRoute><Auditoria /></ProtectedRoute>} />
              <Route path="/ayuda" element={<ProtectedRoute><Ayuda /></ProtectedRoute>} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
