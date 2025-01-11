"use client";
import Link from "next/link";
import { useState } from "react";
import { navLinks } from "@/constants";
import Image from "next/image";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <nav className="flex justify-between items-center px-4 md:px-20 relative z-30 py-4 bg-white">
      {/* Logo */}
      <Link href="/" className="inline-block">
        <Image
          src="/logo.png"
          alt="Logo"
          width={60}
          height={60}
          className="rounded-full object-cover"
        />
      </Link>

      {/* Sidebar and Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-25"
          onClick={closeSidebar}
        ></div>
      )}
      <div
        className={`lg:hidden fixed top-0 right-0 h-1/3 w-2/4 bg-white shadow-md z-40 flex flex-col items-center px-6 py-4 transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          className="self-end text-xl text-primary mb-4"
          onClick={closeSidebar}
        >
          ✕
        </button>
        <ul className="flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className="text-primary text-lg hover:text-[#499954] hover:font-medium hover:underline"
              onClick={closeSidebar}
            >
              {link.label}
            </Link>
          ))}
        </ul>
      </div>

      {/* Desktop Navigation */}
      <ul className="hidden gap-24 items-center lg:flex">
        {navLinks.map((link) => (
          <Link
            key={link.key}
            href={link.href}
            className="text-primary text-lg transition-color hover:text-[#499954] hover:font-medium hover:underline"
          >
            {link.label}
          </Link>
        ))}
      </ul>

      {/* User Buttons */}
      <div className="flex items-center gap-4">
        <SignedOut>
          <SignInButton>
            <button className="bg-primary text-white px-5 py-2 rounded-lg shadow-md hover:bg-[#499954] transition duration-200">
              Login
            </button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                avatarBox: "w-10 h-10 border-2 border-[#5EBC67] rounded-full",
              },
            }}
          />
        </SignedIn>
        {/* Sidebar Toggle Button (Mobile View) */}
        <button
          className="block lg:hidden text-primary text-3xl"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          ☰
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
