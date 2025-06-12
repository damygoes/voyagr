"use client";

import { Button } from "@voyagr/ui";
import { signOut, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

export const LogoutButton = () => {
  const t = useTranslations("Navigation");
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
      {t("logout")}
    </Button>
  );
};
