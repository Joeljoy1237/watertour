"use client";
import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import CustomerSidebar from "@/components/CustomerSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Menu Button for Mobile View */}
      <div className="lg:hidden fixed top-4 left-4 z-40 bg-primary text-white p-2 rounded-full shadow-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark transition-colors duration-300">
        <button
          onClick={() => setSidebarOpen(true)}
          className="focus:outline-none"
        >
          <FiMenu size={24} />
        </button>
      </div>

      {/* Sidebar */}
      <CustomerSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main content */}
      <div className="flex flex-col flex-1">
        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
