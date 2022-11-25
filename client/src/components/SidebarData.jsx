import { AiOutlineHome } from "react-icons/ai";
import { BsArchive, BsTrash } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { GoArchive } from "react-icons/go";
import { MdLabelOutline } from "react-icons/md";

const SidebarData = [
  {
    label: "Home",
    icon: <AiOutlineHome size='25' />,
    path: "/",
  },
  {
    label: "Labels",
    icon: <MdLabelOutline size='25' />,
    path: "/labels",
  },
  {
    label: "Archive",
    icon: < GoArchive size='25' />,
    path: "/archive",
  },
  {
    label: "Trash",
    icon: <BsTrash size='25'/>,
    path: "/trash",
  },
  {
    label: "Profile",
    icon: < CgProfile size='25'/>,
    path: "/profile",
  },
];

export default SidebarData;
