"use client";

import Link from "next/link";
import { Calendar, User, ArrowRight } from "lucide-react";

export default function BlogCard({ blog }) {
  const { id, title, author, date, category, description, image } = blog;

  // Format date
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link href={`/blogs/${id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden h-full cursor-pointer transform hover:scale-105">
        {/* Image Container */}
        <div className="relative w-full h-48 bg-gray-200 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/400x250?text=" +
                encodeURIComponent(title);
            }}
          />
        </div>

        {/* Blog Info */}
        <div className="p-5">
          {/* Category */}
          <span className="inline-block bg-blue-100 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full mb-3">
            {category}
          </span>

          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 mb-2 hover:text-blue-600 transition-colors">
            {title}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-600 line-clamp-2 mb-4">
            {description}
          </p>

          {/* Metadata */}
          <div className="flex flex-col gap-2 text-xs text-gray-500 mb-4">
            <div className="flex items-center gap-2">
              <User size={14} />
              <span>{author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={14} />
              <span>{formattedDate}</span>
            </div>
          </div>

          {/* Read More Link */}
          <div className="flex items-center text-blue-600 font-semibold text-sm hover:text-blue-800 transition-colors">
            Read More <ArrowRight size={16} className="ml-2" />
          </div>
        </div>
      </div>
    </Link>
  );
}
