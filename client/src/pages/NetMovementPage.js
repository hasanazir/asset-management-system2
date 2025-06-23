import React, { useEffect, useState } from "react";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";

const NetMovementPage = () => {
  const { base: userBase, role } = useAuth();
  const [summary, setSummary] = useState(null);
  const [filters, setFilters] = useState({
    base: userBase,
    from: "",
    to: "",
  });
  const [showPopup, setShowPopup] = useState(false);

  const fetchSummary = async () => {
    try {
      const res = await api.get("/movements", { params: filters });
      setSummary(res.data);
    } catch (err) {
      console.error("Failed to fetch movement summary", err);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, [filters]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <h2>Net Movement Summary</h2>

      {/* Filters */}
      <div>
        <input
          type="text"
          name="base"
          value={filters.base}
          onChange={handleChange}
          placeholder="Base"
        />
        <input
          type="date"
          name="from"
          value={filters.from}
          onChange={handleChange}
        />
        <input
          type="date"
          name="to"
          value={filters.to}
          onChange={handleChange}
        />
        <button onClick={fetchSummary}>Apply</button>
      </div>

      {summary && (
        <div className="metrics">
          <p><strong>Net Movement:</strong> {summary.netMovement}</p>
          <p><strong>Total Purchases:</strong> {summary.totalPurchased}</p>
          <p><strong>Transfers In:</strong> {summary.totalIn}</p>
          <p><strong>Transfers Out:</strong> {summary.totalOut}</p>
          <p><strong>Assigned:</strong> {summary.totalAssigned}</p>
          <p><strong>Expended:</strong> {summary.totalExpended}</p>

          <button onClick={() => setShowPopup(true)}>Show Breakdown</button>
        </div>
      )}

      {/* Popup for Breakdown */}
      {showPopup && (
        <div className="popup">
          <h3>Breakdown</h3>
          <h4>Purchases</h4>
          <ul>
            {summary.purchases.map((p) => (
              <li key={p._id}>{p.assetName} - {p.quantity} ({new Date(p.date).toLocaleDateString()})</li>
            ))}
          </ul>
          <h4>Transfers In</h4>
          <ul>
            {summary.transfersIn.map((t) => (
              <li key={t._id}>{t.assetName} - {t.quantity} from {t.fromBase}</li>
            ))}
          </ul>
          <h4>Transfers Out</h4>
          <ul>
            {summary.transfersOut.map((t) => (
              <li key={t._id}>{t.assetName} - {t.quantity} to {t.toBase}</li>
            ))}
          </ul>

          <button onClick={() => setShowPopup(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default NetMovementPage;
