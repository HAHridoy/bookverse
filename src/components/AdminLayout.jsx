"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Book,
  Users,
  ShoppingCart,
  LogOut,
} from "lucide-react";

export default function AdminLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const isAdmin = session?.user?.email === "hosainoolalam123@gmail.com";

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Access Denied
          </h1>
          <p className="text-gray-600 mb-6">
            You don't have permission to access the admin panel.
          </p>
          <Link
            href="/"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/admin" },
    { name: "Books", icon: Book, href: "/admin/books" },
    { name: "Users", icon: Users, href: "/admin/users" },
    { name: "Orders", icon: ShoppingCart, href: "/admin/orders" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-[#173F5F] text-white transition-all duration-300 fixed h-screen overflow-y-auto`}
      >
        <div className="p-4 flex items-center justify-between">
          {isSidebarOpen && (
            <h1 className="text-2xl font-bold">BookVerse Admin</h1>
          )}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-blue-700 rounded"
          >
            ☰
          </button>
        </div>

        <nav className="mt-8">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center px-4 py-3 hover:bg-blue-700 transition-colors"
            >
              <item.icon size={24} />
              {isSidebarOpen && <span className="ml-4">{item.name}</span>}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <button
            onClick={() => router.push("/api/auth/signout")}
            className="w-full flex items-center px-4 py-3 hover:bg-red-700 transition-colors rounded"
          >
            <LogOut size={24} />
            {isSidebarOpen && <span className="ml-4">Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`${
          isSidebarOpen ? "ml-64" : "ml-20"
        } flex-1 transition-all duration-300`}
      >
        <div className="p-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800">
                Welcome, {session?.user?.name}!
              </h2>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
