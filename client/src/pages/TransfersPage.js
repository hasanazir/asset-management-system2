// src/pages/TransfersPage.js
import React, { useState, useEffect } from "react";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";

const TransfersPage = () => {
  const { role, base, name, token } = useAuth();

  const [form, setForm] = useState({
    assetName: "",
    quantity: "",
    fromBase: role === "BaseCommander" ? base : "",
    toBase: "",
  });

  const [transfers, setTransfers] = useState([]);

  // Fetch all past transfers
  useEffect(() => {
    const fetchTransfers = async () => {
      try {
        const res = await api.get("/transfer");
        setTransfers(res.data);
      } catch (err) {
        console.error("Error fetching transfers:", err);
      }
    };

    fetchTransfers();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (role === "LogisticsOfficer") {
      alert("Logistics Officers cannot perform transfers");
      return;
    }

    if (role === "BaseCommander" && form.fromBase !== base && form.toBase !== base) {
      alert("You can only transfer assets from/to your assigned base");
      return;
    }

    try {
      await api.post("/transfer", {
        ...form,
        quantity: Number(form.quantity),
      });

      alert("Transfer successful!");
      setForm({
        assetName: "",
        quantity: "",
        fromBase: role === "BaseCommander" ? base : "",
        toBase: "",
      });
    } catch (err) {
      console.error("Transfer error:", err);
      alert("Transfer failed");
    }
  };

  return (
    <div className="container">
      <h2>Transfer Asset</h2>

      {/* Disable form for Logistics Officer */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="assetName"
          placeholder="Asset Name"
          value={form.assetName}
          onChange={handleChange}
          required
          disabled={role === "LogisticsOfficer"}
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={form.quantity}
          onChange={handleChange}
          required
          disabled={role === "LogisticsOfficer"}
        />
        <input
          type="text"
          name="fromBase"
          placeholder="From Base"
          value={form.fromBase}
          onChange={handleChange}
          required
          disabled={role === "BaseCommander" || role === "LogisticsOfficer"}
        />
        <input
          type="text"
          name="toBase"
          placeholder="To Base"
          value={form.toBase}
          onChange={handleChange}
          required
          disabled={role === "LogisticsOfficer"}
        />
        <button type="submit" disabled={role === "LogisticsOfficer"}>Transfer</button>
      </form>

      <hr />
      <h3>Transfer History</h3>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Asset</th>
            <th>Qty</th>
            <th>From</th>
            <th>To</th>
            <th>By</th>
          </tr>
        </thead>
        <tbody>
          {transfers.map((t) => (
            <tr key={t._id}>
              <td>{new Date(t.date).toLocaleDateString()}</td>
              <td>{t.assetName}</td>
              <td>{t.quantity}</td>
              <td>{t.fromBase}</td>
              <td>{t.toBase}</td>
              <td>{t.transferredBy}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransfersPage;
