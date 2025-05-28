"use client";

import { getAuthFormConfig } from "@/features/authentication/components/AuthFormSwitcher";
import { AuthLayout } from "@/features/authentication/components/AuthLayout";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const formType = searchParams.get("form");

  useEffect(() => {
    // this is to guard against possible hydration issues and infinite redirects in edge cases
    if (!formType && typeof window !== "undefined") {
      router.replace("/?form=login");
    }
  }, [formType, router]);

  const {
    title,
    description,
    secondaryLinkText,
    secondaryLinkHref,
    formComponent,
  } = useMemo(() => getAuthFormConfig(formType), [formType]);

  if (!formType) return <div>Loading...</div>; // TODO: implement proper loading state later

  return (
    <AuthLayout
      title={title}
      description={description}
      secondaryLinkText={secondaryLinkText}
      secondaryLinkHref={secondaryLinkHref}
    >
      {formComponent}
    </AuthLayout>
  );
}
