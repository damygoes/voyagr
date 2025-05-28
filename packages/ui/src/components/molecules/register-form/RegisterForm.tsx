"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState, type FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
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

export type RegisterFormValues = {
  name: string;
  email: string;
  password: string;
};

export type RegisterFormProps = {
  onSubmit?: (values: RegisterFormValues) => void;
  isLoading?: boolean;
  error?: string | string[] | null;
};

export const RegisterForm: FC<RegisterFormProps> = ({
  onSubmit,
  isLoading = false,
  error,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const registerSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one lowercase letter, one uppercase letter, and one number",
      ),
  });

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
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
      <h1 className="text-xl font-semibold text-center mb-md">Register</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((values) => {
            if (onSubmit) onSubmit(values);
          })}
          className="space-y-md"
        >
          <FormField
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
                      name: isPasswordVisible ? "eye" : "eyeOff",
                      onClick: togglePasswordVisibility,
                      "aria-label": isPasswordVisible
                        ? "Hide password"
                        : "Show password",
                      role: "button",
                      tabIndex: 0,
                      onKeyDown: (e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          togglePasswordVisibility();
                        }
                      },
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {error && (
            <div className="text-sm text-destructive space-y-1">
              {Array.isArray(error) ? (
                error.map((e, i) => <p key={i}>{e}</p>)
              ) : (
                <p>{error}</p>
              )}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Registering..." : "Register"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

RegisterForm.displayName = "RegisterForm";
