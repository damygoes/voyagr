"use client";

import { loginWithCredentials } from "@/features/authentication/api/login";
import { LoginForm, type LoginFormValues } from "@voyagr/ui";
import { signIn } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

const LoginPage = () => {
  const router = useRouter();
  const { locale } = useParams();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleLogin = async (values: LoginFormValues) => {
    setError(null);
    setIsLoading(true);

    try {
      await loginWithCredentials(values.email, values.password);
      router.push(`/${locale}/dashboard`);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    setError(null);
    try {
      await signIn("google", { callbackUrl: `/${locale}/dashboard` });
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Google login failed. Please try again.";
      setError(errorMessage);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <LoginForm
      onSubmit={handleLogin}
      onGoogleLogin={handleGoogleLogin}
      isLoading={isLoading}
      isGoogleLoading={isGoogleLoading}
      error={error}
    />
  );
};

export default LoginPage;
