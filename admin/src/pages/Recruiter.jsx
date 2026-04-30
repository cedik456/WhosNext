import { useEffect, useMemo, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const Recruiter = () => {
  const [items, setItems] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [period, setPeriod] = useState("week");
  const itemsPerPage = 5;

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:3000/api/admin/recruiters", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const json = await res.json();
        if (alive && json.success) {
          setItems(json.data || []);
        } else if (alive) {
          setError(json.message || "Failed to load recruiters");
        }
      } catch {
        if (alive) {
          setError("Failed to load recruiters");
        }
      } finally {
        alive && setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  const toggleExpand = (id) => setExpandedId(expandedId === id ? null : id);

  const countText = useMemo(
    () => (loading ? "Loading…" : `(${items.length})`),
    [loading, items.length]
  );

  const graphData = useMemo(() => {
    const now = new Date();

    if (period === "year") {
      const months = [];
      for (let i = 11; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const label = d.toLocaleDateString(undefined, { month: "short", year: "numeric" });
        months.push(label);
      }
      const counts = Object.fromEntries(months.map(m => [m, 0]));
      items.forEach(r => {
        if (!r.createdAt) return;
        const d = new Date(r.createdAt);
        const key = d.toLocaleDateString(undefined, { month: "short", year: "numeric" });
        if (key in counts) counts[key]++;
      });
      return months.map(date => ({ date, count: counts[date] }));
    } else {
      const days = period === "week" ? 7 : 30;
      const dates = Array.from({ length: days }, (_, i) => {
        const d = new Date(now);
        d.setDate(now.getDate() - (days - 1 - i));
        return d.toISOString().split("T")[0];
      });
      const counts = Object.fromEntries(dates.map(d => [d, 0]));
      items.forEach(r => {
        if (!r.createdAt) return;
        const iso = new Date(r.createdAt).toISOString().split("T")[0];
        if (iso in counts) counts[iso]++;
      });
      return dates.map(date => ({ date, count: counts[date] }));
    }
  }, [items, period]);

  const pageCount = Math.ceil(items.length / itemsPerPage);
  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return items.slice(start, start + itemsPerPage);
  }, [items, currentPage]);

  return (
    <div className="flex flex-col h-screen gap-12 px-6 py-8 overflow-auto">
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-xl font-semibold">
          Recruiters <span className="font-normal text-gray-500">{countText}</span>
        </h1>
      </div>

      {error && (
        <div className="p-2 mb-3 text-sm text-red-700 rounded-md bg-red-50">{error}</div>
      )}

<div className="h-[350px]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Recruiters Joined</h2>
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

        {graphData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={graphData} margin={{ top: 5, right: 20, bottom: 30, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                label={{ value: "Date", position: "insideBottom", offset: -20 }}
                tickFormatter={iso =>
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
                label={{ value: "Count", angle: -90, position: "insideLeft" }}
              />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#4F46E5" />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-sm text-gray-500">No data to display.</div>
        )}
      </div>

      <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
        {loading ? (
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm animate-pulse"
              />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="text-sm text-gray-500">No recruiters found.</div>
        ) : (
          currentItems.map((r) => (
            <div
              key={r._id}
              onClick={() => toggleExpand(r._id)}
              className={`p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer ${
                expandedId === r._id ? "" : "max-h-16 overflow-hidden"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="text-base text-gray-800">{r.name}</div>
                  <div className="text-sm text-gray-600">{r.email}</div>
                </div>
                <svg
                  className={`w-5 h-5 text-gray-600 transform transition-transform ${
                    expandedId === r._id ? "rotate-90" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              {expandedId === r._id && (
                <div className="text-sm text-gray-700">
                  {r.companyName && <div>Company: {r.companyName}</div>}
                  {r.createdAt && (
                    <div className="mt-2 text-xs text-gray-500">
                      Joined: {new Date(r.createdAt).toLocaleDateString()}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}

        {items.length > itemsPerPage && (
          <div className="flex justify-center mt-6 space-x-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-3 py-1">
              Page {currentPage} of {pageCount}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, pageCount))}
              disabled={currentPage === pageCount}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recruiter;
