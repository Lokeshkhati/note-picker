import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/auth-context";

function RequiresAuth({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <Navigate state={{ path: location.pathname }} to="/login" replace />
  );
}

export default RequiresAuth;
