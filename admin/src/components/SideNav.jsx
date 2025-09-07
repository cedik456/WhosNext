import { NavLink, useNavigate } from "react-router-dom";
import { FaBriefcase, FaHome, FaSignOutAlt, FaUserTie } from "react-icons/fa";
import { useEffect } from "react";

const SideNav = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <aside className="flex flex-col justify-between h-screen px-6 py-8 bg-white border-r border-gray-200 top-4 w-60">
      <div className="flex items-center gap-2">
        <p className="text-lg">who'snext</p>
      </div>

      <nav className="flex flex-col gap-6 text-[#9B9B9B]">
        <NavLink
          to="/home"
          className={({ isActive }) =>
            `flex items-center gap-2 text-base p-2 rounded ${
              isActive ? "text-gray-900" : "text-[#9B9B9B]"
            }`
          }
        >
          <FaHome />
          Home
        </NavLink>
        <NavLink
          to="/jobSeeker"
          className={({ isActive }) =>
            `flex items-center gap-2 text-base p-2 rounded ${
              isActive ? "text-gray-900" : "text-[#9B9B9B]"
            }`
          }
        >
          <FaUserTie />
          Job Seeker
        </NavLink>
        <NavLink
          to="/recruiter"
          className={({ isActive }) =>
            `flex items-center gap-2 text-base p-2 rounded ${
              isActive ? "text-gray-900" : "text-[#9B9B9B]"
            }`
          }
        >
          <FaBriefcase />
          Recruiter
        </NavLink>
      </nav>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 text-sm cursor-pointer text-[#9B9B9B]"
      >
        <FaSignOutAlt className="text-base" />
        Logout
      </button>
    </aside>
  );
};

export default SideNav;
