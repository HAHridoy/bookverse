"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import BookCard from "@/components/BookCard";
import BlogCard from "@/components/BlogCard";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [featuredBlogs, setFeaturedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await fetch("/books.json");
        if (!response.ok) throw new Error("Failed to fetch books");
        const data = await response.json();
        setBooks(data);
        // Display first 6 books as featured
        setFeaturedBooks(data.slice(0, 6));
      } catch (err) {
        console.error("Error fetching books:", err);
      }
    }

    async function fetchBlogs() {
      try {
        const response = await fetch("/blogs.json");
        if (!response.ok) throw new Error("Failed to fetch blogs");
        const data = await response.json();
        setBlogs(data);
        // Display featured blogs only
        setFeaturedBlogs(data.filter((blog) => blog.featured).slice(0, 3));
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
    fetchBlogs();
  }, []);

  return (
    <main className="flex flex-col items-center justify-between">
      {/* Hero Section */}
      <section className="w-full bg-linear-to-r from-blue-500 to-blue-800 text-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to BookVerse!</h1>
          <p className="text-xl mb-8 text-blue-100">
            Discover thousands of books across all genres. Find your next
            favorite read today.
          </p>
          <Link
            href="/allbooks"
            className="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Browse All Books
          </Link>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="w-full py-16 px-6 bg-[#FCECEC]">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-2">
                Featured Books
              </h2>
              <p className="text-gray-600">
                Check out our handpicked collection of bestsellers and new
                arrivals
              </p>
            </div>
            <Link
              href="/allbooks"
              className="text-blue-600 font-semibold hover:text-blue-800 transition-colors"
            >
              View All →
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-56 bg-gray-300 rounded mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          )}
        </div>
      </section>

      

      {/* Info Section */}
      <section className="w-full py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
            Why Choose BookVerse?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Wide Selection
              </h3>
              <p className="text-gray-600">
                Explore thousands of books across all genres and categories
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚚</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Fast Shipping
              </h3>
              <p className="text-gray-600">
                Quick and reliable delivery to your doorstep
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💳</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Secure Payment
              </h3>
              <p className="text-gray-600">
                Safe and secure transactions for your peace of mind
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="w-full flex justify-center items-center py-16 px-4 bg-pink-50">
        <div className="bg-[#f25c3c] text-white rounded-lg w-full max-w-5xl p-8 md:p-12 text-center shadow-lg">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-base md:text-lg mb-8 max-w-2xl mx-auto">
            Sed eu feugiat amet, libero ipsum enim pharetra hac dolor sit amet,
            consectetur. Elit adipiscing enim pharetra hac.
          </p>

          <form className="flex flex-col sm:flex-row justify-center items-center bg-white rounded-lg shadow-md overflow-hidden mx-auto max-w-xl">
            <div className="flex items-center w-full sm:w-auto px-3 py-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-400 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M16 12H8m0 0l4-4m-4 4l4 4M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
                />
              </svg>
              <input
                type="email"
                placeholder="youremail123@gmail.com"
                required
                className="flex-1 px-2 py-2 border-none focus:outline-none text-gray-700 placeholder-gray-400"
              />
            </div>
            <button
              type="submit"
              className="bg-[#e84b2c] hover:bg-[#d63c1f] text-white px-8 py-3 font-semibold transition-colors w-full sm:w-auto rounded-3xl"
            >
              SUBSCRIBE
            </button>
          </form>
        </div>
      </section>

      {/* Featured Blogs Section */}
      <section className="w-full py-16 px-6 bg-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-2">
                Latest Articles
              </h2>
              <p className="text-gray-600">
                Explore our latest blog posts with insights and stories
              </p>
            </div>
            <Link
              href="/blogs"
              className="text-blue-600 font-semibold hover:text-blue-800 transition-colors"
            >
              View All →
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-48 bg-gray-300 rounded mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredBlogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-blue-500 text-white py-16 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Explore?</h2>
          <p className="text-lg mb-8 text-blue-100">
            Start your reading journey with BookVerse today
          </p>
          <Link
            href="/allbooks"
            className="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Start Browsing
          </Link>
        </div>
      </section>
    </main>
  );
}
