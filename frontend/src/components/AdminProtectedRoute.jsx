import { Navigate } from "react-router-dom";

function AdminProtectedRoute({ children }) {
  const isAdmin = localStorage.getItem("admin");

  return isAdmin === "true" ? children : <Navigate to="/admin" replace />;
}

export default AdminProtectedRoute;