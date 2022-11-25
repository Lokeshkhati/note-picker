import { useTheme } from "../contexts/theme-context";
import { Link } from "react-router-dom";
import logo from "./logo.png";
// import { AiOutlineMenu } from "react-icons/ai";
// import { useNotes } from "../contexts/notes-context";
// import { useState } from "react";

const Navbar = ({ setIsOpen }) => {
  const { theme, setTheme } = useTheme();

  return (
    <nav
      className={` z-40 sticky top-0 flex justify-center items-center h-14  ${
        theme === "light"
          ? " bg-white text-slate-800 "
          : "  bg-gray-800 text-white"
      } `}
    >
      <div className="flex justify-between max-w-7xl  w-full ">
        <div className="flex gap-6 justify-center items-center">
          {/* <div
            onClick={toggle}
            className={`flex md:hidden rounded-full h-9 w-9 cursor-pointer justify-center items-center ${
              theme === "light" ? "hover:bg-gray-300" : "hover:bg-gray-700"
            }`}
          >
            <AiOutlineMenu size="25" />
          </div> */}
          <button
            className="lg:hidden  text-black"
            onClick={() => setIsOpen(true)}
          >
            <svg width="24" height="24">
              <path
                d="M5 6h14M5 12h14M5 18h14"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                color={`${theme === "light" ? "black " : "white"}`}
              ></path>
            </svg>
          </button>
          <div className="cursor-pointer ">
            <Link className="flex justify-center items-center" to="/">
              <img className="h-8  md:h-12 sm:h-10" src={logo} alt="logo" />
              <h1 className="ml-2 text-xl sm:text-2xl font-bold ">
                <span>Note-</span>
                <span className="text-indigo-600">Picker</span>
              </h1>
            </Link>
          </div>
        </div>

        <div className="flex items-center">
          {/* <h1 className=" hidden sm:block mr-10 text-lg font-bold text-indigo-500">
           {`Hi ${user.email} ${user.lastName}`}
          </h1> */}
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "dark" ? (
              <div className="w-10 h-10 hover:bg-gray-700 rounded-full flex justify-center items-center">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 512 512"
                  aria-hidden="true"
                  focusable="false"
                  height="1.5em"
                  width="1.5em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M256 160c-52.9 0-96 43.1-96 96s43.1 96 96 96 96-43.1 96-96-43.1-96-96-96zm246.4 80.5l-94.7-47.3 33.5-100.4c4.5-13.6-8.4-26.5-21.9-21.9l-100.4 33.5-47.4-94.8c-6.4-12.8-24.6-12.8-31 0l-47.3 94.7L92.7 70.8c-13.6-4.5-26.5 8.4-21.9 21.9l33.5 100.4-94.7 47.4c-12.8 6.4-12.8 24.6 0 31l94.7 47.3-33.5 100.5c-4.5 13.6 8.4 26.5 21.9 21.9l100.4-33.5 47.3 94.7c6.4 12.8 24.6 12.8 31 0l47.3-94.7 100.4 33.5c13.6 4.5 26.5-8.4 21.9-21.9l-33.5-100.4 94.7-47.3c13-6.5 13-24.7.2-31.1zm-155.9 106c-49.9 49.9-131.1 49.9-181 0-49.9-49.9-49.9-131.1 0-181 49.9-49.9 131.1-49.9 181 0 49.9 49.9 49.9 131.1 0 181z"></path>
                </svg>
              </div>
            ) : (
              <div className="w-10 h-10 hover:bg-gray-300 rounded-full flex justify-center items-center">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 512 512"
                  aria-hidden="true"
                  focusable="false"
                  height="1.5em"
                  width="1.5em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M283.211 512c78.962 0 151.079-35.925 198.857-94.792 7.068-8.708-.639-21.43-11.562-19.35-124.203 23.654-238.262-71.576-238.262-196.954 0-72.222 38.662-138.635 101.498-174.394 9.686-5.512 7.25-20.197-3.756-22.23A258.156 258.156 0 0 0 283.211 0c-141.309 0-256 114.511-256 256 0 141.309 114.511 256 256 256z"></path>
                </svg>
              </div>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
