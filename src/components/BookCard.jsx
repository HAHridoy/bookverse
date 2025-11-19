"use client";

import Link from "next/link";
import { ShoppingCart, Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

export default function BookCard({ book }) {
  const { id, book_name, author_name, price, availability, in_stock, image } =
    book;
  const router = useRouter();
  const { data: session } = useSession();

  const handleAddToCart = async (e) => {
    e.preventDefault();

    console.log("Session data:", session);

    // Check if user is logged in
    if (!session) {
      toast.error("Please log in to add items to cart");
      router.push("/login");
      return;
    }

    try {
      const loadingToast = toast.loading("Adding to cart...");

      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookId: id,
          book_name,
          price,
          image,
        }),
      });

      const data = await response.json();

      toast.dismiss(loadingToast);

      if (response.ok) {
        toast.success(`"${book_name}" added to cart!`);
      } else {
        toast.error(data.error || "Failed to add to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add to cart");
    }
  };

  return (
    <Link href={`/books/${id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden h-full cursor-pointer transform hover:scale-105">
        {/* Image Container */}
        <div className="relative w-full h-56 bg-gray-200 overflow-hidden">
          <img
            src={image}
            alt={book_name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/300x400?text=" +
                encodeURIComponent(book_name);
            }}
          />
          {!in_stock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-bold text-lg">Out of Stock</span>
            </div>
          )}
        </div>

        {/* Book Info */}
        <div className="p-4">
          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 mb-1">
            {book_name}
          </h3>

          {/* Author */}
          <p className="text-sm text-gray-600 mb-3">{author_name}</p>

          {/* Price */}
          <p className="text-xl font-bold text-blue-600 mb-3">${price}</p>

          {/* Availability Status */}
          <div className="mb-4">
            <span
              className={`text-xs font-semibold px-2 py-1 rounded ${
                in_stock
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {in_stock ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              className={`flex-1 py-2 px-3 rounded text-sm font-semibold transition-colors ${
                in_stock
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              disabled={!in_stock}
              onClick={handleAddToCart}
            >
              <ShoppingCart size={16} className="inline mr-1" />
              Add to Cart
            </button>
            <button
              className="flex-1 py-2 px-3 rounded text-sm font-semibold bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                toast("Added to favorites!");
              }}
            >
              <Heart size={16} className="inline" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
