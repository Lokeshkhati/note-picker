import { Link } from "react-router-dom";
import note from "./note.png";

const Landing = () => {
  return (
    <div className="h-screen ">
      <div className="flex  justify-center ">
        <div className="flex sm:mt-20 sm:flex-nowrap flex-wrap justify-between items-center max-w-6xl">
          <div className="p-6 xl:p-0 sm:w-1/2">
            {/* <div className="flex gap-4  items-center mb-6">
              <img className="h-10  " src={logo} alt="logo" />
              <h1 className="text-2xl sm:text-4xl font-bold leading-losse">
                Note-
                <span className=" text-indigo-600 sm:mt-2">Picker</span>
              </h1>
            </div> */}
            <div className="mb-6">
              <h1 className="text-2xl sm:text-4xl font-bold leading-losse">
                Meet your Modern
                <br />
                <span className="block text-indigo-600 sm:mt-2">
                  Note Taking App
                </span>
              </h1>
            </div>
            <p className="text-lg sm:text-xl font-semibold">
              Manage your daily tasks and workflow in a modern way and boost
              your efficiency without any efforts.
            </p>

            <Link
              className="flex justify-center items-center w-32 mt-6 mb-4 font-semibold h-10  text-white bg-indigo-600 hover:bg-indigo-500"
              to="/register"
            >
              Join Now
            </Link>
            <Link
              className="block w-max text-indigo-600 font-semibold hover:underline"
              to="/login"
            >
              Already have an account?
            </Link>
          </div>
          <div className="order-first sm:order-1  sm:w-1/2">
            <img className="w-full " src={note} alt="note" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
