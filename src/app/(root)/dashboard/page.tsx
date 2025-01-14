import React from "react";

const Dashboard = () => {
  const user = "Owner";

  return user !== "Owner" ? (
    <div>User Dashboard</div>
  ) : (
    <div>Owner Dashboard</div>
  );
};

export default Dashboard;
