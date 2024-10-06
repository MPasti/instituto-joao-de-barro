import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../../services/authService.ts";

const PrivateRouter = () => {
  const isAuth = isAuthenticated();

  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRouter;
