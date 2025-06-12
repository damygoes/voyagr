"use client";

import LoginPage from "app/[locale]/(auth)/login/page";
import RegisterPage from "app/[locale]/(auth)/register/page";
import { JSX } from "react";

interface AuthFormConfig {
  title: string;
  description: string;
  secondaryLinkText: string;
  secondaryLinkHref: string;
  formComponent: JSX.Element;
}

export function getAuthFormConfig(formType: string | null): AuthFormConfig {
  if (formType === "register") {
    return {
      title: "Create Your Voyagr Account",
      description:
        "Join a growing community of travelers planning their perfect trips. Register to unlock advanced features and sync across devices.",
      secondaryLinkText: "Already have an account? Log In",
      secondaryLinkHref: "/?form=login",
      formComponent: <RegisterPage />,
    };
  }

  return {
    title: "Welcome Back to Voyagr",
    description:
      "Log in to access your saved trips, itineraries, and travel tools. Your next adventure is just a few clicks away.",
    secondaryLinkText: "Don’t have an account? Register",
    secondaryLinkHref: "/?form=register",
    formComponent: <LoginPage />,
  };
}
