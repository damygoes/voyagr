"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

const DashboardHome = () => {
  const { data: session, status } = useSession();

  if (status === "loading") return <div>Loading...</div>;

  if (!session) {
    return (
      <div>
        <p>You are not logged in</p>
        <Link href="/api/auth/signin">Login</Link>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome to your Dashboard</h1>
      <p>Welcome, {session.user?.name || "User"}!</p>
      {session.user?.id && (
        <p className="text-sm text-gray-500">User ID: {session.user.id}</p>
      )}
    </div>
  );
};

export default DashboardHome;
