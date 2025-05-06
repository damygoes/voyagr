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
    <div>
      Welcome to your Dashboard
      <p>Welcome, {session.user.name}!</p>
      <p>Your ID: {session.user.id}</p>
    </div>
  );
};

export default DashboardHome;
