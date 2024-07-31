import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

const ProtectedRoute = ({children}) => {
  const accessToken = useSelector((state) => state?.auth?.accessToken) ?? "";
  const navigate=useNavigate();
  return accessToken ? children : navigate("/login");
};

export default ProtectedRoute;
