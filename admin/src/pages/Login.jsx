import { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setShowToast(false);

    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const json = await res.json();

      if (!json.success) {
        setError(json.message || "Login failed");
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
        return;
      }

      localStorage.setItem("token", json.token);
      localStorage.setItem("role", json.user.role);

      window.location.href = "/home";
    } catch (error) {
      console.error(error);
      setError("Server error");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-slate-50 ">
      {showToast && (
        <div className="fixed z-50 px-6 py-3 text-white transition transform -translate-x-1/2 bg-red-500 rounded-lg shadow-lg top-4 left-1/2">
          {error}
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="p-6 space-y-4 bg-white shadow-md rounded-xl w-80"
      >
        <h1 className="text-lg">Admin Login</h1>

        <div className="flex flex-col gap-4 ">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
          />

          <button
            type="submit"
            className="w-full p-2 text-white rounded-lg cursor-pointer bg-slate-900"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
