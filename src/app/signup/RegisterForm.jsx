"use client";
import React from "react";
import toast from "react-hot-toast";
import { registerUser } from "../actions/auth/registerUser";

export default function RegisterForm() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const result = await registerUser({ email, password });
      if (result?.success) {
        toast.success("Account created successfully! Please log in.");
        form.reset();
      } else {
        toast.error(result?.message || "Registration failed");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred during registration");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <fieldset className="fieldset">
        <label className="label font-black">Email</label>
        <input
          type="email"
          className="p-2 border-2 rounded-2xl"
          placeholder="Enter Your Email..."
          name="email"
          required
        />
        <label className="label font-black">Password</label>
        <input
          type="password"
          className="p-2 border-2 rounded-2xl"
          placeholder="Password"
          name="password"
          required
        />
        <div>
          <a className="link link-hover">Forgot password?</a>
        </div>
        <button className="btn btn-neutral mt-4">Sign Up</button>
      </fieldset>
    </form>
  );
}
