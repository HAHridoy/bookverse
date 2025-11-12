import React from "react";

export default function About() {
  return (
    <section id="about" className="bg-white py-16 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Side: Image */}
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80"
            alt="Book Shop"
            className="rounded-2xl shadow-lg w-full object-cover"
          />
          <div className="absolute inset-0 bg-indigo-600/10 rounded-2xl"></div>
        </div>

        {/* Right Side: Content */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            About <span className="text-indigo-600">Us</span>
          </h2>
          <p className="text-gray-600 mb-5 leading-relaxed">
            Welcome to{" "}
            <span className="font-semibold text-indigo-600">Book Verse</span> —
            your one-stop destination for every kind of reader. From timeless
            classics to the latest bestsellers, we aim to bring the world’s
            stories to your fingertips.
          </p>
          <p className="text-gray-600 mb-5 leading-relaxed">
            Founded by a group of passionate book lovers, our goal is to build a
            vibrant community where readers can discover, review, and share
            their favorite books. We believe that every book opens a door to
            imagination, creativity, and learning.
          </p>
          <div className="mt-6">
            <a
              href="#contact"
              className="inline-block bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 transition duration-300"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
