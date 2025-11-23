"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function OrderConfirmationPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <CheckCircle size={80} className="mx-auto text-green-600 mb-6" />

          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Order Confirmed!
          </h1>

          <p className="text-lg text-gray-600 mb-2">
            Thank you for your purchase!
          </p>

          <p className="text-gray-600 mb-8">
            Your order has been successfully placed. You will receive an email
            confirmation shortly with your order details and tracking
            information.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8 text-left">
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-semibold">Order Number:</span> #ORD-
              {Math.floor(Math.random() * 1000000)}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Estimated Delivery:</span> 5-7
              business days
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/allbooks"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold"
            >
              Continue Shopping
            </Link>
            <Link
              href="/cart"
              className="bg-gray-300 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-400 font-semibold"
            >
              Back to Cart
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
