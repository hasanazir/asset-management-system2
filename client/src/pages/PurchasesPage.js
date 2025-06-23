import React, { useState, useEffect } from "react";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";

const PurchasesPage = () => {
  const { role, base, userName } = useAuth();
  const [form, setForm] = useState({
    assetType: "",
    assetName: "",
    quantity: "",
    base: base || "",
    purchasedBy: userName || "", // base assigned to user
  });

  const [purchases, setPurchases] = useState([]);
  const [filter, setFilter] = useState({
    equipmentType: "",
    date: "",
  });

  // 📤 Fetch Purchases on Load/Filter Change
  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const res = await api.get("/purchase", {
          params: filter,
        });
        setPurchases(res.data);
      } catch (err) {
        console.error("Error fetching purchases:", err);
      }
    };

    fetchPurchases();
  }, [filter]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/purchase", {
        ...form,
        purchasedBy: userName, // from auth context
      });

      alert("Purchase recorded successfully!");
      setForm({
        assetType: "",
        assetName: "",
        quantity: "",
        base: base||"",
        purchasedBy: userName,
      });
      setFilter({ ...filter }); // refresh
    } catch (err) {
      console.error("Error recording purchase:", err);
      alert("Failed to record purchase");
    }
  };


  return (
    <div className="container">
      <h2>Purchase Asset</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="assetType"
            placeholder="Asset Type (e.g., Weapon, Vehicle)"
            value={form.assetType}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="assetName"
            placeholder="Asset Name (e.g., AK-47, Jeep)"
            value={form.assetName}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={form.quantity}
            onChange={handleChange}
            required
          />
          {role === "Admin" && (
            <input
              type="text"
              name="base"
              placeholder="Base Name"
              value={form.base}
              onChange={handleChange}
              required
            />
          )}
          <button type="submit">Submit Purchase</button>
        </form>


      <hr />
      <h3>Past Purchases</h3>

      {/* Filters */}
      <div>
        <input
          type="text"
          placeholder="Filter by Asset Type"
          value={filter.assetType}
          onChange={(e) =>
            setFilter({ ...filter, assetType: e.target.value })
          }
        />
        <input
          type="date"
          value={filter.date}
          onChange={(e) => setFilter({ ...filter, date: e.target.value })}
        />
      </div>

      {/* Purchase Table */}
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Name</th>
            <th>Qty</th>
            <th>Base</th>
            <th>By</th>
          </tr>
        </thead>
        <tbody>
          {purchases.map((p) => (
            <tr key={p._id}>
              <td>{new Date(p.date).toLocaleDateString()}</td>
              <td>{p.assetType}</td>
              <td>{p.assetName}</td>
              <td>{p.quantity}</td>
              <td>{p.base}</td>
              <td>{p.purchasedBy}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PurchasesPage;
