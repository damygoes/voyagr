"use client";

import { Button } from "@voyagr/ui/Button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { registerUser } from "../api/register";

const RegisterForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors([]);

    try {
      await registerUser({ email, password, name });

      // Register succeeded — now sign in
      const loginResult = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (loginResult?.error) {
        throw new Error(loginResult.error);
      }

      // Now you're authenticated and can redirect to the dashboard
      router.push("/dashboard");
    } catch (err) {
      const errorMessage = (err as Error).message;

      try {
        const parsed = JSON.parse(errorMessage);
        if (Array.isArray(parsed)) {
          setErrors(parsed); // array of validation errors
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
    <div className="max-w-md mx-auto p-6 border border-solid border-border rounded-md bg-card">
      <h1 className="text-xl font-bold text-center mb-4">Register</h1>
      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm">
            Name
          </label>
          <input
            id="name"
            type="text"
            required
            className="w-full p-2 border border-gray-300 rounded-md"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            className="w-full p-2 border border-gray-300 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            className="w-full p-2 border border-gray-300 rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {errors.length > 0 && (
          <div className="text-destructive text-sm my-3 space-y-1">
            {errors.map((msg, i) => (
              <p key={i} className="text-[#fe3c00]">
                {msg}
              </p>
            ))}
          </div>
        )}
        <Button
          type="submit"
          disabled={isLoading}
          className={`w-full px-4 py-2 rounded-md text-white ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {isLoading ? "Registering..." : "Register"}
        </Button>
      </form>
    </div>
  );
};

export default RegisterForm;
