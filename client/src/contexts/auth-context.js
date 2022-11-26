import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthContext = createContext();

const useAuth = () => useContext(AuthContext);


const AuthProvider = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token");
  const [user, setUser] = useState({
    fullname: "",
    username: "",
  });

  // const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    // navigate("/landing-page", { replace: true });
    toast.success("Logged out Successfully", {
      position: toast.POSITION.BOTTOM_CENTER,
    });
    window.location.reload();
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user);
      const { fullname, username } = userData;
      setUser({ fullname, username });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        setUser,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };