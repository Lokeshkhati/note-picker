import { useTheme } from "../contexts/theme-context";
import Logout from "./Logout";
import { useNavigate } from "react-router-dom";
import SidebarData from "./SidebarData";
import { useState, useRef } from "react";
import useClickOutside from "../hooks/useClickOutside";

import Modal from "./Modal";
import NoteForm from "./NoteForm";
import { useToggle } from "../hooks/useToggle";

const Sidebar = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { theme } = useTheme();
  const navigate = useNavigate();

  const [show, setShow] = useToggle(false);

  const sidebar = SidebarData.map(({ label, icon, path }) => (
    <li
      style={{
        fontWeight: window.location.pathname === path ? "bold" : "",
      }}
      className={`flex gap-4 h-10 items-center cursor-pointer ${
        theme === "light" ? "hover:bg-gray-200" : "hover:bg-gray-800"
      }`}
      key={path}
      onClick={() => {
        navigate(path);
      }}
    >
      <div>{icon} </div>
      <div className="tracking-wider">{label} </div>
    </li>
  ));
  return (
    <>
      <aside className=" hidden  w-72 h-96 lg:flex flex-col gap-20 justify-between">
        <div className="text-xl font-semibold flex flex-col gap-6">
          <ul className="  flex flex-col gap-4">{sidebar}</ul>
          <button
            onClick={setShow}
            className=" w-full bg-[#5348C7] text-white h-10 hover:bg-indigo-500 tracking-wider "
          >
            Create New Note
          </button>
        </div>
        <Logout />
      </aside>
      <Modal showModal={show} setShowModal={setShow}>
        <div className="w-[30rem] ">
          <NoteForm
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            buttonText="Create Note"
          />
        </div>
      </Modal>
    </>
  );
};

export default Sidebar;
