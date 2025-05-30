import sharedConfig from "@voyagr/tailwind-config";
import type { Config } from "tailwindcss";

const config: Pick<Config, "presets" | "content"> = {
  content: ["./src/**/*.{jsx,tsx}"],
  presets: [sharedConfig],
};

export default config;
