import { useTheme } from "./contexts/theme-context";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import NotFound from "./components/NotFound";
import Profile from "./pages/Profile";
import Labels from "./pages/Labels";
import Archive from "./pages/Archive";
import Trash from "./pages/Trash";
import Layout from "./components/Layout";
import Login from "./pages/Login";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RequiresAuth from "./components/RequiresAuth";
function App() {
  const { theme } = useTheme();
  return (
    <div
      className={`h-full relative ${theme === "light"
        ? " bg-[#E5E5E5] text-gray-900 "
        : "bg-gray-900 text-white"
        } `}
    >
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Layout />
        }>
          <Route index element={

            <Home />
          } />
          <Route path="labels" element={

            <Labels />

          } />
          <Route path="archive" element={

            <Archive />

          } />
          <Route path="profile" element={

            <Profile />

          } />
          <Route path="trash" element={

            <Trash />

          } />
        </Route>
        <Route path="landing-page" element={<Landing />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
