"use client";

import { registerUser } from "@/features/authentication/api/register";
import { parseRegisterErrorMessage } from "@/utils/parseRegisterErrorMessage";
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
      setErrors(parseRegisterErrorMessage(err));
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
