"use client";

import { getAuthFormConfig } from "@/features/authentication/components/AuthFormSwitcher";
import { LandingPageLayout } from "@/features/authentication/components/LandingPageLayout";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "en";

  const formType = searchParams.get("form");

  useEffect(() => {
    if (!formType && typeof window !== "undefined") {
      router.replace(`/${locale}?form=login`);
    }
  }, [formType, router, locale]);

  const {
    title,
    description,
    secondaryLinkText,
    secondaryLinkHref,
    formComponent,
  } = useMemo(() => getAuthFormConfig(formType), [formType]);

  if (!formType) return <div>Loading...</div>; // TODO: implement proper loading state later

  return (
    <LandingPageLayout
      title={title}
      description={description}
      secondaryLinkText={secondaryLinkText}
      secondaryLinkHref={secondaryLinkHref}
    >
      {formComponent}
    </LandingPageLayout>
  );
}
