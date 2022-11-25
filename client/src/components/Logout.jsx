import { AiOutlineLogout } from "react-icons/ai";
import { useTheme } from "../contexts/theme-context";
import { useNavigate } from "react-router-dom";
const Logout = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/landing-page");
  };
  return (
    <div className=" flex justify-between items-center mt-60  text-lg ">
      <img
        className=" w-16 rounded-full"
        src="https://avatars.githubusercontent.com/u/5550850?v=4"
        alt="brad"
      />
      <div className="flex flex-col">
        <span className="text-lg font-bold">Lokesh khati </span>
        <span className="text-indigo-600">@lokeshkhati</span>
      </div>
      <button
        title="Logout"
        onClick={handleLogout}
        className={`h-10 w-10 rounded-full  flex justify-center items-center ${
          theme === "light" ? "hover:bg-gray-300" : "hover:bg-gray-800"
        } `}
      >
        <AiOutlineLogout size="25" />
      </button>
    </div>
  );
};

export default Logout;
