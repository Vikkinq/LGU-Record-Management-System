import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { currentUser, userRole, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  // 1. Check if user is logged in
  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  // 2. Check if user has the correct role (if roles are specified)
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    alert("Access Denied: You do not have permission to view this page.");
    return <Navigate to="/" replace />;
  }

  // 3. If passed, render the page
  return children;
};

export default ProtectedRoute;