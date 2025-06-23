import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

function Dashboard() {
  const { role, logout, token } = useAuth();
  console.log("your role is "+role);
  if (!token) return <Navigate to="/" />;

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome, your role is: <strong>{role}</strong></p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Dashboard;
