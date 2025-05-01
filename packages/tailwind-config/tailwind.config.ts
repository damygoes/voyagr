import { colors } from "@voyagr/design/colors";
import type { Config } from "tailwindcss";



// We want each package to be responsible for its own content.
const config: Omit<Config, "content"> = {
  theme: {
    colors: {
      ...colors
    },
    extend: {},
  },
  plugins: [],
};
export default config;
