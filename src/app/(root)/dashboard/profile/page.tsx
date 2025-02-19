// app/dashboard/profile/page.tsx
import React from "react";
import Profile from "@/components/Profile";

export default function ProfilePage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">My Profile</h1>
      <Profile />
    </div>
  );
}
