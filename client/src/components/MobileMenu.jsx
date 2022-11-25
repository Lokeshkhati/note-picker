import React, { useState } from "react";
import { useNavigate } from "react-router";
import Modal from "./Modal";
import SidebarData from "./SidebarData";
import Logout from "./Logout";
import { useTheme } from "../contexts/theme-context";
import NoteForm from "./NoteForm";

const MobileMenu = ({ setIsOpen }) => {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();
  const { theme } = useTheme();

  const sidebar = SidebarData.map(({ label, icon, path }) => (
    <li
      style={{
        fontWeight: window.location.pathname === path ? "bold" : "",
      }}
      className={` flex gap-4 h-10  items-center cursor-pointer `}
      key={path}
      onClick={() => {
        navigate(path);
      }}
    >
      <div className="">{icon} </div>
      <div className="tracking-wider">{label} </div>
    </li>
  ));
  return (
    <div className="  fixed z-50 inset-0 lg:hidden">
      <div
        onClick={() => setIsOpen(false)}
        class="fixed inset-0  backdrop-blur-sm bg-black/20"
      ></div>

      <div
        className={` relative h-screen  sm:w-[19.5rem] w-[16rem] max-w-[calc(100%-3rem)] p-6   ${
          theme === "light"
            ? " bg-white text-slate-800 "
            : "  bg-gray-900 text-white"
        } `}
      >
        {/* <div className="relative h-screen  sm:w-[19.5rem] w-[16rem] max-w-[calc(100%-3rem)] p-6 bg-[#fff]"> */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute z-10 top-5 right-5 w-8 h-8 flex items-center justify-center text-black"
        >
          <svg viewBox="0 0 10 10" className="w-2.5 h-2.5 overflow-visible">
            <path
              d="M0 0L10 10M10 0L0 10"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              color={`${theme === "light" ? "black " : "white"}`}
            ></path>
          </svg>
        </button>

        <nav className="lg:leading-6 relative">
          <ul>{sidebar}</ul>
          <button
            onClick={() => setShowModal(true)}
            className=" w-full  bg-[#5348C7] tracking-wider mt-6 px-8 py-1 w-58 text-[#FFFFFF] "
          >
            Create New Post
          </button>
          <Logout />
          <Modal showModal={showModal} setShowModal={setShowModal}>
            <div className="w-80  sm:w-[30rem] ">
              <NoteForm
                title={title}
                setTitle={setTitle}
                description={description}
                setDescription={setDescription}
                buttonText="Create Note"
              />
            </div>
          </Modal>
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;
