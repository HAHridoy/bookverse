import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Navbar() {
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
          <Link href={"/blogs"}>BLOG</Link>
        </li>
        <li>
          <Link href={"/about"}>ABOUT US</Link>
        </li>
      </>
    );
  };
  return (
    <div className="navbar bg-[#173F5F] text-white">
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
        <Link href={"/login"} className="btn">
          Login
        </Link>
        <Link href={"/signup"} className="btn btn-primary ml-2">
          Sign Up
        </Link>
      </div>
    </div>
  );
}
