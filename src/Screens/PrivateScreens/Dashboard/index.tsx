import { HeaderDashboard } from "../../../components/HeaderDashboard";
import { Outlet } from "react-router-dom";

const DashboardPage = () => {
  return (
    <>
      <HeaderDashboard />
      <Outlet />
    </>
  );
};

export default DashboardPage;
