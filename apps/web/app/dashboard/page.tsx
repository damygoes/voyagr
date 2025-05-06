"use client";

import DashboardHome from "@/features/dashboard/home";
import { SessionProvider } from "next-auth/react";

const Dashboard = () => {
  return (
    <SessionProvider>
      <DashboardHome />
    </SessionProvider>
  );
};

export default Dashboard;
