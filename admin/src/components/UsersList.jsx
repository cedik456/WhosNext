import { useEffect } from "react";
import { useState } from "react";
import { FaEllipsisH } from "react-icons/fa";

const UsersList = ({ limit = 6 }) => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [openMenuId, setOpenMenuId] = useState(null);
  const totalPages = Math.ceil(users.length / limit);

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:3000/api/admin/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const json = await res.json();
        if (json.success) {
          setUsers(json.data || []);
        }
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    })();
  }, []);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };
  const handleRestrict = (id) => {
    console.log("restrict user", id);
    setOpenMenuId(null);
  };
  const handleDelete = (id) => {
    console.log("delete user", id);
    setOpenMenuId(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-semibold">Current Users</h2>
        <span className="text-xs text-slate-500">
          Showing {limit} of {users.length}
        </span>
      </div>

      <div className="mb-4 overflow-y-auto max-h-64">
        {users
          .slice((currentPage - 1) * limit, currentPage * limit)
          .map((u) => (
            <div
              key={u._id}
              className="relative grid items-center grid-cols-4 px-4 py-2 text-sm"
            >
              <div className="truncate w-45">{u.email || "-"}</div>
              <div
                className={`text-center font-medium ${
                  u.role === "admin"
                    ? "text-purple-600"
                    : u.role === "recruiter"
                    ? "text-amber-600"
                    : "text-sky-600"
                }`}
              >
                {u.role || "unassigned"}
              </div>
              <div className="text-xs text-right">
                {new Date(u.createdAt).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                })}
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => toggleMenu(u._id)}
                  className="flex items-center justify-center "
                >
                  <FaEllipsisH className="text-gray-600" />
                </button>
                {openMenuId === u._id && (
                  <div className="absolute z-20 w-32 mt-2 bg-white divide-y rounded shadow-md right-12">
                    <div
                      onClick={() => handleRestrict(u._id)}
                      className="px-3 py-2 text-red-400 cursor-pointer hover:bg-gray-100"
                    >
                      Restrict
                    </div>
                    <div
                      onClick={() => handleDelete(u._id)}
                      className="px-3 py-2 text-red-600 cursor-pointer hover:bg-gray-100"
                    >
                      Delete
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>

      <div className="flex items-center justify-between px-4 ">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="p-2 text-xs bg-gray-200 rounded cursor-pointer disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-xs text-slate-600">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="p-2 text-xs bg-gray-200 rounded cursor-pointer disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UsersList;
