'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ArrowLeft, ShoppingCart, Heart, AlertCircle } from 'lucide-react';

export default function BookDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [book, setBook] = useState(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await fetch('/books.json');
        if (!response.ok) throw new Error('Failed to fetch books');
        const data = await response.json();
        setBooks(data);

        // Find the book by ID
        const foundBook = data.find((b) => b.id === parseInt(id));
        if (!foundBook) {
          setError('Book not found');
        } else {
          setBook(foundBook);
        }
      } catch (err) {
        setError(err.message || 'Failed to load book');
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="h-96 bg-gray-300 rounded"></div>
              <div className="col-span-2 space-y-4">
                <div className="h-10 bg-gray-300 rounded w-3/4"></div>
                <div className="h-6 bg-gray-300 rounded w-1/2"></div>
                <div className="h-20 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error || !book) {
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
              <p className="text-red-700">{error || 'Book not found'}</p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Find related books (same category, excluding current book)
  const relatedBooks = books
    .filter((b) => b.category === book.category && b.id !== book.id)
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

        {/* Book Details Container */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
            {/* Book Image */}
            <div className="flex items-start">
              <div className="w-full bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={book.image}
                  alt={book.book_name}
                  className="w-full h-96 object-cover"
                  onError={(e) => {
                    e.target.src =
                      'https://via.placeholder.com/300x400?text=' +
                      encodeURIComponent(book.book_name);
                  }}
                />
              </div>
            </div>

            {/* Book Info */}
            <div className="md:col-span-2">
              {/* Title */}
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                {book.book_name}
              </h1>

              {/* Author */}
              <p className="text-lg text-gray-600 mb-4">
                by <span className="font-semibold">{book.author_name}</span>
              </p>

              {/* Category & Availability */}
              <div className="flex gap-4 mb-6">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                  {book.category}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    book.in_stock
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {book.in_stock ? '✓ In Stock' : '✗ Out of Stock'}
                </span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <p className="text-gray-600 text-sm mb-1">Price</p>
                <p className="text-4xl font-bold text-blue-600">${book.price}</p>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-3">Description</h2>
                <p className="text-gray-700 leading-relaxed">{book.description}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
                    book.in_stock
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  disabled={!book.in_stock}
                  onClick={() => {
                    if (book.in_stock) {
                      alert(
                        `"${book.book_name}" has been added to your cart!`
                      );
                    }
                  }}
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>
                <button className="flex-1 py-3 px-6 rounded-lg font-semibold bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors flex items-center justify-center gap-2">
                  <Heart size={20} />
                  Add to Favorites
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Books Section */}
        {relatedBooks.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              More in {book.category}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedBooks.map((relatedBook) => (
                <div
                  key={relatedBook.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => router.push(`/books/${relatedBook.id}`)}
                >
                  <div className="h-48 bg-gray-100 overflow-hidden rounded-t-lg">
                    <img
                      src={relatedBook.image}
                      alt={relatedBook.book_name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                      onError={(e) => {
                        e.target.src =
                          'https://via.placeholder.com/300x200?text=' +
                          encodeURIComponent(relatedBook.book_name);
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 line-clamp-2">
                      {relatedBook.book_name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {relatedBook.author_name}
                    </p>
                    <p className="text-lg font-bold text-blue-600">
                      ${relatedBook.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
