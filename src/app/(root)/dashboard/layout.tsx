"use client";
import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import CustomerSidebar from "@/components/dashboaord/CustomerSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden fixed top-5 left-4 z-50 bg-primary text-white p-2 rounded-full shadow-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark transition-all duration-300"
      >
        <FiMenu size={24} />
      </button>

      {/* Sidebar Component */}
      <CustomerSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content Area */}
      <div
        className={`flex flex-col flex-1 transition-all duration-300 ${
          sidebarOpen ? "overflow-hidden" : ""
        }`}
      >
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
