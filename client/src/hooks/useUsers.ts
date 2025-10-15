"use client";
import { useEffect, useState } from "react";
import api from "../lib/axios";
import { IUser } from "../types/user";
import toast from "react-hot-toast";

export const useUsers = (isLoggedIn: boolean, loading: boolean) => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading && isLoggedIn) {
      const fetchUsers = async () => {
        try {
          const res = await api.get("/api/users");
          setUsers(res.data);
        } catch (err) {
          console.error("Failed to fetch users:", err);
        } finally {
          setFetching(false);
        }
      };
      fetchUsers();
    }
  }, [isLoggedIn, loading]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      await api.delete(`/api/users/${id}`);
      setUsers((prev) => prev.filter((u) => u._id !== id));
      toast.success(`User Deleted Sucessfully`)
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed To Delete User")
      // alert("Failed to delete user");
    }
  };

  return { users, fetching, handleDelete };
};
