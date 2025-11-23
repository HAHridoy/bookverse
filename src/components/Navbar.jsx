"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ShoppingCart, Settings } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleCartClick = (e) => {
    if (!session) {
      e.preventDefault();
      router.push("/login");
    }
  };
  const navMenu = () => {
    return (
      <>
        <li>
          <Link href={"/"}>HOME</Link>
        </li>
        <li>
          <Link href={"/allbooks"}>BOOKS</Link>
        </li>
        <li>
          <Link href={"/contacts"}>CONTACT US</Link>
        </li>
        <li>
          <Link href={"/blogs"}>BLOGS</Link>
        </li>
        <li>
          <Link href={"/about"}>ABOUT US</Link>
        </li>
      </>
    );
  };
  return (
    <div className="navbar bg-[#173F5F] text-white sticky top-0 z-50 shadow-lg">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {navMenu()}
          </ul>
        </div>
        <Link href={"/"} className="font-bold text-xl">
          <Image
            src="/logo.png"
            alt="Book Shop Logo"
            width={60}
            height={60}
            className="rounded inline-block ml-3"
          />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navMenu()}</ul>
      </div>
      <div className="navbar-end">
        <button onClick={handleCartClick} className="btn btn-ghost">
          <Link href={session ? "/cart" : "#"}>
            <ShoppingCart size={20} />
          </Link>
        </button>

        {status === "authenticated" ? (
          <>
            {session?.user?.email === "hosainoolalam123@gmail.com" && (
              <Link href="/admin" className="btn btn-ghost">
                <Settings size={20} />
              </Link>
            )}
            <span className="mx-2">Welcome, {session?.user?.name}</span>
            <button
              className="btn btn-secondary hover:bg-orange-400"
              onClick={() => signOut()}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href={"/signup"} className="btn btn-primary ml-2">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
