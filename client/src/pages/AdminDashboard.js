import { useNavigate } from "react-router-dom";
import NetMovementSummary from "../components/NetMovementSummary";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <h2>Welcome Admin</h2>
      <div className="dashboard-buttons">
        <button onClick={() => navigate("/purchases")}>📦 Manage Purchases</button>
        <button onClick={() => navigate("/transfers")}>🔁 Manage Transfers</button>
        <button onClick={() => navigate("/assignments")}>🪖 View Assignments</button>
        <button onClick={() => navigate("/movements")}>📊 View Net Movement</button>
        {/* <NetMovementSummary /> */}
      </div>
    </div>
  );
};

export default AdminDashboard;
