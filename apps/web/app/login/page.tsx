"use client";

import { Button } from "@voyagr/ui/Button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      // Handle email/password login
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (res?.error) {
        // Parse error message if available
        const errorMessage =
          typeof res.error === "string" && res.error.length > 0
            ? res.error
            : "Failed to login. Please check your credentials.";
        setError(errorMessage);
      } else {
        // Constants for routes
        const DASHBOARD_ROUTE = "/dashboard";
        router.push(DASHBOARD_ROUTE);
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      // Log error securely (consider using a logging service)
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl: "/dashboard" }); // Redirect to dashboard after Google login
  };

  return (
    <div className="max-w-md mx-auto p-6 border border-solid border-border rounded-md bg-card">
      <h1 className="text-xl font-bold text-center mb-4">Login</h1>
      {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
      <form onSubmit={handleLogin} className="space-y-4">
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
          <div className="flex justify-between items-center">
            <button
              type="submit"
              disabled={isLoading}
              className={`px-4 py-2 rounded-md text-white ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {isLoading ? "Logging in..." : "Log In"}
            </button>
          </div>
        </div>
        
      </form>

      <div className="my-4 text-center">
        <p>Or sign in with:</p>
        <Button type="button" onClick={handleGoogleLogin} disabled={isLoading}>
          {isLoading ? "Loading..." : "Google Login"}
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
