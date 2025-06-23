import { useNavigate } from "react-router-dom";

const BaseCommanderDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <h2>Welcome Base Commander</h2>
      <div className="dashboard-buttons">
        <button onClick={() => navigate("/transfers")}>🔁 Manage Transfers</button>
        <button onClick={() => navigate("/assignments")}>🪖 Assign & Track Assets</button>
        <button onClick={() => navigate("/movements")}>📊 View Net Movement</button>
      </div>
    </div>
  );
};

export default BaseCommanderDashboard;
