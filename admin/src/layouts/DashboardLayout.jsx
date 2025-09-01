import SideNav from "../components/SideNav";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import JobSeeker from "../pages/JobSeeker";
import Recruiter from "../pages/Recruiter";
import FeedbackScroll from "../components/FeedbackScroll";

const DashboardLayout = () => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "240px 1fr 340px",
        gap: "1rem",
      }}
    >
      <SideNav />
      <div className="min-w-0">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/jobSeeker" element={<JobSeeker />} />
          <Route path="/recruiter" element={<Recruiter />} />
        </Routes>
      </div>

      <FeedbackScroll />
    </div>
  );
};

export default DashboardLayout;
