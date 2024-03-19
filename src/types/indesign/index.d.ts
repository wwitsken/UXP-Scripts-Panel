/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'indesign' {
  export interface Application {
    [key: string]: any;
  }

  export interface MutationEvent {
    [key: string]: any;
  }

  export interface Event {
    [key: string]: any;
  }

  export const app: Application;
  export const MutationEvent: MutationEvent;
  export const Event: Event;
}
