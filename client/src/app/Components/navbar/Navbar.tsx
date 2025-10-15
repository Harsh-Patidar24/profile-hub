"use client";

import Link from "next/link";
import { useAuthStore } from "../../store/useAuthStore";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const { isAuthenticated, logoutS, user } = useAuthStore();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      logoutS();
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      toast.success(`${user?.name} logged out successfully!`);
      router.push("/Components/login");
      setMenuOpen(false);
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition">
          ProfileHub
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {isAuthenticated ? (
            <>
              <span className="text-gray-700">Hi, <span className="font-semibold">{user?.name}</span></span>
              <Link href="/Components/dashboard" className="hover:text-blue-600 transition">Dashboard</Link>
              <button onClick={handleLogout} className="text-red-600 hover:text-red-700 transition">Logout</button>
            </>
          ) : (
            <>
              <Link href="/Components/login" className="hover:text-blue-600 transition">Login</Link>
              <Link href="/Components/register" className="hover:text-blue-600 transition">Register</Link>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl text-gray-700 hover:text-gray-900 transition"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="md:hidden bg-white shadow-lg w-full px-4 py-4 flex flex-col gap-3 text-sm font-medium animate-slideDown">
          {isAuthenticated ? (
            <>
              <span className="text-gray-700">Hi, <span className="font-semibold">{user?.name}</span></span>
              <Link href="/Components/dashboard" onClick={() => setMenuOpen(false)} className="hover:text-blue-600 transition">Dashboard</Link>
              <button onClick={handleLogout} className="text-red-600 hover:text-red-700 transition text-left">Logout</button>
            </>
          ) : (
            <>
              <Link href="/Components/login" onClick={() => setMenuOpen(false)} className="hover:text-blue-600 transition">Login</Link>
              <Link href="/Components/register" onClick={() => setMenuOpen(false)} className="hover:text-blue-600 transition">Register</Link>
            </>
          )}
        </nav>
      )}
    </header>
  );
}
