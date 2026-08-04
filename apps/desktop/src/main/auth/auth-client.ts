/**
 * Main-process boundary for the future browser-based desktop authorization flow.
 * Renderer code must never access desktop credentials directly.
 */
export type DesktopAuthClient = Record<never, never>;
