"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });

  const [chartData, setChartData] = useState([
    { name: "Jan", sales: 400 },
    { name: "Feb", sales: 300 },
    { name: "Mar", sales: 200 },
    { name: "Apr", sales: 278 },
    { name: "May", sales: 190 },
    { name: "Jun", sales: 229 },
  ]);

  useEffect(() => {
    // Fetch stats from API
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // This is mock data for now
      setStats({
        totalBooks: 150,
        totalUsers: 450,
        totalOrders: 320,
        totalRevenue: 15840,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  return (
    <AdminLayout>
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-600">
            <h3 className="text-gray-600 text-sm font-semibold mb-2">
              Total Books
            </h3>
            <p className="text-3xl font-bold text-blue-600">
              {stats.totalBooks}
            </p>
          </div>

          <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-600">
            <h3 className="text-gray-600 text-sm font-semibold mb-2">
              Total Users
            </h3>
            <p className="text-3xl font-bold text-green-600">
              {stats.totalUsers}
            </p>
          </div>

          <div className="bg-purple-50 rounded-lg p-6 border-l-4 border-purple-600">
            <h3 className="text-gray-600 text-sm font-semibold mb-2">
              Total Orders
            </h3>
            <p className="text-3xl font-bold text-purple-600">
              {stats.totalOrders}
            </p>
          </div>

          <div className="bg-orange-50 rounded-lg p-6 border-l-4 border-orange-600">
            <h3 className="text-gray-600 text-sm font-semibold mb-2">
              Total Revenue
            </h3>
            <p className="text-3xl font-bold text-orange-600">
              ${stats.totalRevenue.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Monthly Sales
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 border-b last:border-b-0"
              >
                <div>
                  <p className="font-semibold text-gray-800">
                    New Order #{1000 + i}
                  </p>
                  <p className="text-sm text-gray-600">2 hours ago</p>
                </div>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                  Completed
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
