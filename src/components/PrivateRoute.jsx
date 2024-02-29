import React, { useContext } from "react";
import AuthContext from "../context/auth/AuthContext";
import { Navigate, Outlet } from "react-router";

const PrivateRoute = () => {
  const context = useContext(AuthContext);
  const { isLoggedIn } = context;
  return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
