import { Route, Routes } from "react-router-dom";
import "./App.css";
import SideNav from "./components/SideNav";
import Home from "./pages/Home";
import JobSeeker from "./pages/JobSeeker";
import Recruiter from "./pages/Recruiter";
import FeedbackScroll from "./components/FeedbackScroll";

function App() {
  return (
    <div>
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
            <Route path="/" element={<Home />} />
            <Route path="/jobSeeker" element={<JobSeeker />} />
            <Route path="/recruiter" element={<Recruiter />} />
          </Routes>
        </div>

        <FeedbackScroll />
      </div>
    </div>
  );
}

export default App;
