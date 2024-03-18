/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'indesign' {
  export interface Application {
    [key: string]: any;
  }

  export const app: Application;
}
