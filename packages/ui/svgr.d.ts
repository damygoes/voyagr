// declare module '*.svg' {
//   import { FC, SVGProps } from 'react'
//   const content: FC<SVGProps<SVGElement>>
//   export default content
// }

// declare module '*.svg?url' {
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const content: any
//   export default content
// }

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
