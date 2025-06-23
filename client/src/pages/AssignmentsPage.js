import React, { useState, useEffect } from "react";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";

const AssignmentsPage = () => {
  const { role, base: userBase, name } = useAuth();
  const [assignForm, setAssignForm] = useState({
    assetName: "",
    assignedTo: "",
    quantity: "",
    base: role === "Admin" ? "" : userBase,
  });

  const [assignments, setAssignments] = useState([]);
  const [filters, setFilters] = useState({ base: "", expended: "" });

  // 🔃 Fetch assignments on load or filter change
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const res = await api.get("/assignment", { params: filters });
        setAssignments(res.data);
      } catch (err) {
        console.error("Error fetching assignments:", err);
      }
    };
    fetchAssignments();
  }, [filters]);

  const handleChange = (e) => {
    setAssignForm({ ...assignForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/assignment", assignForm);
      alert("Asset assigned successfully");
      setAssignForm({
        assetName: "",
        assignedTo: "",
        quantity: "",
        base: role === "Admin" ? "" : userBase,
      });
      setFilters({ ...filters }); // refresh
    } catch (err) {
      console.error("Error assigning asset:", err);
      alert("Assignment failed: " + err.response?.data?.error || "Unknown error");
    }
  };

  const markAsExpended = async (id) => {
    try {
      await api.patch(`/assignment/${id}/expended`);
      alert("Marked as expended");
      setFilters({ ...filters }); // refresh
    } catch (err) {
      console.error("Error marking expended:", err);
    }
  };

  return (
    <div className="container">
      <h2>Assign Asset</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="assetName"
          placeholder="Asset Name"
          value={assignForm.assetName}
          onChange={handleChange}
          required
        />
        <input
          name="assignedTo"
          placeholder="Assigned To"
          value={assignForm.assignedTo}
          onChange={handleChange}
          required
        />
        <input
          name="quantity"
          type="number"
          placeholder="Quantity"
          value={assignForm.quantity}
          onChange={handleChange}
          required
        />
        {role === "Admin" && (
          <input
            name="base"
            placeholder="Base Name"
            value={assignForm.base}
            onChange={handleChange}
            required
          />
        )}
        <button type="submit">Assign</button>
      </form>

      <hr />
      <h3>Assignment Records</h3>

      {/* Filters */}
      <div>
        <input
          placeholder="Filter by Base"
          value={filters.base}
          onChange={(e) => setFilters({ ...filters, base: e.target.value })}
        />
        <select
          value={filters.expended}
          onChange={(e) => setFilters({ ...filters, expended: e.target.value })}
        >
          <option value="">All</option>
          <option value="true">Expended</option>
          <option value="false">Not Expended</option>
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Asset</th>
            <th>Assigned To</th>
            <th>Base</th>
            <th>Qty</th>
            <th>Assigned On</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((a) => (
            <tr key={a._id}>
              <td>{a.assetName}</td>
              <td>{a.assignedTo}</td>
              <td>{a.base}</td>
              <td>{a.quantity}</td>
              <td>{new Date(a.assignedOn).toLocaleDateString()}</td>
              <td>{a.isExpended ? "Expended" : "In Use"}</td>
              <td>
                {!a.isExpended &&
                  (role === "Admin" || role === "BaseCommander") && (
                    <button onClick={() => markAsExpended(a._id)}>
                      Mark Expended
                    </button>
                  )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssignmentsPage;
