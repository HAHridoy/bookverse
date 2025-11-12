import React from 'react';

export default function Contacts() {
  return (
    <section className="bg-[#FCECEC] py-16 px-6" id="contact">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Side: Contact Info */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Contact <span className="text-indigo-600">Us</span>
          </h2>
      <p className="text-gray-600 mb-6">
            Have a question about our books or need help with an order? Get in touch with us — we'd love to hear from you!
          </p>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-indigo-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-9 4v8"
                />
              </svg>
              <p className="text-gray-700">contact@bookverse.com</p>
            </div>
            <div className="flex items-center space-x-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-indigo-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M3 5h2l3.6 7.59L5.25 18h13.5l-3.35-5.41L21 5H3z"
                />
              </svg>
              <p className="text-gray-700">+880 1234-567890</p>
            </div>
            <div className="flex items-center space-x-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-indigo-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M17.657 16.657L13.414 12.414M12 6a9 9 0 100 12 9 9 0 000-12z"
                />
              </svg>
              <p className="text-gray-700">123 Book Market, Chattogram, Bangladesh</p>
            </div>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <form className="bg-white shadow-lg rounded-2xl p-8 space-y-5">
          <h3 className="text-2xl font-semibold text-gray-800">Send a Message</h3>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-600 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your Name"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-600 mb-1">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              placeholder="Write your message..."
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>

    </section>
  );
}
