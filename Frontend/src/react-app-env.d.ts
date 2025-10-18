/// <reference types="vite/client" />

declare namespace JSX {
  interface IntrinsicElements {
    // allow any intrinsic elements as a fallback
    [elemName: string]: any;
  }
}

declare module 'react/jsx-runtime' {
  export * from 'react';
}
