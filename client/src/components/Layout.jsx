import { Outlet } from "react-router-dom";
import { useToggle } from "../hooks/useToggle";
import MobileMenu from "./MobileMenu";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = () => {
  const [isOpen, setIsOpen] = useToggle();
  return (
    <>
      <Navbar setIsOpen={setIsOpen} />
      <div className=" relative flex justify-center ">
        <div className=" flex justify-center max-w-7xl  w-full mt-12 ">
          <Sidebar />
          {isOpen && <MobileMenu setIsOpen={setIsOpen} />}
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
