import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/Login";
import DashboardLayout from "./layouts/DashboardLayout";

function App() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />

      <Route
        path="/*"
        element={
          token && role === "admin" ? (
            <DashboardLayout />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
    </Routes>
  );
}

export default App;
