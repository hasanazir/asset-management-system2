import { useNavigate } from "react-router-dom";

const LogisticsDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <h2>Welcome Logistics Officer</h2>
      <div className="dashboard-buttons">
        <button onClick={() => navigate("/purchases")}>📦 Record Purchases</button>
        <button onClick={() => navigate("/movements")}>📊 View Net Movement</button>
      </div>
    </div>
  );
};

export default LogisticsDashboard;
