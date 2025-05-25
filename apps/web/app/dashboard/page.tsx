"use client";

import { gql, useQuery } from "@apollo/client";
import { Button } from "@voyagr/ui/Button";
import { signOut, useSession } from "next-auth/react";

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
    <main className="flex flex-col items-center justify-between min-h-screen p-24 bg-background">
      <h1>Dashboard</h1>
      <p>Welcome {session?.user?.name ?? "Guest"}!</p>
      <p>GraphQL says: {data?.hello ?? "No response"}</p>
      {session ? (
        <Button
          variant="destructive"
          onClick={() => signOut({ callbackUrl: "/login" })}
        >
          Logout
        </Button>
      ) : null}
    </main>
  );
}
