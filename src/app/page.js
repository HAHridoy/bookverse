'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import BookCard from '@/components/BookCard';

export default function Home() {
  const [books, setBooks] = useState([]);
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await fetch('/books.json');
        if (!response.ok) throw new Error('Failed to fetch books');
        const data = await response.json();
        setBooks(data);
        // Display first 6 books as featured
        setFeaturedBooks(data.slice(0, 6));
      } catch (err) {
        console.error('Error fetching books:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, []);

  return (
    <main className="flex flex-col items-center justify-between">
      {/* Hero Section */}
      <section className="w-full bg-linear-to-r from-blue-600 to-blue-800 text-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to BookVerse!</h1>
          <p className="text-xl mb-8 text-blue-100">
            Discover thousands of books across all genres. Find your next favorite read today.
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
      <section className="w-full py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-2">
                Featured Books
              </h2>
              <p className="text-gray-600">
                Check out our handpicked collection of bestsellers and new arrivals
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

      {/* CTA Section */}
      <section className="w-full bg-blue-600 text-white py-16 px-6">
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
