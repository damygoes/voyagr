"use client";

import { registerUser } from "@/features/authentication/api/register";
import { RegisterForm, RegisterFormValues } from "@voyagr/ui";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const RegisterPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const handleRegister = async (values: RegisterFormValues) => {
    setIsLoading(true);
    setErrors([]);

    try {
      await registerUser(values);

      const loginResult = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (loginResult?.error) {
        throw new Error(loginResult.error);
      }

      router.push("/dashboard");
    } catch (err) {
      const errorMessage = (err as Error).message;

      try {
        const parsed = JSON.parse(errorMessage);
        if (
          Array.isArray(parsed) &&
          parsed.length > 0 &&
          typeof parsed[0] === "string"
        ) {
          setErrors(parsed); // array of validation errors
        } else if (parsed.message && typeof parsed.message === "string") {
          setErrors([parsed.message]);
        } else if (parsed.error && typeof parsed.error === "string") {
          setErrors([parsed.error]);
        } else {
          setErrors([errorMessage]);
        }
      } catch {
        setErrors([errorMessage]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <RegisterForm
      onSubmit={handleRegister}
      isLoading={isLoading}
      error={errors}
    />
  );
};

export default RegisterPage;
