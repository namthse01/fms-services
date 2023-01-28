import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import NoInternetConnectionError from "../../components/Pages/noInternetConnectionError/NoInternetConnectionError";

const CheckInternetConnection = ({ children }) => {
  const [isOnline, setOnline] = useState(true);

  const location = useLocation();

  // On initization set the isOnline state.
  useEffect(() => {
    setOnline(navigator.onLine);
  }, []);

  // event listeners to update the state
  window.addEventListener("online", () => {
    setOnline(true);
  });

  window.addEventListener("offline", () => {
    setOnline(false);
  });

  return isOnline ? (
    children
  ) : (
    <NoInternetConnectionError />
    // <Navigate to="/no-connection" state={{ from: location }} replace />
  );
};

export default CheckInternetConnection;
