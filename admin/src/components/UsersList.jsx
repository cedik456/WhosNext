import { useState } from "react";
import { FaEllipsisH } from "react-icons/fa";

const UsersList = ({ limit = 6 }) => {
  const mockUsers = [
    {
      _id: "1",
      email: "alice@example.com",
      role: "admin",
      createdAt: "2024-08-01T10:00:00Z",
    },
    {
      _id: "2",
      email: "bob@example.com",
      role: "recruiter",
      createdAt: "2024-08-02T11:00:00Z",
    },
    {
      _id: "3",
      email: "carol@example.com",
      role: "jobseeker",
      createdAt: "2024-08-03T12:00:00Z",
    },
    {
      _id: "4",
      email: "dan@example.com",
      role: "recruiter",
      createdAt: "2024-08-04T13:00:00Z",
    },
    {
      _id: "5",
      email: "eve@example.com",
      role: "jobseeker",
      createdAt: "2024-08-05T14:00:00Z",
    },
    {
      _id: "6",
      email: "frank@example.com",
      role: "admin",
      createdAt: "2024-08-06T15:00:00Z",
    },
  ];

  const [users] = useState(mockUsers);
  const [currentPage, setCurrentPage] = useState(1);
  const [openMenuId, setOpenMenuId] = useState(null);
  const totalPages = Math.ceil(users.length / limit);

  //   useEffect(() => {
  //     (async () => {
  //       try {
  //         const token = localStorage.getItem("token");
  //         const res = await fetch("http://localhost:3000/api/admin/users", {
  //           headers: { Authorization: `Bearer ${token}` },
  //         });
  //         const json = await res.json();
  //         if (json.success) {
  //           setUsers(json.data || []);
  //         }
  //       } catch (err) {
  //         console.error("Failed to fetch users:", err);
  //       }
  //     })();
  //   }, []);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

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
        <h2 className="text-base font-semibold">Recent Users</h2>
        <span className="text-sm text-slate-500">
          Showing {limit} of {users.length}
        </span>
      </div>

      <div className="overflow-y-auto max-h-64">
        {users
          .slice((currentPage - 1) * limit, currentPage * limit)
          .map((u) => (
            <div key={u._id} className="relative grid items-center grid-cols-4 px-4 py-2 text-sm">
              <div>{u.email || "-"}</div>
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
              <div className="text-right">
                {new Date(u.createdAt).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                })}
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => toggleMenu(u._id)}
                  className="flex items-center justify-center w-6 h-6 bg-gray-200 rounded-full"
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

      <div className="flex items-center justify-between px-4 mt-2">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-sm text-slate-600">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UsersList;
