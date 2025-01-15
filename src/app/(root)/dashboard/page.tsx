import React from "react";
import AdminDashboard from "@/components/dashboaord/AdminDashboard";

const Dashboard = () => {
  const user = "Owner";

  return user !== "Owner" ? <div>User Dashboard</div> : <AdminDashboard />;
};

export default Dashboard;
