"use client";

import { Button } from "@voyagr/ui";
import { signOut, useSession } from "next-auth/react";

export const LogoutButton = () => {
  const { data: session } = useSession();

  if (!session) {
    return null;
  }

  return (
    <Button
      variant="destructive"
      onClick={() => signOut({ callbackUrl: "/?form=login" })}
      className="w-full"
      iconLeft={{ name: "logout" }}
    >
      Logout
    </Button>
  );
};
