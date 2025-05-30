"use client";

import { gql, useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";

const HELLO_QUERY = gql`
  query {
    hello
  }
`;

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const { data, loading, error } = useQuery(HELLO_QUERY);

  if (status === "loading" || loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="flex flex-col items-center justify-start w-full bg-background">
      <h1>Dashboard</h1>
      <p>Welcome {session?.user?.name ?? "Guest"}!</p>
      <p>GraphQL says: {data?.hello ?? "No response"}</p>
    </div>
  );
}
