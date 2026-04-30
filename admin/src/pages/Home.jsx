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
import { useEffect, useState, useMemo } from "react";
import { FaRegCalendar } from "react-icons/fa";

const Home = () => {
  const [series, setSeries] = useState([]);
  const [stats, setStats] = useState([
    { label: "Users", value: 0, icon: <FaUser /> },
    { label: "Job Seeker", value: 0, icon: <FaUserTie /> },
    { label: "Recruiter", value: 0, icon: <FaBriefcase /> },
  ]);
  const [period, setPeriod] = useState("week");

  useEffect(() => {
    const days = period === "week" ? 7 : period === "month" ? 30 : 365;
    (async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          `http://localhost:3000/api/admin/metrics/matches?days=${days}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const json = await res.json();
        if (json.success) setSeries(json.data || []);
      } catch (error) {
        console.error("Failed to load matches series", error);
      }
    })();
  }, [period]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:3000/api/admin/stats", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const json = await res.json();
        if (json.success) {
          setStats([
            { label: "Users", value: json.data.totalUsers, icon: <FaUser /> },
            {
              label: "Job Seeker",
              value: json.data.jobSeekers,
              icon: <FaUserTie />,
            },
            {
              label: "Recruiter",
              value: json.data.recruiters,
              icon: <FaBriefcase />,
            },
          ]);
        }
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    };
    fetchStats();
  }, []);

  const today = new Date().toLocaleDateString(undefined, {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  // derive chartData: daily series or aggregated months
  const chartData = useMemo(() => {
    if (period !== "year") return series;
    const now = new Date();
    const months = Array.from({ length: 12 }, (_, i) =>
      new Date(now.getFullYear(), now.getMonth() - 11 + i, 1)
    );
    return months.map((d) => {
      const label = d.toLocaleDateString(undefined, {
        month: "short",
        year: "numeric",
      });
      const prefix = d.toISOString().slice(0, 7); // "YYYY-MM"
      const count = series.reduce(
        (sum, s) => sum + (s.date.startsWith(prefix) ? s.matched : 0),
        0
      );
      return { date: label, matched: count };
    });
  }, [series, period]);

  return (
    <div className="flex flex-col justify-between h-screen gap-12 px-6 py-8 border-r border-gray-200 ">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold leading-snug">Hi, Admin</h1>
          <p className="text-base text-slate-500">how are you today?</p>
        </div>
        <div className="flex items-center gap-2 text-slate-500">
          <span className="text-sm">{today}</span>
          <span className="inline-flex items-center justify-center text-sm">
            <FaRegCalendar />
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 ">
        {stats.map((s) => (
          <div
            key={s.label}
            className="flex items-center gap-4 px-3 py-2 bg-gray-100 rounded-lg shadow-sm "
          >
            <div className="flex items-center justify-center p-3 mr-4 bg-gray-300 rounded-full">
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
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Matches Over Time
          </h2>
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="px-2 py-1 border border-gray-300 rounded"
          >
            <option value="week">Last 7 days</option>
            <option value="month">Last 30 days</option>
            <option value="year">Last 12 months</option>
          </select>
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 20, bottom: 30, left: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="date"
              label={{ value: "Date", position: "insideBottom", offset: -20 }}
              tickFormatter={(iso) =>
                period === "year"
                  ? iso
                  : new Date(iso).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
              }
            />
            <YAxis
              allowDecimals={false}
              label={{ value: "Matches", angle: -90, position: "insideLeft" }}
            />
            <Tooltip />
            <Line type="monotone" dataKey="matched" stroke="#3b82f6" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <UsersList limit={4} />
    </div>
  );
};

export default Home;