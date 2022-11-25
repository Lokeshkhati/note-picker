import { Link, useLocation, useNavigate } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import { useTheme } from "../contexts/theme-context";
import { useAuth } from "../contexts/auth-context";
import { useState, useReducer } from "react";
// import { initialState, loginReducer } from "../reducers/loginReducer";

const Login = () => {
  const { theme } = useTheme();
  const [error, setError] = useState("");
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });


  const { login } = useAuth();
  const navigate = useNavigate();

  const testCredentials = {
    email: "test@gmail.com",
    password: "test123",
  };

  const handleLogin = (event) => {
    event.preventDefault();
    setError("");
    try {
      login(credentials.email, credentials.password);
      navigate("/", { replace: true });
    } catch (error) {
      setError(error.message);
    }
  };

  // let from = location.state?.from?.pathname || "/";

  const handleTestLogin = async (event) => {
    event.preventDefault();
    setCredentials(testCredentials);
    login(testCredentials.email, testCredentials.password);
    navigate("/", { replace: true });
  };

  return (
    <div
      className={`flex  justify-center items-center h-screen ${
        theme === "light"
          ? " bg-white text-slate-800 "
          : " bg-gray-900 text-white"
      } `}
    >
      <form
        onSubmit={handleLogin}
        className=" flex flex-col p-4   w-96 border-2 rounded border-gray-200 "
      >
        <h1 className=" text-2xl font-bold text-center ">LogIn</h1>
        {error && (
          <h1 className="text-rose-500 text-lg font-semibold">{error} </h1>
        )}
        <div className="text-md mt-2 text-center">
          <span className="  ">Don't have an account? </span>
          <Link
            className=" text-indigo-500 hover:underline font-semibold"
            to="/register"
          >
            Register
          </Link>
        </div>
        <div className="w-full mt-2.5  ">
          <label className="   font-semibold px-1">Email</label>

          <input
            value={credentials.email}
            onChange={(e) =>
              setCredentials((prev) => ({ ...prev, email: e.target.value }))
            }
            type="email"
            className="w-full mt-2  pl-4  py-2 rounded-lg border-2 border-gray-300  outline-none focus:border-indigo-500"
            placeholder="johndoe@example.com"
          />
        </div>

        <div className="w-full  mt-2.5 ">
          <label className="  font-semibold  ">Password</label>

          <input
            value={credentials.password}
            onChange={(e) =>
              setCredentials((prev) => ({ ...prev, password: e.target.value }))
            }
            type="password"
            required
            className="w-full mt-2  pl-4  py-2 rounded-lg border-2 border-gray-300  outline-none  focus:border-indigo-500"
            placeholder="************"
          />
        </div>

        <div className="w-full  mt-2 ">
          <button className=" w-full  mx-auto bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg  py-2.5 m-3 font-semibold">
            LOGIN
          </button>
        </div>

        <div className="w-full  mt-2 ">
          <button
            onClick={handleTestLogin}
            className=" w-full text-00 mx-auto border border-indigo-500 hover:bg-indigo-600 hover:text-white rounded-lg  py-2.5 m-3 font-semibold"
          >
            LOGIN AS GUEST
          </button>
        </div>

        {/* <div className="text-md text-right">
          <Link
            className="   text-indigo-500 hover:underline font-semibold"
            to="/#"
          >
            Forget password?
          </Link>
        </div> */}
      </form>
    </div>
  );
};

export default Login;
