import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRouter = ({ auth }) => {
  return <>{auth=="true" ? <Outlet /> : <Navigate to={"/Login"} />}</>;
};

export default ProtectedRouter;
