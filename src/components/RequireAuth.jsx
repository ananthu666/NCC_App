import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import AuthContext from "../context/auth/AuthContext";

export const RequireAuth = ({ allowedRoles }) => {
  const context = useContext(AuthContext);
  const { auth } = context;
  const location = useLocation();
  console.log(allowedRoles);
  console.log(auth);
  return auth?.roles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : (
    <Navigate to="/unauthorized" state={{ from: location.pathname }} replace />
  );
};

export default RequireAuth;
