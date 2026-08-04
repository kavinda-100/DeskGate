export {};

declare global {
  interface Window {
    deskgate: Record<string, never>;
  }
}
