declare module "*.svg" {
  import React from "react";

  // This covers both cases:
  // 1. When imported as a component
  // 2. When imported as an object with src
  const content:
    | React.FC<React.SVGProps<SVGSVGElement>>
    | {
        src: string;
        height: number;
        width: number;
      };

  export default content;
}
