"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { navLinks } from "@/constants";
import Image from "next/image";
import { getProviders, signIn, signOut, useSession, ClientSafeProvider } from "next-auth/react";
import { FiMenu, FiX } from "react-icons/fi"; // Importing modern icons

const Navbar = () => {
  const { data: session } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [providers, setProviders] = useState<Record<string, ClientSafeProvider> | null>(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    fetchProviders();
  }, []);

  return (
    <nav className="flex items-center justify-between px-6 md:px-20 py-4 bg-white shadow-md relative z-50">
      {/* Logo */}
      <Link href="/">
        <Image
          src="/logo.png"
          alt="Your Brand Logo"
          width={100}
          height={100}
          className="w-8 h-8 rounded-full md:w-10 md:h-10"
        />
      </Link>

      {/* Desktop Navigation */}
      <ul className="hidden lg:flex space-x-12">
        {navLinks.map((link) => (
          <li key={link.key}>
            <Link
              href={link.href}
              className="text-primary text-lg font-medium hover:text-[#499954] transition-colors duration-200"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* User Actions */}
      <div className="flex items-center space-x-4">
        {!session ? (
          providers && Object.values(providers).map((provider) => (
            <button
              key={provider.name}
              onClick={() => signIn(provider.id)}
              className="bg-primary text-white px-5 py-2 rounded-lg shadow hover:bg-[#499954] transition-colors duration-200"
            >
              Sign in with {provider.name}
            </button>
          ))
        ) : (
          <>
            <button
              onClick={() => signOut()}
              className="bg-red-500 text-white px-5 py-2 rounded-lg shadow hover:bg-red-600 transition-colors duration-200"
            >
              Logout
            </button>
          </>
        )}
        {/* Mobile Menu Button */}
        <button
          className="text-3xl text-primary lg:hidden"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-3/4 max-w-sm bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Sidebar Content */}
        <div className="flex flex-col h-full">
          {/* Close Button */}
          <div className="flex items-center justify-end p-4">
            <button className="text-3xl text-primary" onClick={toggleSidebar}>
              <FiX />
            </button>
          </div>
          {/* Navigation Links */}
          <ul className="flex-grow flex flex-col justify-center items-center space-y-6">
            {navLinks.map((link) => (
              <li key={link.key}>
                <Link
                  href={link.href}
                  className="text-primary text-xl font-medium hover:text-[#499954] transition-colors duration-200"
                  onClick={toggleSidebar}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          {/* User Actions */}
          <div className="flex items-center justify-center mb-10">
            {!session ? (
              providers && Object.values(providers).map((provider) => (
                <button
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="bg-primary text-white px-5 py-2 rounded-lg shadow hover:bg-[#499954] transition-colors duration-200"
                >
                  Sign in
                </button>
              ))
            ) : (
              <button
                  onClick={() => signOut({
                    callbackUrl: "/",
                })}
                className="bg-red-500 text-white px-5 py-2 rounded-lg shadow hover:bg-red-600 transition-colors duration-200"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;