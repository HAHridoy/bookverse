"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, Calendar, User, AlertCircle } from "lucide-react";
import BlogCard from "@/components/BlogCard";

export default function BlogDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await fetch("/api/blogs");
        console.log("Blogs fetched:", response);
        if (!response.ok) throw new Error("Failed to fetch blogs");
        const data = await response.json();
        setBlogs(data);

        // Find the blog by ID
        const foundBlog = data.find((b) => b.id === parseInt(id));
        if (!foundBlog) {
          setError("Blog not found");
        } else {
          setBlog(foundBlog);
        }
      } catch (err) {
        setError(err.message || "Failed to load blog");
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, [id]);

  const formattedDate = blog
    ? new Date(blog.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-6"></div>
            <div className="space-y-4">
              <div className="h-10 bg-gray-300 rounded w-3/4"></div>
              <div className="h-6 bg-gray-300 rounded w-1/2"></div>
              <div className="h-96 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error || !blog) {
    return (
      <main className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 font-semibold"
          >
            <ArrowLeft size={20} /> Back
          </button>
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex items-start gap-4">
            <AlertCircle className="text-red-600 shrink-0 mt-1" size={24} />
            <div>
              <h2 className="text-xl font-bold text-red-800 mb-2">Error</h2>
              <p className="text-red-700">{error || "Blog not found"}</p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Find related blogs (same category, excluding current blog)
  const relatedBlogs = blogs
    .filter((b) => b.category === blog.category && b.id !== blog.id)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-8 font-semibold"
        >
          <ArrowLeft size={20} /> Back
        </button>

        {/* Blog Details Container */}
        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Featured Image */}
          <div className="w-full h-96 bg-gray-100 overflow-hidden">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/800x400?text=" +
                  encodeURIComponent(blog.title);
              }}
            />
          </div>

          {/* Blog Content */}
          <div className="p-8 md:p-12">
            {/* Category and Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold">
                {blog.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              {blog.title}
            </h1>

            {/* Author and Date */}
            <div className="flex flex-wrap gap-6 text-gray-600 mb-8 pb-8 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <User size={18} />
                <span className="font-semibold">{blog.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <span>{formattedDate}</span>
              </div>
            </div>

            {/* Blog Content */}
            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-gray-700 leading-relaxed text-lg mb-6">
                {blog.description}
              </p>
              <p className="text-gray-700 leading-relaxed text-lg">
                {blog.content}
              </p>
            </div>

            {/* Read More CTA */}
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded">
              <p className="text-gray-700">
                Found this article interesting? Share your thoughts in the
                comments below or explore more articles in the {blog.category}{" "}
                category.
              </p>
            </div>
          </div>
        </article>

        {/* Related Blogs Section */}
        {relatedBlogs.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              More in {blog.category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedBlogs.map((relatedBlog) => (
                <BlogCard key={relatedBlog.id} blog={relatedBlog} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
