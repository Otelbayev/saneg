import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const PrivateRoute = ({ children, to }) => {
  const { user } = useAuthContext();

  if (!user) {
    return <Navigate to={to} />;
  }

  return children;
};

export default PrivateRoute;
