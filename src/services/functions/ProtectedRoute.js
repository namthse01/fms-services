import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useSelector } from "react-redux";
import { selectCurrentRole } from "../slices/auth/authSlice";

const ProtectedRoute = ({ user, children }) => {
  const location = useLocation();
  const role = JSON.parse(localStorage.getItem("userLoginBasicInformationDto")).roleName;


  // console.log("user:", user);
  if (user.includes(role)) {
    return children;
  }
  return <Navigate to="/error" state={{ from: location }} replace />;

  // return <Navigate to="/" state={{ from: location }} replace />;
};

export default ProtectedRoute;
