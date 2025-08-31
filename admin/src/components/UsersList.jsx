import React from "react";
import { useEffect } from "react";
import { useState } from "react";

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

  const [users, setUsers] = useState(mockUsers);

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

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-semibold">Recent Users</h2>
        <span className="text-sm text-slate-500">
          Showing {limit} of {users.length}
        </span>
      </div>

      <div className="overflow-y-auto max-h-64 ">
        {users.slice(0, limit).map((u) => (
          <div key={u._id} className="flex justify-between px-4 py-2 text-sm ">
            <div>{u.email || "-"}</div>
            <div
              className={` font-medium text-center ${
                u.role === "admin"
                  ? "text-purple-600"
                  : u.role === "recruiter"
                  ? "text-amber-600"
                  : "text-sky-600"
              }`}
            >
              {u.role || "unassigned"}
            </div>
            <div>
              {new Date(u.createdAt).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "2-digit",
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersList;
