import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";


function Register() {
  //const { token } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email:"",
    password: "",
    role: "Admin",
    base:"", // default role
  });

  const navigate = useNavigate();

  //if (token) return <Navigate to="/dashboard" />;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", formData);
      alert("Registration successful");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("name");
      localStorage.removeItem("base");
      navigate("/"); // go to login
    } catch (err) {
      alert("Error: " + err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        /><br/>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        /><br/>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        /><br/>
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="Admin">Admin</option>
          <option value="BaseCommander">Base Commander</option>
          <option value="LogisticsOfficer">Logistics Officer</option>
        </select><br/>
        <input
          type="text"
          name="base"
          placeholder="Base Name (e.g., BaseA)"
          value={formData.base}
          onChange={handleChange}
          required
        /><br/>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;