"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import React from "react";

export default function LoginForm() {
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    // Basic form validation
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    const loadingToast = toast.loading("Logging in...");

    try {
      const response = await signIn("credentials", {
        email,
        password,
        callbackUrl: "/",
        redirect: false,
      });

      if (response?.ok) {
        toast.dismiss(loadingToast);
        toast.success("Logged in successfully!");
        router.push("/");
        form.reset();
      } else {
        toast.dismiss(loadingToast);
        toast.error(response?.error || "Invalid email or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.dismiss(loadingToast);
      toast.error("Login failed. Please try again.");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <fieldset className="fieldset">
        <label className="label">Email</label>
        <input
          type="email"
          className="p-2 border-2 rounded-2xl"
          placeholder="Email"
          name="email"
        />
        <label className="label">Password</label>
        <input
          type="password"
          className="p-2 border-2 rounded-2xl "
          name="password"
          placeholder="Password"
        />
        <div>
          <a className="link link-hover">Forgot password?</a>
        </div>
        <button className="btn btn-neutral mt-4">Login</button>
      </fieldset>
    </form>
  );
}
