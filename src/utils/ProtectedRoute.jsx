import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { userName } = useSelector((x) => x.account);
  if (!userName) return <Navigate to={"/"} />;
  return children;
}

function ProtectedRoute2({ children }) {
  const { userName, role } = useSelector((x) => x.account);
  if (role === "doctor" && !userName) return <Navigate to={"/"} />;
  return children;
}

function ProtectedRoute3({ children }) {
  const { userName, role } = useSelector((x) => x.account);
  if (role !== "doctor" && !userName) return <Navigate to={"/"} />;
  return children;
}

const PrivateRoute = ({ element, isAuthenticated, redirectTo, ...props }) => {
  return (
    <Route
      {...props}
      element={isAuthenticated ? element : <Navigate to={redirectTo} replace />}
    />
  );
};


export { ProtectedRoute, ProtectedRoute2, ProtectedRoute3,PrivateRoute };
