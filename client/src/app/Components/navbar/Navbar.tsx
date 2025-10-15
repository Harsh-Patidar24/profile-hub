"use client";

import Link from "next/link";
import { useAuthStore } from "../../store/useAuthStore";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Navbar() {
  const { isAuthenticated, logoutS, user } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      // const confirmLogout = confirm("Are you sure you want to logout?");
      // if (confirmLogout) {
      logoutS();
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      toast.success(`${user?.name} User Is Logged Out Sucessfully`);

      router.push("/Components/login");
      // }
    }
  };

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          ProfileHub
        </Link>

        <nav className="flex items-center gap-6 text-sm font-medium">
          {isAuthenticated ? (
            <>
              <span className="text-gray-700 underline">Hi, {user?.name}</span>
              <Link
                href="/Components/dashboard"
                className="hover:text-blue-600 transition"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-700 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/Components/login"
                className="hover:text-blue-600 transition"
              >
                Login
              </Link>
              <Link
                href="/Components/register"
                className="hover:text-blue-600 transition"
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
