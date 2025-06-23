// src/pages/LandingPage.js

import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to the Asset Management System</h1>
      <p>Please choose an option below:</p>
      <div style={{ marginTop: "20px" }}>
        <Link to="/login">
          <button>Login</button>
        </Link>
        <span style={{ margin: "0 10px" }} />
        <Link to="/register">
          <button>Register</button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
