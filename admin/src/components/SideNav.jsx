import { NavLink } from "react-router-dom";
import { FaBriefcase, FaHome, FaSignOutAlt, FaUserTie } from "react-icons/fa";

const SideNav = () => {
  return (
    <aside className="flex flex-col justify-between h-screen px-6 py-8 bg-white border-r border-gray-200 top-4 w-60">
      <div className="flex items-center gap-2">
        <p className="text-lg">who'snext</p>
      </div>

      <nav className="flex flex-col gap-6  text-[#9B9B9B] ">
        <NavLink to="/" className="flex items-center gap-2 text-base ">
          <FaHome />
          Home
        </NavLink>
        <NavLink to="/jobSeeker" className="flex items-center gap-2 text-base ">
          <FaUserTie />
          Job Seeker
        </NavLink>
        <NavLink to="/recruiter" className="flex items-center gap-2 text-base ">
          <FaBriefcase />
          Recruiter
        </NavLink>
      </nav>

      <p className="flex items-center gap-2 text-sm text-[#9B9B9B]">
        <FaSignOutAlt className="text-base" />
        Logout
      </p>
    </aside>
  );
};

export default SideNav;
