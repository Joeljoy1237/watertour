"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const { data: session, status } = useSession();

  // Handle loading or unauthenticated states
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    return <div>You need to sign in to view this page.</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full px-4 md:px-8 bg-gray-50">
      <div className="max-w-screen-sm w-full h-full bg-white shadow-lg rounded-lg p-6 text-gray-900">
        {/* Profile Header */}
        <div className="flex flex-col items-center mb-6">
          <Image
            src={session!.user?.image || "/boat.jpg"}
            width={100}
            height={100}
            alt="Profile"
            className="w-24 h-24 object-cover rounded-full border-4 border-primary shadow-md"
          />
          <h2 className="text-xl font-semibold mt-4 text-primary">
            {session!.user?.name || "User Name"}
          </h2>
        </div>

        {/* Profile Details */}
        <div className="grid grid-cols-1 gap-4">
          <div className="p-4 bg-gray-100 rounded-lg shadow-md">
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-lg font-medium">{session!.user?.email || "email"}</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg shadow-md">
            <p className="text-sm text-gray-500">Phone</p>
            <p className="text-lg font-medium">{session!.user?.phone || "NULL"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}