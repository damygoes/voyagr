"use client";

import { loginWithCredentials } from "@/features/authentication/api/login";
import { LoginForm, type LoginFormValues } from "@voyagr/ui";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginPage = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleLogin = async (values: LoginFormValues) => {
    setError(null);
    setIsLoading(true);

    try {
      await loginWithCredentials(values.email, values.password);
      router.push("/dashboard");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  console.log("error in LoginPage:", error);

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    try {
      await signIn("google", { callbackUrl: "/dashboard" });
    } catch (error) {
      console.warn("Google login failed:", error);
      setError("Google login failed. Please try again.");
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
