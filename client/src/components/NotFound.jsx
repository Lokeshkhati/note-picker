import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-6 h-screen">
      <h1 className="text-5xl  font-bold">Page Not Found</h1>
      <Link className="text-indigo-600 text-xl hover:underline" to="/home">
        go to Home
      </Link>
    </div>
  );
};

export default NotFound;
