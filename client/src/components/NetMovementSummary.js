import React, { useEffect, useState } from "react";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";

const NetMovementSummary = () => {
  const { base } = useAuth();
  const [summary, setSummary] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const fetchSummary = async () => {
    try {
      const res = await api.get("/movements", { params: { base } });
      setSummary(res.data);
    } catch (err) {
      console.error("Failed to fetch movement summary", err);
    }
  };

  useEffect(() => {
    if (base) fetchSummary();
  }, [base]);

  if (!summary) return <p>Loading movement summary...</p>;

  return (
    <div className="summary-card">
      <h3>Net Movement Summary for {base}</h3>
      <ul>
        <li>Opening Balance: {summary.openingBalance ?? "N/A"}</li>
        <li>Closing Balance: {summary.closingBalance ?? "N/A"}</li>
        <li>
          Net Movement: {summary.netMovement ?? 0}{" "}
          <button onClick={() => setShowPopup(true)}>View Details</button>
        </li>
        <li>Assigned: {summary.totalAssigned ?? 0}</li>
        <li>Expended: {summary.totalExpended ?? 0}</li>
      </ul>

      {showPopup && (
        <div className="popup">
          <h4>Net Movement Breakdown</h4>

          <h5>Purchases</h5>
          <ul>
            {(summary.purchases || []).map((p) => (
              <li key={p._id}>
                {p.assetName} - {p.quantity} ({new Date(p.date).toLocaleDateString()})
              </li>
            ))}
          </ul>

          <h5>Transfers In</h5>
          <ul>
            {(summary.transferIn || []).map((t) => (
              <li key={t._id}>
                {t.assetName} - {t.quantity} from {t.fromBase}
              </li>
            ))}
          </ul>

          <h5>Transfers Out</h5>
          <ul>
            {(summary.transferOut || []).map((t) => (
              <li key={t._id}>
                {t.assetName} - {t.quantity} to {t.toBase}
              </li>
            ))}
          </ul>

          <button onClick={() => setShowPopup(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default NetMovementSummary;
