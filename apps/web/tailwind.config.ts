import sharedConfig from "@voyagr/tailwind-config";
import path from "path";
import type { Config } from "tailwindcss";

const config: Config = {
  presets: [sharedConfig],
  content: [
    path.join(__dirname, "app/**/*.{ts,tsx}"),
    path.join(__dirname, "src/**/*.{ts,tsx}"),
    path.join(__dirname, "../../packages/ui/src/**/*.{ts,tsx}"), // Raw source files
  ],
};

export default config;
