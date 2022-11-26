import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/theme-context";
import { useState } from "react";

import { useAuth } from "../contexts/auth-context";

const Register = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
  });

  const { fullname, username, email, password } = formData;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };
  
  const handleRegister = (event) => {
    event.preventDefault();
    console.log(formData);

    
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
        onSubmit={handleRegister}
        className=" flex flex-col p-4  items-center w-96 border-2 border-gray-200 rounded "
      >
        <h1 className="text-2xl font-bold ">Sign UP</h1>
        {/* {error && (
          <h1 className="text-rose-500 text-lg font-semibold">{error} </h1>
        )} */}
        <div className="w-full mt-2.5  ">
          <label className="   font-semibold px-1">Full Name</label>

          <input
            name="fullname"
            value={fullname}
            onChange={handleChange}
            required
            type="text"
            className="w-full mt-2  pl-4  py-1.5 rounded border-2 outline-none focus:border-indigo-500"
            placeholder="John Doe"
          />
        </div>{" "}
        <div className="w-full mt-2.5  ">
          <label className="   font-semibold px-1">Username</label>

          <input
            name="username"
            value={username}
            onChange={handleChange}
            required
            type="text"
            className="w-full mt-2  pl-4  py-1.5 rounded border-2 outline-none focus:border-indigo-500"
            placeholder="johndoe"
          />
        </div>{" "}
        <div className="w-full mt-2.5  ">
          <label className="   font-semibold px-1">Email</label>

          <input
            name="email"
            value={email}
            onChange={handleChange}
            required
            type="email"
            className="w-full mt-2  pl-4  py-1.5 rounded border-2 outline-none focus:border-indigo-500"
            placeholder="johndoe@example.com"
          />
        </div>
        <div className="w-full mt-2.5  ">
          <label className="   font-semibold px-1">Password</label>

          <input
            name="password"
            value={password}
            onChange={handleChange}
            required
            type="password"
            className="w-full mt-2  pl-4  py-1.5 rounded border-2 outline-none focus:border-indigo-500"
            placeholder="**********"
          />
        </div>
        <div className="w-full  mt-2 ">
          <button
            type="submit"
            className=" w-full  text-lg mx-auto bg-indigo-500 text-white rounded  py-2 m-3 "
          >
            Create New Account
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
