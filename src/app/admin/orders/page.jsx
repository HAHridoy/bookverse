"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Eye, CheckCircle, Clock } from "lucide-react";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      // Mock data for now
      setOrders([
        {
          id: "ORD-001",
          customerName: "John Doe",
          email: "john@example.com",
          amount: 89.99,
          status: "Completed",
          date: new Date("2025-02-15"),
          items: 3,
        },
        {
          id: "ORD-002",
          customerName: "Jane Smith",
          email: "jane@example.com",
          amount: 149.5,
          status: "Pending",
          date: new Date("2025-02-16"),
          items: 5,
        },
        {
          id: "ORD-003",
          customerName: "Bob Johnson",
          email: "bob@example.com",
          amount: 59.99,
          status: "Completed",
          date: new Date("2025-02-17"),
          items: 2,
        },
      ]);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    return status === "Completed" ? (
      <CheckCircle className="text-green-600" size={18} />
    ) : (
      <Clock className="text-yellow-600" size={18} />
    );
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-gray-300 rounded"></div>
          ))}
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div>
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Manage Orders</h1>
          <p className="text-gray-600">Total Orders: {orders.length}</p>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Status
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    <div>
                      <p className="font-medium">{order.customerName}</p>
                      <p className="text-gray-600">{order.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {order.items}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">
                    ${order.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(order.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(order.status)}
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          order.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="text-blue-600 hover:text-blue-800">
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {orders.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No orders found</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
