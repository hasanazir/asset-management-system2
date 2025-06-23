import { useAuth } from '../context/AuthContext';
import AdminDashboard from './AdminDashboard';
import BaseCommanderDashboard from './BaseCommanderDashboard';
import LogisticsDashboard from './LogisticsDashboard';

const DashboardRouter = () => {
  const { role } = useAuth();

  if (role === 'Admin') return <AdminDashboard />;
  if (role === 'BaseCommander') return <BaseCommanderDashboard />;
  if (role === 'LogisticsOfficer') return <LogisticsDashboard />;
  return <p>Unauthorized</p>;
};

export default DashboardRouter;
