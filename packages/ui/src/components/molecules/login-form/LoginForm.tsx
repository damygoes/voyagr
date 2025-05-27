"use client";

import { useState, type FC } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../primitives/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../../primitives/form/Form";
import { Input } from "../../primitives/input/Input";

export type LoginFormValues = {
  email: string;
  password: string;
};

export type LoginFormProps = {
  onSubmit?: (values: LoginFormValues) => void;
  isLoading?: boolean;
  isGoogleLoading?: boolean;
  error?: string | null;
  onGoogleLogin?: () => void;
};

export const LoginForm: FC<LoginFormProps> = ({
  onSubmit,
  isLoading = false,
  isGoogleLoading = false,
  error,
  onGoogleLogin,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const form = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };
  const passwordType = isPasswordVisible ? "text" : "password";

  return (
    <div className="w-full max-w-3xl mx-auto p-md border border-border rounded-2xl bg-card shadow-sm">
      <h1 className="text-xl font-semibold text-center mb-md">Log in</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((values) => {
            if (onSubmit) onSubmit(values);
          })}
          className="space-y-md"
        >
          <FormField
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type={passwordType}
                    placeholder="••••••••"
                    {...field}
                    iconRight={{
                      name: isPasswordVisible ? "invisible" : "visible",
                      onClick: togglePasswordVisibility,
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {error && (
            <p className="text-sm text-destructive text-center">{error}</p>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Log In"}
          </Button>
        </form>
      </Form>

      <div className="my-md text-center space-y-sm">
        <p className="text-sm text-muted-foreground">Or sign in with</p>
        <Button
          variant="outline"
          className="w-full"
          type="button"
          onClick={onGoogleLogin}
          disabled={isGoogleLoading}
        >
          {isGoogleLoading ? "Signing in..." : "Google Login"}
        </Button>
      </div>
    </div>
  );
};

LoginForm.displayName = "LoginForm";
