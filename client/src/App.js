import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider } from "./context/AuthContext";
import DashboardRouter from "./pages/DashboardRouter";
import PurchasesPage from "./pages/PurchasesPage";
import TransfersPage from "./pages/TransfersPage";
import AssignmentsPage from "./pages/AssignmentsPage";
import NetMovementPage from "./pages/NetMovementPage";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<DashboardRouter />} />
          <Route path="/purchases" element={<PurchasesPage />} />
          <Route path="/transfers" element={<TransfersPage />} />
          <Route path="/assignments" element={<AssignmentsPage />} />
          <Route path="/movements" element={<NetMovementPage />} /> 

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
