import { useNavigate } from "react-router-dom";
import { useNotes } from "../contexts/notes-context";
import { useTheme } from "../contexts/theme-context";

const Profile = () => {
  const { notes, archive, trash } = useNotes();
  const { theme } = useTheme();
  return (
    <div
      className={` ${
        theme === "light"
          ? " bg-[#E5E5E5] text-slate-800 "
          : "  bg-gray-900 text-white"
      } min-h-screen w-full`}
    >
      <div className=" flex flex-col items-center justify-center space-x-7 ">
        {/* <div className=" flex justify-center items-center bg-gray-500 h-32 w-32 rounded-full"> */}
        {/* </div> */}
        <img
          className=" w-32 rounded-full"
          src="https://avatars.githubusercontent.com/u/5550850?v=4"
          alt="brad"
        />
        <div>
          <h1 className="  text-2xl font-bold my-2">
            Welcome! Lokesh khati
            {/* {`Welcome ${username}`} */}
          </h1>
          
          <div className="flex justify-center gap-2 sm:gap-6 ">
            <button className="text-lg font-semi-bold mt-6 py-1.5 px-6 rounded border border-indigo-500 ">
              Logout
            </button>
            {/* <button className="text-lg font-semi-bold mt-6 py-1.5 px-2 rounded border bg-indigo-500 text-white border-indigo-500 ">
              Edit Profile
            </button> */}
          </div>
        </div>
      </div>
      <div className="mt-8 flex flex-wrap gap-4 justify-center items-center sm:space-x-4">
        <div className="bg-slate-800 w-54 py-2 px-6 rounded ">
          <h2 className="text-white text-lg ">
            Number of notes {notes?.length}{" "}
          </h2>
        </div>
        <div className="bg-slate-800 w-54 py-2 px-6 rounded ">
          <h2 className="text-white text-lg ">
            Archived notes {archive?.length}
          </h2>
        </div>
        <div className="bg-slate-800  w-54 py-2 px-6 rounded ">
          <h2 className="text-white text-lg ">
            Notes in Trash {trash?.length}
          </h2>
        </div>
        <q className="font-semibold p-4 text-xl tracking-wide mb-6 md:max-w-lg">
            Full stack web developer and online instructor, specializiing in
            mostly JS, but also write Python, PHP and some other stuff.

          </q>
      </div>
      
      {/* <Modal showModal={showModal} setShowModal={setShowModal}>
        <div className="max-w-2xl w-[20rem] sm:w-[30rem]">
          <EditProfile userInfo={userInfo} setUserInfo={setUserInfo} />
        </div>
      </Modal> */}
    </div>
  );
};

export default Profile;
