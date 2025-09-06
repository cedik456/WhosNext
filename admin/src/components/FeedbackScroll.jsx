import { useMemo } from "react";
import logown from "../assets/logown.png";
import { useEffect, useState } from "react";

const STATUS_BADGE = {
  open: "bg-blue-100 text-blue-700",
  in_progress: "bg-yellow-100 text-yellow-700",
  resolved: "bg-green-100 text-green-700",
  wont_fix: "bg-gray-100 text-gray-700",
};

const FeedbackScroll = () => {
  const [items, setItems] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          `http://localhost:3000/api/feedbacks/admin/feedback`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const json = await res.json();

        if (alive && json.success) {
          const normalized = (json.data || []).map((f) => ({
            id: f._id || f.id,
            name: f.displayName || "User",
            title: f.title,
            description: f.description,
            status: f.status || "open",
            createdAt: f.createdAt,
          }));
          setItems(normalized);
        }
      } catch (error) {
        if (alive) {
          setError("Failed to load feedback");
          console.error("Load feedback failed:", error);
        }
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  const toggleExpand = (id) => setExpandedId(expandedId === id ? null : id);

  const countText = useMemo(
    () => (loading ? "Loading…" : `(${items.length})`),
    [loading, items.length]
  );

  return (
    <div className="h-screen px-2 py-6 overflow-auto">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold">
          Feedbacks{" "}
          <span className="font-normal text-gray-500">{countText}</span>
        </h2>
      </div>

      {error && (
        <div className="p-2 mb-3 text-sm text-red-700 rounded-md bg-red-50">
          {error}
        </div>
      )}

      {loading && (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="p-3 bg-gray-100 rounded-lg animate-pulse">
              <div className="w-1/3 h-4 mb-2 bg-gray-200 rounded" />
              <div className="w-2/3 h-3 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      )}

      {!loading && items.length === 0 && (
        <div className="text-sm text-gray-500">No feedback yet.</div>
      )}

      {!loading &&
        items.map((fb) => (
          <div
            key={fb.id}
            onClick={() => toggleExpand(fb.id)}
            className={`p-3 mb-3 transition bg-gray-100 rounded-lg shadow-xs cursor-pointer hover:bg-gray-200 ${
              expandedId === fb.id ? "" : "max-h-16 overflow-hidden"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <img
                  src={logown}
                  className="w-10 h-10 mr-3 bg-gray-300 rounded-full"
                />
                <div>
                  <div className="text-base text-gray-800 ">{fb.name}</div>
                  <div className="text-sm text-gray-600 ">{fb.title}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <svg
                  className={`w-5 h-5 text-gray-600 transform transition-transform ${
                    expandedId === fb.id ? "rotate-90" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>

            <div className="text-sm text-gray-700">
              {expandedId === fb.id ? (
                <>
                  {fb.description}
                  <div className="flex items-end justify-between mt-2">
                    {fb.createdAt && (
                      <span className="ml-auto text-xs text-gray-500">
                        {new Date(fb.createdAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </>
              ) : (
                `${fb.description?.slice(0, 80)}${
                  (fb.description || "").length > 80 ? "..." : ""
                }`
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default FeedbackScroll;
