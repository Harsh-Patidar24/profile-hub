"use client";

import "./globals.css";
import { ReactNode } from "react";
import Navbar from "./Components/navbar/Navbar";
import { Toaster } from "react-hot-toast"; 
import Home from "./Components/HomePage";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <Navbar />
        {/* <Home /> */}

        <main className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
          {children}
        </main>

        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            duration: 3000,
            style: {
              background: "#333",
              color: "#fff",
              fontWeight: "bold",
            },
          }}
        />
      </body>
    </html>
  );
}
