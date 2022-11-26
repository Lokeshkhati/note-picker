import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/theme-context";
import { useState } from "react";
import axios from "axios";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../contexts/auth-context";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { theme } = useTheme();
  const { setUser } = useAuth();

  // let from = location.state?.from?.pathname || "/";
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/login",
        { email, password },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("LogIn Successfull", {
        position: toast.POSITION.TOP_RIGHT,
      });
      const { user, token } = data;
      const { fullname, username } = user;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      setUser({ fullname, username });
      console.log(fullname, username);
      navigate("/", { replace: true });
    } catch (error) {
      toast.error(error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
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
        {/* {error && (
          <h1 className="text-rose-500 text-lg font-semibold">{error} </h1>
        )} */}
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
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            type="email"
            className="w-full mt-2  pl-4  py-1.5 rounded border-2 outline-none focus:border-indigo-500"
            placeholder="johndoe@example.com"
          />
        </div>

        <div className="w-full  mt-2.5 ">
          <label className="  font-semibold  ">Password</label>

          <input
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            required
            className="w-full mt-2  pl-4 py-1.5 rounded border-2  outline-none  focus:border-indigo-500"
            placeholder="************"
          />
        </div>

        <div className="w-full  mt-2 ">
          <button className=" w-full  mx-auto bg-indigo-500 hover:bg-indigo-600 text-white rounded  py-2 m-3 font-semibold">
            LOGIN
          </button>
        </div>

        <div className="w-full  mt-2 ">
          <button
            // onClick={handleTestLogin}
            className=" w-full text-00 mx-auto border border-indigo-500 hover:bg-indigo-600 hover:text-white rounded  py-2 m-3 font-semibold"
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
