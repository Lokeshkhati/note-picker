import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/auth-context";

function RequiresAuth({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  return user ? (
    <div>{children}</div>
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
}

export default RequiresAuth;
