"use client";

import { useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../hooks/useAuth";
import { useUsers } from "@/hooks/useUsers";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const DashboardPage = () => {
  const router = useRouter();
  const { user, isLoggedIn, loading } = useAuth();
  const { users, fetching, handleDelete } = useUsers(isLoggedIn, loading);

  const onUserClick = useCallback(
    (id: string) => router.push(`/user/${id}`),
    [router]
  );

  const handleDeleteWithToast = async (id: string) => {
    try {
      await handleDelete(id);
      toast.success("User deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete user!");
    }
  };

  const userItems = useMemo(
    () =>
      users.map((u) => (
        <motion.div
          key={u._id}
          whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0,0,0,0.12)" }}
          transition={{ duration: 0.3 }}
          className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer"
        >
          <div
            className="p-4 flex flex-col items-center justify-center gap-3 text-center"
            onClick={() => onUserClick(u._id)}
          >
            <div className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center bg-blue-500 text-white uppercase font-bold text-xl">
              {u.profileImage ? (
                <img
                  src={u.profileImage}
                  alt={u.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                u.name.charAt(0)
              )}
            </div>
            <div>
              <div className="font-semibold text-gray-800 text-lg">{u.name}</div>
              <div className="text-gray-500 text-sm">{u.email}</div>
            </div>
          </div>

          {user?.role === "admin" && (
            <div className="flex justify-center gap-2 pb-3">
              <button
                onClick={() => router.push(`/user/${u._id}`)}
                className="px-4 py-1 bg-yellow-500 text-white text-sm rounded hover:bg-yellow-600 transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteWithToast(u._id)}
                className="px-4 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          )}
        </motion.div>
      )),
    [users, user, handleDelete, onUserClick, router]
  );

  if (loading || !isLoggedIn)
    return <div className="text-center py-20 text-gray-500">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h2 className="text-3xl font-bold text-gray-800">Users</h2>

        <div className="flex items-center gap-4 flex-wrap">
          {user && (
            <div className="text-sm text-gray-600">
              Logged in as <span className="font-medium">{user.name}</span>
            </div>
          )}

          {user?.role === "superadmin" && (
            <button
              onClick={() => router.push("/Components/superadmin/add-user")}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              Add User
            </button>
          )}
        </div>
      </div>

      {fetching ? (
        <div className="text-center py-8 text-gray-500">Loading users...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {userItems}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
