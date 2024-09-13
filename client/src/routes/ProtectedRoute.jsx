// import React from "react";
import { Navigate } from "react-router-dom";
import AnimateR from "./AnimatedRoute";
function useAuth() {
  const isAuthenticated = localStorage.getItem("token");
  return isAuthenticated;
}

export default function PrivateRoute({ children }) {
  const isAuthenticated = useAuth();
  return isAuthenticated ? (
    <AnimateR>{children}</AnimateR>
  ) : (
    <Navigate to="/log-in" />
  );
}
