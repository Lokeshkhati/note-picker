import { useAuth } from "../contexts/auth-context";
import { useNavigate } from "react-router-dom";
import { useNotes } from "../contexts/notes-context";

const Profile = () => {
  const { user } = useAuth();
  const { notes, archive, trash } = useNotes();
  // const [userInfo, setUserInfo] = useState({
  //   name: "lokesh",
  //   bio: "khatikhati khati",
  //   website: "https://beta.reactjs.org/learn/updating-objects-in-state",
  // });
  return (
    <div className="min-h-screen h-auto w-4/5">
      <div className=" flex flex-col items-center justify-center space-x-7 ">
        {/* <div className=" flex justify-center items-center bg-gray-500 h-32 w-32 rounded-full"> */}
        {/* </div> */}
        <img
          className=" w-32 rounded-full"
          src="https://avatars.githubusercontent.com/u/5550850?v=4"
          alt="brad"
        />
        <div>
          <h1 className="text-black text-center text-4xl font-bold my-2">
            {user?.email}
          </h1>
          <p className="text-black text-lg tracking-wide mb-6 md:max-w-lg">
            Full stack web developer and online instructor, specializiing in
            mostly JS, but also write Python, PHP and some other stuff.
          </p>
          <div className="flex justify-center ">
            <button className="text-lg font-semi-bold mt-6 py-2 px-6 rounded bg-indigo-500 text-white ">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
      <div className="mt-8 flex flex-wrap gap-4 justify-center items-center sm:space-x-4">
        <div className="bg-slate-600 py-2 px-6 rounded ">
          <h2 className="text-white text-lg ">
            Number of notes {notes?.length}{" "}
          </h2>
        </div>
        <div className="bg-slate-600 py-2 px-6 rounded ">
          <h2 className="text-white text-lg ">
            Archived notes {archive?.length}
          </h2>
        </div>
        <div className="bg-slate-600 py-2 px-6 rounded ">
          <h2 className="text-white text-lg ">
            Notes in Trash {trash?.length}
          </h2>
        </div>
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
