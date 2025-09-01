import { FaBriefcase, FaUser, FaUserTie } from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import UsersList from "../components/UsersList";

const Home = () => {
  const data = [
    { name: "Sun", matched: 60, recruiters: 88 },
    { name: "Mon", matched: 12, recruiters: 40 },
    { name: "Tue", matched: 22, recruiters: 50 },
    { name: "Wed", matched: 45, recruiters: 70 },
    { name: "Thu", matched: 82, recruiters: 95 },
    { name: "Fri", matched: 30, recruiters: 55 },
    { name: "Sat", matched: 78, recruiters: 30 },
  ];

  const stats = [
    { label: "Users", value: 25, icon: <FaUser /> },
    { label: "Job Seeker", value: 12, icon: <FaUserTie /> },
    { label: "Recruiter", value: 16, icon: <FaBriefcase /> },
  ];

  const today = new Date().toLocaleDateString(undefined, {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex flex-col justify-between h-screen gap-12 px-6 py-8 border-r border-gray-200">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold leading-snug">Hi, Admin</h1>
          <p className="text-lg text-slate-500">how are you today?</p>
        </div>
        <div className="flex items-center gap-2 text-slate-500">
          <span className="text-sm">{today}</span>
          <span className="inline-flex items-center justify-center w-5 h-5 rounded-xl bg-slate-100">
            📅
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 ">
        {stats.map((s) => (
          <div
            key={s.label}
            className="flex items-center gap-4 px-4 py-3 bg-gray-100 shadow-sm rounded-2xl "
          >
            <div className="flex items-center justify-center p-4 mr-4 bg-gray-300 rounded-full">
              {s.icon}
            </div>
            <div className="leading-tight">
              <div className="text-slate-500">{s.label}</div>
              <div className="text-lg font-semibold">{s.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="h-[350px]">
        <h2 className="mb-3 font-semibold">Matched</h2>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="matched" stroke="#3b82f6" />
            <Line type="monotone" dataKey="recruiters" stroke="#ef4444" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <UsersList limit={4} />
    </div>
  );
};

export default Home;
