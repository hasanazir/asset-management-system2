import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";


function Login() {
  const { login, token } = useAuth();
  console.log("Token at Login Page:", token);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

//   if (token) return <Navigate to="/dashboard" />;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);
      const { name, role, base } = res.data.user;
      login(res.data.token, role, name, base);
      console.log("role in Login.js is: "+ role);
      alert("Login successful");
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed: " + err.response?.data?.message || "Unknown error");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        /><br/>
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        /><br/>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
