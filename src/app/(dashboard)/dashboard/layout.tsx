"use client";
import DashboardSidebar from "@/components/dashboaord/DashboardSidebar";
import Navbar from "@/components/Navbar";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      <div className="flex items-center flex-row w-screen">
        <DashboardSidebar />
        <div className="flex flex-col w-full">
          <main className="min-h-[100vh] h-auto rounded-[5px] lg:pt-[2vh] lg:pl-[19vw] pr-[1vw] w-[99.5vw] flex  bg-green-50 bg-opacity-45">
            <div className="w-full h-[82vh] relative overflow-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
