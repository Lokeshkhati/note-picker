import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/theme-context";
import { useState } from "react";

import { useAuth } from "../contexts/auth-context";

const Register = () => {
  const { theme } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleRegister = (event) => {
    event.preventDefault();
    setError("");
    try {
      if (!email.trim() || !password.trim()) {
        setError("Fill all the fields");
      } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        setError("Invalid email");
      } else {
        signUp(email, password);
        navigate("/login");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div
      className={`flex  justify-center items-center h-screen  ${
        theme === "light"
          ? " bg-white text-slate-800 "
          : " bg-gray-900 text-white"
      } `}
    >
      <form
        onClick={handleRegister}
        className=" flex flex-col p-4  items-center w-96 border-2 border-gray-200 rounded "
      >
        <h1 className="text-2xl font-bold ">Sign UP</h1>
        {error && (
          <h1 className="text-rose-500 text-lg font-semibold">{error} </h1>
        )}

        <div className="w-full mt-2.5  ">
          <label className="   font-semibold px-1">Email</label>

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            className="w-full mt-2  pl-4  py-2 rounded-lg border-2 border-gray-300  outline-none focus:border-indigo-500"
            placeholder="johndoe@example.com"
          />
        </div>

        <div className="w-full  mt-2.5 ">
          <label className="  font-semibold  ">Password</label>

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
            className="w-full mt-2  pl-4  py-2 rounded-lg border-2 border-gray-300  outline-none focus:border-indigo-500"
            placeholder="************"
          />
        </div>

        <div className="w-full  mt-2 ">
          <button className=" w-full  mx-auto bg-indigo-500 hover:bg-indigo-600     text-white rounded-lg  py-2.5 m-3 font-semibold">
            REGISTER NOW
          </button>
        </div>

        <div className="text-md">
          <span className="  ">Already have an account? </span>
          <Link
            className=" text-indigo-500 hover:underline font-semibold"
            to="/login"
          >
            LogIn
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
