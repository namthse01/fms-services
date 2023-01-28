import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { selectCurrentToken } from "../slices/auth/authSlice";

const RequireAuth = ({ children }) => {
    const token = localStorage.getItem("token")
    // const rememberMe = JSON.parse(localStorage.getItem("rememberMe")) || false;
    const location = useLocation();
    return token ? (
        children
    ) : (
        <Navigate to="/" state={{ from: location }} replace />
    );
};

export default RequireAuth;
